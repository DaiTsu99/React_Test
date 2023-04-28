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
              // setLat(position.coords.latitude);
              setLat(34.64640);
              // setLong(position.coords.longitude);
              setLong(135.78055);
            });
            if(lat!=undefined || long !=undefined){
              await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&lang=${lang}&APPID=${process.env.REACT_APP_API_KEY}`)
              .then(res => res.json())
              .then(async (result) => {
                setData(result);
                
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
          <div></div>
        )}
         
      </div>
         
     );
}
export default WeatherMaster

