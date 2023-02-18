const searchCity = document.querySelector('.search-city');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.getElementById('icon-img');
//create a new instance of the Forecast class//
const forecast = new Forecast();

//getting city name from input form
searchCity.addEventListener('submit', (e)=>{
  e.preventDefault();
  
  //getting the value entered in the input box//
  const city = searchCity.city.value.trim();
  searchCity.reset();

  //feed details to the updateUI by calling 'feedcity' function and tagging on 'then', because it returns a promise//
  forecast.feedCity(city).then((data)=>updateUI(data)).catch((err)=>console.log(err));
  card.classList.remove('d-none');

  //setting local storage
  localStorage.setItem('city',city);
});


//update UI with above details
const updateUI = (data)=>{
  console.log(data); // 'data' is the value returned by 'feedcity' which inturn comprises values returned by 'getcity' and 'getWeather'//
  const cityDets = data.cityDets;
  const weather = data.weather;

  details.innerHTML= `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

  icon.src = `icons/${weather.WeatherIcon}.svg`;
  if(weather.IsDayTime){
    time.src="images/daytime.jpg";
  }else{
    time.src="images/night.jpg";
  }
};

// auto display weather of last saved city in the localStorage and set display of 'card' to auto so it appears when page is refreshed//
if(localStorage.getItem('city')){
  forecast.feedCity(localStorage.getItem('city'))
   .then((data)=>{
      updateUI(data);
      card.classList.remove('d-none');
    }).catch(err=>console.log(err));
};

