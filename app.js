
const searchBox = document.getElementById("search__box");
const searchBtn = document.getElementById("search__btn");
const dataOutEl = document.querySelector(".data__out");
const img = document.querySelector(".temp__box img");
const region = document.querySelector(".region");
const tempEl = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const apiKey = "3565a873aaa5923d283c487bcae50c55";
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric

searchBox.addEventListener("keyup", e => {
    if(e.key === "Enter") {
        const city = e.target.value;
        if(city === "") return;
        getData(city, apiKey);
    }
});

searchBtn.addEventListener("click", _ => {
    const city = searchBox.value;
    if(city === "") return;
    getData(city, apiKey);
});

function getData(city, key) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
    .then(res => res.json())
    .then(data => {
        if(data.cod === "404") return;
        getWeather(data);
    });
}

function getWeather(data) {
    tempEl.innerText = parseFloat(data.main.temp).toFixed(1);
    const status = data.weather[0].main;
    humidity.innerText = data.main.humidity+"%";
    wind.innerText = `${parseFloat(data.wind.speed).toFixed(1)} m/s`;    switch(status) {
        case "Clear":
            img.src = "./assets/clear.png";
            break;
        case "Clouds":
            img.src = "./assets/cloud.png";
            break;
        case "Mist":
            img.src = "./assets/mist.png";
            break;
        case "Rain":
            img.src = "./assets/rain.png";
            break;
        case "Snow":
            img.src = "./assets/snow.png";
            break;
    }

}

