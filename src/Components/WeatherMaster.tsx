import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Weather from './Weather'
// import Paginate from '../Paginate';

function wrap() {
    return new Promise((resolve) => setTimeout(resolve, 5000));
}

const WeatherMaster = () => {
    const [lat, setLat] = useState<number>();
    const [long, setLong] = useState<number>();
    const [data, setData] = useState<[]>([]);

    const [lang, setLang] = useState<string>("en");

    const [hasLoaded, setHasLoaded] = useState(false);

    const languageChange = async(target:any) => {
      console.log(target.value)
      let language = "";
      if (target.value == "1"){
        setHasLoaded(false)
        setLang("en");
        language = "en"
      } else if (target.value == "2") {
        setHasLoaded(false)
        setLang("ja");
        language = "ja"
      }
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&lang=${language}&APPID=${process.env.REACT_APP_API_KEY}`)
              .then(res => res.json())
              .then(result => {
                setData(result);
                setHasLoaded(true)
                console.log(result);
      });
    }

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function(position) {
              setLat(position.coords.latitude);
              // setLat(34.64640);
              setLong(position.coords.longitude);
              // setLong(135.78055);
            });
            if(lat!=undefined || long !=undefined){
              await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&lang=${lang}&APPID=${process.env.REACT_APP_API_KEY}`)
              .then(res => res.json())
              .then(async (result) => {
                setData(result);
                await wrap();
                setHasLoaded(true);
                
                console.log(result);
              });
            }
            
          }
          fetchData();      
    }, [lat, long]);

    //   const indexOfLastPost = currentPage * postsPerPage;
    //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      
    //   const paginate = (pageNumber:number) => {
    //      setCurrentPage(pageNumber);
    //   };

     return (
      <div className="bg-sky-400">
        {hasLoaded ? (
          <div>
            <div className="flex flex-row gap-x-4 justify-end drop-shadow-md">
              <button type="button" className="p-4 bg-white m-4 rounded-md" value="1" onClick={e => languageChange(e.target)}>English</button>
              <button type="button" className="p-4 bg-white m-4 rounded-md" value="2" onClick={e => languageChange(e.target)}>日本語</button>
            </div>
            
          
          <Weather weatherData={data} language={lang}/>
          </div>
        ): (
          <div className="p-10 flex flex-row font-semibold text-xl items-center"> 
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

