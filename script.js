const registrationForm = document.forms.registrationForm;

//1. Валидация имени (только буквы и пробелы. Длина имени должна быть от 2 до 20 символов)
const nameInput = registrationForm.elements.name;
const nameErrorMessage = document.getElementById('nameErrorMessage');
const nameRegex = /^[a-zA-Z\s]{2,20}$/;

//2. Валидация email совершается благодаря type="email" у input

const emailInput = registrationForm.elements.email;
const emailErrorMessage = document.getElementById('emailErrorMessage');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//3. Валидация возраста совершается благодаря type="number" у input и заданным параметрам min и max
const ageInput = registrationForm.elements.age;
const ageErrorMessage = document.getElementById('ageErrorMessage');

//4. Валидация пола (обязательность выбора + выбор только одного из вариантов (обеспечивается radiobutton))
const sexErrorMessage = document.getElementById('sexErrorMessage');

//5. У элемента <select> нет атрибута placeholder, который бы позволял задать подсказку для этого элемента. Вместо этого обычно используется первый вариант списка в качестве подсказки для пользователя о том, что нужно выбрать. 
const selectProfession = registrationForm.elements.select;
const selectProfessionErrorMessage = document.getElementById('selectProfessionErrorMessage');

//6. Валидация пароля (производится в HTML)
const passwordInput = registrationForm.elements.password;
const passwordErrorMessage = document.getElementById('passwordErrorMessage');

//7. Валидация наличия отметки в чекбоксе (производится в HTML)
const agreementCheckbox = registrationForm.elements.checkboxOne.checked;
const agreementErrorMessage = document.getElementById('agreementErrorMessage');

//8.  Используя JavaScript, добавьте обработчик события отправки формы (`submit`), который будет выполнять следующие действия:
// - Отменять действие по умолчанию для события `submit`
// - Отображать сообщение об ошибке рядом с каждым полем при обнаружении ошибки валидации
// - Кнопка отправки должна быть неактивна (`disabled`), пока все поля формы не будут правильно заполнены и не будет отмечен чек-бокс согласия с условиями
// - Если форма проходит проверку валидности, выводите в консоль значения полей формы и очищайте форму

function validateInputs() {
    let isValid = true;

    const nameValue = nameInput.value;
    if (nameRegex.test(nameValue)) {
        // nameInput.classList.remove('error');
        nameErrorMessage.textContent = '';
    } else {
        // nameInput.classList.add('error');
        nameErrorMessage.textContent = 'Имя введено некорректно';
        isValid = false;
    }

    const emailValue = emailInput.value;
    if (emailRegex.test(emailValue)) {
        // emailInput.classList.remove('error');
        emailErrorMessage.textContent = '';
    } else {
        // emailInput.classList.add('error');
        emailErrorMessage.textContent = 'Некорректный формат Email';
        isValid = false;
    }

    if (ageInput.validity.valueMissing || !ageInput.checkValidity()) {
        // ageInput.classList.add('error');
        ageErrorMessage.textContent = 'Возраст введен некорректно';
        isValid = false;
    } else {
        // ageInput.classList.remove('error');
        ageErrorMessage.textContent = '';
    }

    const female = document.getElementById('female').checked;
    const male = document.getElementById('male').checked;
    if (!female && !male) {
        sexErrorMessage.textContent = 'Пожалуйста, укажите ваш пол!';
        isValid = false;
    } else {
        sexErrorMessage.textContent = '';
    }

    if (selectProfession.validity.valueMissing || !selectProfession.checkValidity()) {
        // professionSelect.classList.add('error');
        selectProfessionErrorMessage.textContent = 'Пожалуйста, выберите профессию';
        isValid = false;
    } else {
        // professionSelect.classList.remove('error');
        selectProfessionErrorMessage.textContent = '';
    }

    if (passwordInput.validity.valueMissing || !passwordInput.checkValidity()) {
        // passwordInput.classList.add('error');
        passwordErrorMessage.textContent = 'Некорректный пароль! Пароль должен содержать минимум 8 символов, хотя бы одну цифру, одну заглавную букву и одну строчную букву';
        isValid = false;
    } else {
        // passwordInput.classList.remove('error');
        passwordErrorMessage.textContent = '';
    }

    if (!agreementCheckbox) {
        agreementErrorMessage.textContent = 'Пожалуйста, дайте согласие на обработку данных.';
        isValid = false;
    } else {
        agreementErrorMessage.textContent = '';
    }

    return isValid;
};

const inputs = [nameInput, emailInput, ageInput, selectProfession, passwordInput, agreementCheckbox];
inputs.forEach(input => {
    input.addEventListener('input', () => {
        document.getElementById('submitButton').disabled = !validateInputs();
    });
});

registrationForm.addEventListener('submit', event => {
    event.preventDefault();
    if (validateInputs()) {
        console.log('Имя:', nameInput.value);
        console.log('Email:', emailInput.value);
        console.log('Возраст:', ageInput.value);
        console.log('Пол:', document.querySelector('input[name="radio"]:checked').value);
        console.log('Профессия:', selectProfession.value);
        console.log('Пароль:', passwordInput.value);
        registrationForm.reset();
    }
});

//9. Бонусное задание: реализуйте дополнительные обработчики событий focus и blur для каждого поля
const input = registrationForm.elements.input;
input.addEventListener('focus', function () {
    input.style.border = '1px solid #00ff00'; //Изменение границы при фокусе
});
input.addEventListener('blur', function () {
    input.style.border = ''; // Восстановление стандартной границы после потери фокуса
});
