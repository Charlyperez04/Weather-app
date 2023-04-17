import {useEffect, useState} from 'react';
import {getCountries} from './services/countries';
import {getCities} from './services/cities';
import {getCityWeather} from './services/weather';

export const App=()=>{
  const [countries, setCountries] = useState([]);
  const [cities,setCities]=useState([]);
  const [weather,setWeather]=useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(()=>{    
    (async ()=>{
      setCountries(await getCountries());
    })();
  },[]);
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  cities.sort((a, b) => a.name.localeCompare(b.name));
  const countryHandler=async e=>{
    e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
    setWeather(null)
  }

  const cityHandler=async e=> {
    e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value));
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function toggleSearcherAndResult(){
    const searcher=document.getElementById('select-place');
    const result=document.getElementById('data-weather');
    searcher.classList.toggle('none');
    result.classList.toggle('none');
  }
  return (
    <>
    <aside className='select-place responsive2' id='select-place'>
      <section className='select-country'>
        <label>Elige un pais</label>
        <select onChange={countryHandler}>
        <option value="">Selecciona</option>
        {countries.map(country=><option key={country.cca2} value={country.cca2}>{country.name.common}</option>)}
        
      </select>
      </section>

      {cities.length > 0 && (
      <section className='select-city'>
        <label htmlFor="">Elige una ciudad</label>
        <select id='pene' onChange={cityHandler}>
        <option value="">Selecciona</option>
        {cities.map(city=><option key={city.id}>{city.name}</option>)}
      </select>
      {weather&&(
        <button className='toogler1' onClick={toggleSearcherAndResult}>Buscar</button>
      )}
      </section>
    )}
    </aside>
    {weather&&(
    <section className='weather-data none' id='data-weather'>
      <section className='main-data'>
      <button className='toogler2' onClick={toggleSearcherAndResult}>Busca otro lado</button>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="iconWeather" />
        <h2>{weather.main.temp.toFixed()}°C</h2>
        <p className='weather-description'>{weather.weather[0].description}</p>
        <p className='weather-date'>Hoy - {date.toLocaleDateString()}</p>
        <p className='weather-location'><img src="https://i.ibb.co/bvvms06/icons8-location-50.png" alt="" />{weather.name}</p>
        </section>
        <section className='weather-details'>
          <h3 className='weather-details-title'>Detalles</h3>
          <section className='weather-details-grid'>
          <section className='weather-details-block'>
            <h4>Sensacion termica</h4>
            <p>{weather.main.feels_like}°C</p>
          </section>
          <section className='weather-details-block'>
            <h4>Presión</h4>
            <p>{weather.main.pressure} mBar</p>
          </section>
        <section className='weather-details-block'>
          <h4>Viento</h4>
          <p>{weather.wind.speed}mph</p>
        </section>
        <section className='weather-details-block'>
          <h4>Humedad</h4>
          <p>{weather.main.humidity}%</p>
        </section>
        <section className='weather-details-block'>
          <h4>Temperatura minima</h4>
          <p>{weather.main.temp_min.toFixed()}°C</p>
        </section>
        <section className='weather-details-block'>
          <h4>Temperatura maxima</h4>
          <p>{weather.main.temp_max.toFixed()}°C</p>
        </section>
      </section>
      <p className='credits'>Creado por <a href="#">Charly</a> :)</p>
      </section>
    </section>
    )}
    </>
  )
}
