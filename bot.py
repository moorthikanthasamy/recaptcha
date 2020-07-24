from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1920x1080")
chrome_options.add_argument(
    "User-Agent=Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
)
chromedriver_location = "./chromedriver"
driver = webdriver.Chrome(
    chrome_options=chrome_options, executable_path=chromedriver_location
)
driver.get("http://localhost:3000")
username_input = '//*[@id="root"]/form/input[1]'
password_input = '//*[@id="root"]/form/input[2]'
login_submit = '//*[@id="root"]/form/button'
driver.find_element_by_xpath(username_input).send_keys("pythonauto@gmail.com")
driver.find_element_by_xpath(password_input).send_keys("password1212")
driver.find_element_by_xpath(login_submit).click()
