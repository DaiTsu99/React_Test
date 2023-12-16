import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';

import 'moment/locale/ja';
import { Button } from 'semantic-ui-react'
import WeatherForecastDay from './WeatherForecastDetail';

const refresh = () => {
    window.location.reload();
}

const WeatherForecastDisplay = ({forecastData,language,zoneName}:{forecastData:any, language:any, zoneName:string}) => {

    const forecastList = forecastData.list;
    const coordinate = forecastData.city.coord;

    const settings = {
        infinite:true,
        speed: 500,
        slidesToShow: 4, // Number of slides to show at a time
        slidesToScroll: 2,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            }
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };
    
    return(
    <div className="py-6 flex justify-center items-center">
        <div className="w-3/4 h-fit bg-gradient-to-b from-lime-400 from-20% to-green-800 to-80% drop-shadow-md rounded-xl p-4">
            <Slider {...settings}>
            {forecastList &&
              forecastList.map((forecast:any, index:number) => (
                <div key={index}>
                  <WeatherForecastDay
                    forecastDay={forecast}
                    language={language}
                    coordinate={coordinate}
                    zoneName={zoneName!}
                  />
                </div>
              ))}
          </Slider>            
        </div>
    </div>
)}

export default WeatherForecastDisplay;