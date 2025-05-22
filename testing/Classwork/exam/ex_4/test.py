import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from datetime import datetime


BASE_URL = "http://127.0.0.1:8000/birthdays/"
TEST_FIRST_NAME = "Сергей"
TEST_LAST_NAME = "Иванов"
TEST_BIRTHDAY = "15.05.1990"


def run_ui_test():
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)

    try:
        driver.get(BASE_URL)
        print("1. Страница успешно открыта")

        add_button = driver.find_element(By.CSS_SELECTOR, "a.btn-primary")
        add_button.click()
        print("2. Переход на страницу добавления выполнен")

        first_name_field = driver.find_element(By.CSS_SELECTOR, "input[name='first_name']")
        first_name_field.send_keys(TEST_FIRST_NAME)

        last_name_field = driver.find_element(By.XPATH, "//input[@name='last_name']")
        last_name_field.send_keys(TEST_LAST_NAME)

        birthday_field = driver.find_element(By.CSS_SELECTOR, "input[type='date']")

        birthday_date = datetime.strptime(TEST_BIRTHDAY, "%d.%m.%Y")
        formatted_date = birthday_date.strftime("%Y-%m-%d")
        driver.execute_script(f"arguments[0].value = '{formatted_date}';", birthday_field)

        print("3. Форма успешно заполнена")

        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()
        print("4. Форма отправлена")

        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located(
                    (By.XPATH, f"//*[contains(@class, 'list-group-item') and contains(., '{TEST_FIRST_NAME}') and contains(., '{TEST_LAST_NAME}')]")
                )
            )
            print("5. Успех: Новая запись появилась в списке!")
            return True

        except Exception as e:
            print("Элемент не найден в течение 5 секунд")
            return False

    except Exception as e:
        print(f"Ошибка во время выполнения теста: {str(e)}")
        return False

    finally:
        # Закрываем браузер
        time.sleep(2)  # Для визуальной проверки
        driver.quit()


if __name__ == "__main__":
    print("Запуск UI-теста для сайта дней рождений...")
    test_result = run_ui_test()
    print("\nРезультат теста:", "УСПЕХ" if test_result else "НЕУДАЧА")
