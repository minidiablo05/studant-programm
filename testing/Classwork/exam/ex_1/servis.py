def shop(stroka:str, dostavka:bool = False) -> int:
    if len(stroka) == 0:
        raise IndexError("Выберите продукцию")
    try:
        stroka = list(stroka.split())
        sell_summ = 0
    
        for i in stroka:
            j = stroka[0].split(':')
            if '1' in j[0]:
                sell_summ += 100*int(j[1])
            if '2' in j[0]:
                sell_summ += 2050*int(j[1])
            if '3' in j[0]:
                sell_summ += 3050*int(j[1])
            if '4' in j[0]:
                sell_summ += 4500*int(j[1])
            if '5' in j[0]:
                sell_summ += 5000*int(j[1])
    except IndexError:
        raise IndexError("Некоректный ввод")

    if dostavka:
        sell_summ += 1000

    if sell_summ > 0 and sell_summ < 5000:
        sell_summ -= sell_summ * 0.05
    elif sell_summ >= 5000 and sell_summ < 15000:
        sell_summ -= sell_summ * 0.12
    elif sell_summ >= 15000 and sell_summ < 25000:
        sell_summ -= sell_summ * 0.2
    else:
        sell_summ -= sell_summ * 0.3

    return sell_summ

def print_menu():
    print('1: цена 100')
    print('2: цена 2050')
    print('3: цена 3050')
    print('4: цена 4500')
    print('5: цена 5000')
    stroka = input('Введите наименование продуктаи через двоиточие колличество продукции, через пробел продукты: ')
    dostavka = bool(input("Если нужна доставка введите 1: "))
    print(f'Финальная стоимость:{shop(stroka, dostavka)}')
