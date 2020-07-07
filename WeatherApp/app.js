window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.unit');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = 'https://cors-anywhere.herokuapp.com/';
            // const api = `${proxy}http://dark-sky.p.rapidapi.com/?rapidapi-key=400c3d3fdbmsh2303bc1ca3829b5p18170ajsnbc1da2eca8ab/${lat},${long}`;
            // const api = `${proxy}http://api.openweathermap.org/data/2.5/forecast?id=524091&APPID=9a4b7d8533fa9663406558b4f23f3c36/${lat},${long}`;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9a4b7d8533fa9663406558b4f23f3c36`;

            fetch(api)
                .then(response => {
                    return response.json(); 
                })
                .then(data => {
                    console.log(data);
                    const temperature = data.main.feels_like;
                    const weather = data.weather[0];
                    const description = weather.description;
                    const icon = weather.icon;
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name + ' / ' + data.sys.country; 
                    //FORMULA FOR CELSIUS
                    let celsius = (temperature - 273);
                    //Set Icon
                    const iconHolder = document.querySelector(".icon");
                    iconHolder.src = iconUrl 
                    // setIcons(icon, document.querySelector(".icon"));

                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "K"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "K";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }else{
        h1.textContent = "Not Supported";
    }

    // function setIcons(icon, iconID){
    //     const skycons = new Skycons({"color": "white"});
    //     console.log(icon);
    //     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    //     console.log(currentIcon);
    //     skycons.play();
    //     return skycons.set(iconID, Skycons["CLOUDY"]);
    // }
});