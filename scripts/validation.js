document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select select.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
        
        let isValid = true;

        const fullname = document.getElementById("fullname");
        const fullnameValue = fullname.value.trim();
        if (fullnameValue === ""){
            showError(fullname, "Введите ФИО");
            isValid = false;
        } else if (fullnameValue.split(' ').length < 2){  
            showError(fullname, "Введите полное ФИО (минимум 2 слова)");
            isValid = false;
        }

        const phone = document.getElementById("phone");
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, "");

        if (phoneValue === ""){
            showError(phone, "Введите номер телефона");
            isValid = false;
        } else if (phoneDigits.length < 10){ 
            showError(phone, "Введите 10 цифр номера");
            isValid = false;
        }
        

        const email = document.getElementById('email');
        const emailValue = email.value.trim();

        if (emailValue === ""){
            showError(email, "Введите адрес электронной почты");
            isValid = false;
        } else if (!emailValue.includes("@") || !emailValue.includes(".")){
            showError(email, "Введите корректный адрес электронной почты");
            isValid = false;
        }

        const theme = document.getElementById("theme");
        const themeValue = theme.value;
        if (!themeValue) {
            showError(theme, "Выберите тему");
            isValid = false;
        }

        const message = document.getElementById('message');
        const messageValue = message.value.trim();
        if (messageValue === "") {
            showError(message, "Введите сообщение");
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(message, "Сообщение должно содержать минимум 10 символов");
            isValid = false;
        }

        const checkbox = document.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            const checkboxDiv = checkbox.closest('.field');
            showError(checkbox, "Необходимо согласие на обработку данных");
            isValid = false;
        }

        if (isValid){
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                theme: themeValue,
                message: messageValue
            }; 
            
            const customEvent = new CustomEvent('formValid', {detail: formData});
            document.dispatchEvent(customEvent);
            
            console.log("Данные формы:", formData);
            alert("Форма отправлена! Данные в консоли.");
            
            
            form.reset();
        }
    });

    function showError(input, message){
        input.classList.add('is-danger');
        
        const help = document.createElement("p");
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        
        if (input.tagName === 'SELECT') {
            input.closest('.select').insertAdjacentElement('afterend', help);
        } else if (input.type === 'checkbox') {
            input.closest('.control').appendChild(help);
        } else {
            input.insertAdjacentElement('afterend', help);
        }
    }


    document.querySelectorAll('.input, .textarea, select, input[type="checkbox"]').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const parent = this.closest('.field');
            const errors = parent.querySelectorAll('.help.is-danger');
            errors.forEach(el => el.remove());
        });
        

        if (input.tagName === 'SELECT' || input.type === 'checkbox') {
            input.addEventListener('change', function() {
                this.classList.remove('is-danger');
                const parent = this.closest('.field');
                const errors = parent.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            });
        }
    });
});