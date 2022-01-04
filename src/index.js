import {validatIp} from './helpers';


const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    if(validatIp(ipInput.value)){
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_kZU80bL72qS6TWhycUPX4DHxdxlf1&ipAddress=${ipInput.value}`
        )
          .then(response => response.json())
          .then(data => console.log(data));
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}


