window.addEventListener('load', () =>{
    let long;
    let lat;

    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconElement = document.querySelector('.icon');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0cb23e9282a11c68566c8af6c5954ac1&units=imperial`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const{description, icon} = data.weather[0];
                const {temp} = data.main;
                const {country} = data.sys;

                tempDegree.textContent = temp;
                tempDescription.textContent = description;
                locationTimezone.textContent = data.name+ ', '+ country;
                iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>`;
            })
        });
       
    }else{
        h1.textContent = "Allow App use your location to get weather details";
    }
})