const weatherPlaceholder = document.getElementById("weather-placeholder");

const urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat=50.4333&lon=30.5167&lang=ua&appid=8539535bd4af7fb5994da3beaf60b214";

const fetchWeather = async () => {
    try {
        const res = await fetch(urlWeather);
        const data = await res.json();
        renderUI(data);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

const renderUI = (data) => {
    const { main, name, weather } = data;
    weatherPlaceholder.innerHTML = `
        <div class="icon-holder">
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png">
        </div>
        <h2>${Math.floor(main.temp - 273.15).toFixed(1)}&deg;</h2>
        <p>${name}</p>
        <button type="button" id="more-btn">More</button>
    `;
    document.getElementById("more-btn").addEventListener("click", () => {
        renderMoreUI(data);
        document.getElementById("more-btn").style.display = "none"
    });
}

const renderMoreUI = (data) => {

    const moreInfo = document.createElement("div")
    const { main, weather } = data;
    moreInfo.innerHTML = `
        <div class="weather-info">
        <p>Погода: ${weather[0].description}</p>
        <p>Тиск: ${main.pressure}Па</p>
        </div>
    `;

    weatherPlaceholder.appendChild(moreInfo);
}

fetchWeather();
