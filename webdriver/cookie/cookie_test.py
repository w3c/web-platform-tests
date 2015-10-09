import os
import sys
import unittest
import uuid

sys.path.insert(1, os.path.abspath(os.path.join(__file__, '../..')))
import base_test
from webdriver import exceptions


class CookieTest(base_test.WebDriverBaseTest):
    def setUp(self):
        self.driver.get(self.webserver.where_is('cookie/res/cookie_container.html'))

    def _generate_unique_name(self):
        name = 'name_%s' % uuid.uuid1().get_hex()

        cookies = self.driver.get_cookie()
        for cookie in cookies:
            self.assertNotEqual(name, cookie['name'])

        return name

    def _assert_cookie_exists(self, name, value):
        cookies = self.driver.get_cookie(name)
        self.assertEqual(1, len(cookies))
        self.assertEqual(name, cookies[0]['name'])
        self.assertEqual(value, cookies[0]['value'])

    def test_can_get_cookie_by_name(self):
        name = self._generate_unique_name()
        value = 'set'

        self.driver.execute_script('document.cookie = "%s=%s";' % (name, value))
        self._assert_cookie_exists(name, value)

    def test_can_create_a_well_formed_cookie(self):
        name = self._generate_unique_name()
        value = 'bar'

        self.driver.add_cookie({ 'name': name, 'value': value })
        self._assert_cookie_exists(name, value)

    def _assert_cookie_with_value_is_in_list(self, name, value, cookies):
        for c in cookies:
            if c['name'] == name:
                self.assertEqual(value, c['value'])
                return
        self.assertTrue(False)

    def test_get_all_cookies(self):
        name1 = self._generate_unique_name()
        value1 = 'value_for_%s' % name1
        name2 = self._generate_unique_name()
        value2 = 'value_for_%s' % name2

        existing_cookies = self.driver.get_cookie()

        self.driver.add_cookie({'name': name1, 'value': value1})
        self.driver.add_cookie({'name': name2, 'value': value2})

        all_cookies = self.driver.get_cookie()

        self.assertEqual(len(existing_cookies) + 2, len(all_cookies))
        self._assert_cookie_with_value_is_in_list(name1, value1, all_cookies)
        self._assert_cookie_with_value_is_in_list(name2, value2, all_cookies)

    def test_all_document_cookie_returned(self):
        for i in range(4):
            name = self._generate_unique_name()
            value = 'value_%s' % i
            self.driver.execute_script('document.cookie = "%s=%s";' % (name, value))

        cookies = self.driver.get_cookie()
        document_cookies = self.driver.execute_script('return document.cookie;')

        for document_cookie in document_cookies.split(';'):
            name, value = document_cookie.split('=')
            self._assert_cookie_with_value_is_in_list(name.strip(), value.strip(), cookies)

    def test_parameter_object_can_not_be_converted_to_a_cookie(self):
        try:
            self.driver.add_cookie({ 'not a cookie': 'should raise error' })
            self.fail( 'should have thrown exceptions.' )
        except exceptions.UnableToSetCookieException:
            pass

    def test_cookie_averse_document(self):
        self.driver.get('about:blank')
        name = self._generate_unique_name()
        value = 'about_blank'

        try:
            self.driver.add_cookie({ 'name': name, 'value': value })
            self.fail( 'should have thrown exceptions.' )
        except exceptions.InvalidCookieDomainException:
            pass

    def test_cookies_should_allow_secure_to_be_set( self ):
        name = self._generate_unique_name()
        value = 'secured'
        secure = True

        self.driver.add_cookie({ 'name': name,
                                 'value': value,
                                 'path': '/',
                                 'secure': secure})
        cookies = self.driver.get_cookie(name)
        self.assertEqual(1, len(cookies))
        self.assertTrue(cookies[0]['secure'])

    def test_secure_defaults_to_false( self ):
        name = self._generate_unique_name()
        value = 'bar'

        self.driver.add_cookie({ 'name': name,
                                 'value': value})

        cookies = self.driver.get_cookie(name)
        self.assertEqual(1, len(cookies))
        self.assertFalse(cookies[0]['secure'])

    def test_should_throw_an_exception_when_semicolon_exists_in_the_cookie_attribute(self):
        invalid_name = 'foo;bar'
        value = 'foobar'

        try:
            self.driver.add_cookie({ 'name': invalid_name, 'value': value })
            self.fail( 'should have thrown exceptions.' )

        except exceptions.UnableToSetCookieException:
            pass
        except exceptions.InvalidCookieDomainException:
            pass

    def test_should_throw_an_exception_the_name_is_null(self):
        val = 'foobar'

        try:
            self.driver.add_cookie({ 'name': None, 'value': val })
            self.fail( 'should have thrown exceptions.' )

        except exceptions.UnableToSetCookieException:
            pass
        except exceptions.InvalidCookieDomainException:
            pass

    def test_can_not_get_cookies_with_different_paths(self):
        self.driver.get(self.webserver.where_is('cookie/res/cookie_container.html'))

        name1 = self._generate_unique_name()
        value1 = 'different_path1'
        name2 = self._generate_unique_name()
        value2 = 'different_path2'

        existing_cookies = self.driver.get_cookie()

        self.driver.add_cookie({ 'name': name1,
                                 'value': value1,
                                 'path': '/cookie/Res/'})
        self.driver.add_cookie({ 'name': name2,
                                 'value': value2,
                                 'path': '/cookie/blabla/'})

        self.assertEqual(len(existing_cookies), len(self.driver.get_cookie()))

        self.driver.get(self.webserver.where_is('cookie/Res/bla.html'))
        self._assert_cookie_with_value_is_in_list(name1, value1, self.driver.get_cookie())

        self.driver.get(self.webserver.where_is('cookie/blabla/bla.html'))
        self._assert_cookie_with_value_is_in_list(name2, value2, self.driver.get_cookie())


if __name__ == '__main__':
    unittest.main()
