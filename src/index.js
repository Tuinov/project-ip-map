import 'leaflet/dist/leaflet.css';
import { validatIp } from './helpers';
import L from 'leaflet';
import icon from '../images/icon-location.svg';


const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],


});

let mapArea = document.querySelector('.map');

let map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13
});


const token = 'pk.eyJ1IjoiZml2YXBybyIsImEiOiJja3kwNnYzb3gwMDkzMnFsaTAyb3ZldnAwIn0.sE2_RSx3cl0-k8BgiwrwHw'
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
    attribution: 'Map data &copy; <a href="https://github.com/Tuinov/project-ip-map">Tuinov-Git</a> contributors, Imagery ©',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);
L.marker([51.5, -0.09], { icon: markerIcon }).addTo(map);


function getData() {
    if (validatIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_kZU80bL72qS6TWhycUPX4DHxdxlf1&ipAddress=${ipInput.value}`

        )
            .then(response => response.json())
            .then(setInfo);
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(data) {
    let { lat, lng, country, region, timezone } = data.location;
    ipInfo.innerText = data.ip;
    locationInfo.innerText = country + ', ' + region;
    ispInfo.innerText = data.isp;
    timezoneInfo.innerText = timezone;

    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: markerIcon }).addTo(map);

}


