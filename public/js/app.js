console.log("Starting");

const weather = document.querySelector('form');
const search = document.querySelector('input');
const result = document.querySelector('#result');
const error = document.querySelector('#error');
const success = document.querySelector('#success');
weather.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    result.textContent ='Loading...'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                error.textContent ='Ooops.., Location is invalid or Please enter location again '
                result.textContent =''
            } else {
                console.log(data.forecastdata)
                error.textContent = location;
                result.textContent = data.forecastdata;
                success.textContent = 'success';

            }
        })
    });
    console.log(location);
})