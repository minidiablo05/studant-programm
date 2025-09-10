/*
validateUsername(username):
    a. Проверяет, что аргумент имеет тип string.
    b. Проверяет длину строки (от 5 до 15 символов).
    c. Если проверки не проходят, возвращает строку с ошибкой.
Если проходят — возвращает null.
*/

function validateUsername (username) {

    if (typeof username !== 'string') {
        return 'Вы ввели не строку'
    }
    
    if (username.length < 5 || username.length > 15) {
        return 'Имя пользователя должно содержать от 5 до 15 символов'
    }
    
    return null
}

// пример работы.
console.log(validateUsername('asdasd'))
console.log(validateUsername(12))
console.log(validateUsername('sd'))
console.log("\n")


/*
validateEmail(email):
a. Проверяет, что аргумент имеет тип string.
b. Проверяет, что строка содержит @ и после нее есть точка
(можно использовать includes()).
c. Возвращает строку с ошибкой или null.
*/

function validateEmail(email) {
    if (typeof email !== 'string') {
        return 'Вы ввели не строку';
    }
    
    if (!email.includes('@')) {
        return 'Email должен содержать символ @';
    }
    
    let paths = email.split("@")
    
    if (paths.length > 2 || !paths[1].includes('.') ){
        return 'Проверьте правильность знаков в вводимлм значении'
    }
    return null
}

// пример работы.
console.log(validateEmail('asdsd'))
console.log(validateEmail('asd@sd'))
console.log(validateEmail('a@sd@s.d'))
console.log(validateEmail(12))
console.log(validateEmail('asd@s.d'))
console.log("\n")


/*
validateAge(age):
a. Проверяет, что аргумент имеет тип number и является целым
числом.
b. Проверяет, что возраст в диапазоне [18, 120].
c. Возвращает строку с ошибкой или null.
*/

function validateAge(age) {
    
    if (typeof age !== 'number') {
        return 'вы ввели не число'
    }
    
    if (!Number.isInteger(age)) {
        return 'Введите целое число'
    }
    
    if (!(age <= 120 & age >= 18)) {
        return 'Ваш возраст не подходит в диапозон возрастов'
    }
    return null
}

// пример работы.
console.log(validateAge(1))
console.log(validateAge(18))
console.log(validateAge(100))
console.log(validateAge(3.2))
console.log(validateAge('2'))
console.log(validateAge('cfasd'))
console.log('\n')




/*
validateAgreement(isAgreed):
a. Проверяет, что аргумент имеет тип boolean и равен true.
b. Возвращает строку с ошибкой или null.
*/

function validateAgreement(isAgreed) {
    if (typeof isAgreed !== 'boolean') {
        return 'Вы ввели не булевое значение'
    }
    
    if (isAgreed !== true) {
        return 'вы выбрали false'
    }
    return null;
}

// пример работы.
console.log(validateAgreement('ascd'))
console.log(validateAgreement(false))
console.log(validateAgreement(true))
console.log('\n')



/*
validatePhone(phone):
a. Проверяет, что аргумент является string или undefined.
b. Если передан undefined (поле не заполнено), возвращает
null (ошибки нет).
c. Если передан string, проверяет, что он начинается с +7 и имеет
длину 12 символов.
d. Возвращает строку с ошибкой или null.
*/


function validatePhone(phone) {
    if (typeof phone === 'undefined') {
        return null;
    }
    
    if (typeof phone !== 'string') {
        return 'тип введёного неправельный';
    }
    
    if (phone.length !== 12) {
        return 'Номер телефона должен содержать 12 символов';
    }
    
    if (!phone.startsWith('+7')) {
        return 'Номер должен начинаться с +7';
    }
    return null;
}

// пример работы.
console.log(validatePhone('ascd'))
console.log(validatePhone(false))
console.log(validatePhone())
console.log(validatePhone(12222222222223123123))
console.log(validatePhone('+79851113506'))
console.log('\n')
