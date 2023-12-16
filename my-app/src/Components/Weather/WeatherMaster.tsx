import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Weather from './Weather'
import { useLang } from '../Utilities/LangContext';
import languageContent from '../Utilities/LanguageContent';
import LanguageDropdown from '../Utilities/LanguageDropdown';
import WeatherForecastDisplay from "./WeatherForecast";
// import Paginate from '../Paginate';

//^ Connecting To API requiring API Key and designing frontend/user-centred design

function wrap() {
    return new Promise((resolve) => setTimeout(resolve, 5000));
}

const WeatherMaster = () => {
    const [latitude, setLat] = useState<number>();
    const [longitude, setLong] = useState<number>();
    const [forecastData, setForecastData] = useState<[]>([]);
    const [currentData, setCurrentData] = useState<[]>([]);

    const [baseLoc, setBaseLoc] = useState<boolean>(true);

    const [lang, setLang] = useState<string>("en");

    const [locationText, setLocationText] = useState<string>();
    const [zoneName, setZoneName] = useState<string>();
    const [hasLoaded, setHasLoaded] = useState(false);

    const { isLang } = useLang();

    // Access the language-specific content based on the selected language
    const content = languageContent[isLang as keyof typeof languageContent];

    const locationChange = async() => {
      // console.log(target.value)

      // Construct the API URL with the user input and API key
    const apiUrl = `${process.env.REACT_APP_OPENCAGE_API_URL}/json?q=${locationText}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`;
      
    // Make the API request
    await fetch(apiUrl)
      .then((response) => response.json())
      .then(async (currentData) => {
        // Extract coordinates from the API response
        const firstResult = currentData.results[0]; // Assuming you want the first result
        if (firstResult) {
          const { lat, lng } = firstResult.geometry;
          setBaseLoc(false);
          setLat(lat);
          setLong(lng);
          console.log('Coordinates:', lat, lng); // Use lat and lng as needed
          await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${lng}&units=metric&lang=${content.language}&APPID=${process.env.REACT_APP_API_KEY}`)
                  .then(res => res.json())
                  .then(result => {
                    setCurrentData(result);
                    setHasLoaded(true)
                    console.log(result);
          });
        } else {
          console.log('No results found');
        }
      })
      .catch((error) => {
        console.error('Error fetching currentData:', error);
      });
      
      
      
    }

    const fetchData = async () => {
      if(baseLoc){
        navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        // setLat(34.64640);
        setLong(position.coords.longitude);
        // setLong(135.78055);
        });
      }
      
      
      if(latitude!=undefined || longitude !=undefined){

        
              
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&lang=${content.language}&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(async (result) => {
          setCurrentData(result);
          console.log(result);
        });

        await fetch(`${process.env.REACT_APP_API_URL}/forecast/?lat=${latitude}&lon=${longitude}&units=metric&lang=${content.language}&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(async (result) => {
          console.log("forecast");
          setForecastData(result);
          console.log(result);
        });

        await fetch(`${process.env.REACT_APP_TIMEZONEDB_API_URL}/get-time-zone?key=${process.env.REACT_APP_TIMEZONEDB_API_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`)
        .then(res => res.json())
        .then(async (result) => {
          setZoneName(result.zoneName);
          console.log(result);
        });

        await wrap();
        setHasLoaded(true);
      }
      
    }

    useEffect(() => {
      
          fetchData();      
    }, [isLang, latitude, longitude]);

    //   const indexOfLastPost = currentPage * postsPerPage;
    //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      
    //   const paginate = (pageNumber:number) => {
    //      setCurrentPage(pageNumber);
    //   };

     return (
      <div className="h-full bg-gradient-to-br from-white from-15% via-blue-400 via-50% to-sky-600 to-80%">
        {hasLoaded ? (
          <div>
            <div className="flex flex-row gap-x-4 justify-end drop-shadow-md">
              <div className="m-4">
                <LanguageDropdown/>
                </div>
              
              {/* <button type="button" className="p-4 bg-white m-4 rounded-md" value="1" onClick={e => languageChange(e.target)}>English</button>
              <button type="button" className="p-4 bg-white m-4 rounded-md" value="2" onClick={e => languageChange(e.target)}>日本語</button> */}
            </div>
            <div className="flex flex-row max-w-6xl mx-auto">
                <input className='basis-3/4 border border-gray-200 p-2 w-full rounded duration-700 ease-in-out'
                    name="locationText" id="locationText" onChange={e => setLocationText(e.target.value)}
                    value={locationText}
                    placeholder="Enter your location here"
                    required/>
            
              
                <button type='button'  className="basis-1/4 m-2 p-4 text-white hover:text-black hover:scale-100 scale-90 text-xl
                                                  rounded-md bg-zinc-400 hover:bg-white duration-700 ease-in-out" 
                                      onClick={e => locationChange()}>Search</button>      
            </div>
            
            <Weather weatherData={currentData} language={content.language} fetchData={fetchData} zoneName={zoneName!}/>
            <WeatherForecastDisplay forecastData={forecastData} language={content.language} zoneName={zoneName!}/>
          
            
          </div>
        ): (
          <div className="p-10 flex flex-row font-semibold text-xl items-center h-screen"> 
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading Page
        </div>
        )}
         
      </div>
         
     );
}
export default WeatherMaster

