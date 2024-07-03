let inputForm = document.querySelector("form");
let inputCity = document.querySelector("form input")
let weatherCard = document.querySelector(".weather-card");
let APIWheatherKey = "603ce832d5bf2c39632724231c44aea7";

inputForm.addEventListener("submit", async ev =>{

    ev.preventDefault();
    const cityName = inputCity.value;
    try{
        const weatherData = await getWeatherData(cityName);
        dataDisplay(weatherData);
    }
    catch(error){
        errorDisplay(error);
    }


});


async function getWeatherData(city){

    const APIcall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIWheatherKey}`
    const response = await fetch(APIcall);
    //console.log(response)
    if(!response.ok){
        throw new Error(`Fetch is not okay Error ${response.status}`);
    }
    return response.json();
}
async function dataDisplay(data){
    console.log(data)
    const {name: cityName, main: {humidity,temp}, weather: [{ main: Status, id}]} = data; 
    const Cityheader = document.getElementById("city-name");
    const Citytemp = document.getElementById("temp");
    const cityStatus = document.getElementById("Status");
    const cityHumidity = document.getElementById("humidity");
    const Emoji = document.getElementById("weatherMoji");
    console.log(id)
    Cityheader.textContent = cityName;
    Citytemp.textContent = `Temprature: ${(temp-273.15).toFixed(1)}°C`;
    cityStatus.textContent = `Status: ${Status}`;
    cityHumidity.textContent =`Humidity: ${humidity}%`;
    Emoji.textContent = getWhaetherEmoji(id);

}

function errorDisplay(message){
    console.error(message);
    let h4Elm = document.createElement("h1");
    h4Elm.style.color = "red";
    h4Elm.textContent = message;
    document.body.appendChild(h4Elm);
}
function setFocusToTextBox(){
    inputCity.focus();
}
function getWhaetherEmoji(id){

    switch(true){
        case (id > 200 && id < 300):
            return '⛈';
        case (id > 300 && id < 400):
            return '☔';
        case (id > 500 && id < 600):
            return '🌧';
        case (id > 600 && id < 700):
            return '❄'
        case (id> 700 && id < 800):
            return '☁';
        case (id > 800 && id < 900):
            return '☁';
        default :
            return '⁉';
    }
}