import {ajax} from '../tools/ajax';

export const getCityWeather=async city=>{
    const optionsRequest={
        method:"GET",
        url:"https://api.openweathermap.org/data/2.5/weather",
        params:{
            q:city,
            appid:"86f0c92155f57fcd5eba2020608eef22",
            units:"metric",
            lang:"es"
               }
    };
    return await ajax(optionsRequest);
}