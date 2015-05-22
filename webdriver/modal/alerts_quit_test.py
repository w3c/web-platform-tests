import os
import sys
import unittest

sys.path.insert(1, os.path.abspath(os.path.join(__file__, "../..")))
import base_test
<<<<<<< HEAD
from selenium.common import exceptions
from selenium.webdriver.support import wait
=======
from webdriver import exceptions, wait
>>>>>>> upstream/master


class AlertsQuitTest(base_test.WebDriverBaseTest):
    def setUp(self):
<<<<<<< HEAD
        self.wait = wait.WebDriverWait(self.driver, 5, ignored_exceptions=[exceptions.NoAlertPresentException])
        self.driver.get(self.webserver.where_is('modal/res/alerts.html'))

    def test_can_quit_when_an_alert_is_present(self):
        self.driver.find_element_by_css_selector('#alert').click()
=======
        self.wait = wait.WebDriverWait(self.driver, 5, ignored_exceptions=[exceptions.NoSuchAlertException])
        self.driver.get(self.webserver.where_is('modal/res/alerts.html'))

    def test_can_quit_when_an_alert_is_present(self):
        self.driver.find_element_by_css('#alert').click()
>>>>>>> upstream/master
        alert = self.wait.until(lambda x: x.switch_to_alert())
        self.driver.quit()
        with self.assertRaises(Exception):
            alert.accept()
        AlertsQuitTest.driver = None


if __name__ == '__main__':
    unittest.main()
