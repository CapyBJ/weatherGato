class Forecast{
  constructor(){
    this.key = 'swAl21nz3ZLptnjgAGF8Gbi2ztklhUc5';
    this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
  }

  async feedCity(city){
    const cityDets = await this.getCity(city); //important to use the 'this' keyword to refer to this particular instance of the 'Forecast' class//
    const weather = await this.getWeather(cityDets.Key);
  
    return {
      cityDets : cityDets,
      weather : weather
    };
  }

  async getCity(city){
    const base = this.cityURL;
    const query = `?apikey=${this.key}&q=${city}`;
  
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
  }

  async getWeather(id){
    const base= this.weatherURL;
    const query= `${id}?apikey=${this.key}`;
  
    const response = await fetch (base + query);
    const data = await response.json();
    return data[0]
  }
};






