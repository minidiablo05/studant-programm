class Book:

    def __init__(self, title, author, year_published, is_available):
        self.title = title        
        self.author = author        
        self.year_published = year_published        
        self.is_available = is_available

    def age_define(self):
        if 1900 <= self.year_published < 2000:
            return 'Классика'
        if self.year_published >= 2000:
            return 'Современная'
        return 'Антиквариат'

    def available_define(self):
        return 'Доступно' if self.is_available else 'Недоступно'

    def show_book_info(self):
        return (f'Название: {self.title}, '               
                f'Автор: {self.author}, '
                f'категория: {self.age_define()}, '
                f'статус: {self. available_define()}') 


# Создаем экземпляр класса Book
war_and_peace = Book(title='Война и мир', author='Лев Толстой', year_published=1869, is_available=False)

# Ожидаемая строка, которую должен вернуть метод show_book_info()
expected_string = 'Название: Война и мир, Автор: Лев Толстой, категория: Антиквариат, статус: Недоступно'

# Пишем утверждение:
# "вызов метода show_book_info объекта war_and_peace вернёт строку, сохранённую в expected_string"
assert war_and_peace.show_book_info() == expected_string, 'Метод show_book_info работает некорректно!' 
# Создаём экземпляр класса Book
book_1984 = Book(title='1984', author='Джордж Оруэлл', year_published=1949, is_available=True)

# Заготавливаем строку, которую по ожиданию должен вернуть метод show_book_info():
expected_string_1984 = 'Название: 1984, Автор: Джордж Оруэлл, категория: Классика, статус: Доступно'

# Пишем утверждение:
# "вызов метода show_book_info объекта book_1984 вернёт строку, сохранённую в expected_string_1984"
assert book_1984.show_book_info() == expected_string_1984, 'Метод show_book_info работает некорректно!' 

