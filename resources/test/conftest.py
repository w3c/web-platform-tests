import io
import json
import os

import html5lib
import pytest
from selenium import webdriver

from wptserver import WPTServer

ENC = 'utf8'
HERE = os.path.dirname(os.path.abspath(__file__))
WPT_ROOT = os.path.normpath(os.path.join(HERE, '..', '..'))
HARNESS = os.path.join(HERE, 'harness.html')

def pytest_collect_file(path, parent):
    if path.ext.lower() == '.html':
        return HTMLItem(str(path), parent)

def pytest_configure(config):
    config.driver = webdriver.Firefox()
    config.server = WPTServer(WPT_ROOT)
    config.server.start()
    config.add_cleanup(lambda: config.server.stop())
    config.add_cleanup(lambda: config.driver.quit())

class HTMLItem(pytest.Item, pytest.Collector):
    def __init__(self, filename, parent):
        self.filename = filename
        with io.open(filename, encoding=ENC) as f:
            markup = f.read()

        parsed = html5lib.parse(markup, namespaceHTMLElements=False)
        name = None
        self.expected = None

        for element in parsed.getiterator():
            if not name and element.tag == 'title':
                name = element.text
                continue
            if element.attrib.get('id') == 'expected':
                self.expected = json.loads(unicode(element.text))
                continue

        if not name:
            raise ValueError('No name found in file: %s' % filename)

        if not self.expected:
            raise ValueError('Expected JSON not found in file: %s' % filename)

        super(HTMLItem, self).__init__(name, parent)


    def reportinfo(self):
        return self.fspath, None, self.filename

    def repr_failure(self, excinfo):
        return pytest.Collector.repr_failure(self, excinfo)

    def runtest(self):
        driver = self.session.config.driver
        server = self.session.config.server

        driver.get(server.url(HARNESS))

        actual = driver.execute_async_script('runTest("%s", "foo", arguments[0])' % server.url(str(self.filename)))

        # Test object ordering is not guaranteed. This weak assertion verifies
        # that the indices are unique and sequential
        indices = [test_obj.get('index') for test_obj in actual['tests']]
        self._assert_sequence(indices)

        summarized = {}
        summarized[u'summarized_status'] = self._summarize_status(actual['status'])
        summarized[u'summarized_tests'] = [
            self._summarize_test(test) for test in actual['tests']]
        summarized[u'summarized_tests'].sort(key=lambda test_obj: test_obj.get('name'))
        summarized[u'type'] = actual['type']

        assert summarized == self.expected

    @staticmethod
    def _assert_sequence(nums):
        assert nums == range(1, nums[-1] + 1)

    @staticmethod
    def _scrub_stack(test_obj):
        copy = dict(test_obj)

        assert 'stack' in copy

        if copy['stack'] is not None:
            copy['stack'] = u'(implementation-defined)'

        return copy

    @staticmethod
    def _expand_status(full):
        summarized = dict(full)

        del summarized['status']

        for key, value in full.iteritems():
            if key != key.upper() or not isinstance(value, int):
                continue

            del summarized[key]

            if full['status'] == value:
                summarized[u'status_string'] = key

        return summarized

    @staticmethod
    def _summarize_test(test_obj):
        summarized = dict(test_obj)

        del summarized['index']

        if 'phases' in test_obj:
            for key, value in test_obj['phases'].iteritems():
                if test_obj['phase'] == value:
                    summarized['phase_string'] = key
            del summarized['phases']
            del summarized['phase']

        return HTMLItem._expand_status(HTMLItem._scrub_stack(summarized))

    @staticmethod
    def _summarize_status(status_obj):
        return HTMLItem._expand_status(HTMLItem._scrub_stack(status_obj))
