import {ajax} from '../tools/ajax';

export const getCities=async(countryCode)=>{
    const optionsRequest={
        method:"GET",
        url:"https://spott.p.rapidapi.com/places",
        headers:{
            'X-RapidAPI-Key': '145f38c3b1msh9c94ad7c23a7e69p1cd301jsnf9443042eb53',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
        },
        params:{
            limit:100,
            type:"CITY",
            country:countryCode??"MX",
               }
    };
    return await ajax(optionsRequest);
}