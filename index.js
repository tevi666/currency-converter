const form = document.querySelector('form');
const valueInput = form.querySelector('#value');
const message = form.querySelector('.message');

const myHeaders = new Headers();
myHeaders.append("apikey", "Igd1tNIl3IX2mtOxs7676F3FuhbS4roc");
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};
const getData = (url) => {
    return fetch(url, requestOptions)
        .then(response => response.json())
        .catch(err => {
            console.log('err', err);
            message.textContent = 'Ошибка запроса';
        });
};
const submitForm = () => {
    const formData = new FormData(form);
    const formBody = {};

    formData.forEach((val, key) => {
        formBody[key] = val;
    });
    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${formBody.convertedToValue}&from=${formBody.convertedValueForm}&amount=${+formBody.amount}`;
    message.textContent = 'Отправляем запрос на сервер...';
    getData(url).then(data => {
        if (data.success) {
            valueInput.value = Math.floor(data.result * 100) / 100;
            message.textContent = '';
        }
    }).catch(err => {
        console.log(err.message);
        message.textContent = 'Ошибка запроса';
    });
};
form.addEventListener('input', e => {
    if (e.target.name === 'amount' && e.target.value == 0) {
        message.textContent = 'Число не может быть меньше единицы!';
    } else {
        message.textContent = '';
        return;
    }
});
form.addEventListener('submit', e => {
    e.preventDefault();
    submitForm();
});