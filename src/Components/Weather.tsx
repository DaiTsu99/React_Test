import React from 'react';
import moment from 'moment';
import { Button } from 'semantic-ui-react'

const refresh = () => {
    window.location.reload();
}

const WeatherDataDisplay = ({weatherData}:any,lang:string) => (
    <div className="h-screen flex justify-center items-center">
        <div className="w-3/4 h-fit bg-green-800 drop-shadow-md rounded-xl p-2">
            <div className="flex flex-row justify-between">
                <div className="font-extralight text-xl text-white flex flex-row items-end">{lang=="en" ? "City Name" : (lang=="ja"? "市名":"")}<div className="ml-4 text-4xl">{weatherData.name}</div></div>
                <button onClick={refresh} >
                    <svg color="white" width="30" height="30" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/> <path d="M16.5829 9.66667C15.8095 8.09697 14.043 7 11.9876 7C9.38854 7 7.25148 8.75408 7 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/> <path d="M14.4939 9.72222H16.4001C16.7315 9.72222 17.0001 9.45359 17.0001 9.12222V7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/> <path d="M7.41707 13.6667C8.19054 15.6288 9.95698 17 12.0124 17C14.6115 17 16.7485 14.8074 17 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/> <path d="M9.5061 13.6222H7.59992C7.26855 13.6222 6.99992 13.8909 6.99992 14.2222V16.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/> </svg>
                </button>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="font-extralight text-xl text-white flex flex-row">
                    Temperature <div className="ml-4 font-semibold text-2xl">{weatherData.main.temp}</div>
                    <svg className="svg-icon" width="30" height="30" viewBox="0 0 20 20">
                                <path fill="#fc351e" d="M5.739,4.034c-0.941,0-1.705,0.763-1.705,1.705c0,0.941,0.763,1.705,1.705,1.705c0.941,0,1.705-0.764,1.705-1.705C7.443,4.797,6.68,4.034,5.739,4.034 M5.739,6.591c-0.47,0-0.853-0.382-0.853-0.852s0.382-0.853,0.853-0.853s0.852,0.382,0.852,0.853S6.209,6.591,5.739,6.591 M13.194,12.723c-0.289,0.157-0.587,0.235-0.894,0.235c-0.393,0-0.747-0.076-1.064-0.229c-0.316-0.152-0.59-0.362-0.818-0.63s-0.404-0.585-0.529-0.952c-0.125-0.367-0.187-0.768-0.187-1.204c0-0.405,0.062-0.783,0.187-1.135c0.125-0.351,0.301-0.659,0.529-0.923s0.501-0.47,0.818-0.619c0.317-0.149,0.672-0.224,1.064-0.224c0.264,0,0.526,0.054,0.786,0.162c0.261,0.106,0.529,0.32,0.808,0.641l1.049-0.825c-0.379-0.466-0.786-0.797-1.226-0.992c-0.438-0.195-0.914-0.292-1.427-0.292c-0.585,0-1.122,0.101-1.61,0.304c-0.488,0.202-0.909,0.491-1.262,0.865C9.065,7.28,8.79,7.732,8.59,8.264c-0.199,0.531-0.299,1.122-0.299,1.771c0,0.634,0.1,1.211,0.299,1.73c0.2,0.52,0.476,0.965,0.829,1.336c0.353,0.371,0.773,0.657,1.262,0.859c0.488,0.203,1.025,0.304,1.61,0.304c0.556,0,1.08-0.114,1.571-0.344c0.492-0.229,0.909-0.596,1.252-1.101l-1.112-0.849C13.752,12.316,13.483,12.566,13.194,12.723 M17.671,0.625H2.33c-0.941,0-1.705,0.763-1.705,1.705v15.341c0,0.94,0.763,1.704,1.705,1.704h15.341c0.94,0,1.704-0.764,1.704-1.704V2.33C19.375,1.388,18.611,0.625,17.671,0.625M18.522,17.671c0,0.47-0.382,0.852-0.852,0.852H2.33c-0.47,0-0.853-0.382-0.853-0.852V2.33c0-0.47,0.382-0.853,0.853-0.853h15.341c0.47,0,0.852,0.382,0.852,0.853V17.671z"></path>
                    </svg>
                </div>
                <div className="mt-4 font-extralight text-xl text-white flex flex-row items-center"> 
                    <img src={"https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"}/>
                    <div className="ml-4 font-normal capitalize">{weatherData.weather[0].description}</div>
                </div>
            </div>
            
            <div className="flex flex-row justify-between mt-4">
                <div className="font-extralight text-xl text-white flex flex-row items-end">
                    <div className="flex flex-col justify-center">
                        <svg className="svg-icon" color="white" width="50" height="50" viewBox="0 0 20 20">
                            <path fill="#f6b346" d="M18.935,18.509h-3.83c0-2.819-2.285-5.105-5.104-5.105s-5.105,2.286-5.105,5.105H1.066c-0.234,0-0.425,0.19-0.425,0.426c0,0.234,0.191,0.425,0.425,0.425h17.869c0.234,0,0.425-0.19,0.425-0.425C19.359,18.699,19.169,18.509,18.935,18.509 M5.746,18.509c0-2.351,1.905-4.254,4.254-4.254s4.255,1.903,4.255,4.254H5.746zM14.813,14.298l1.805-1.806c0.166-0.166,0.166-0.436,0-0.602c-0.166-0.167-0.436-0.167-0.602,0l-1.806,1.805c-0.165,0.166-0.165,0.436,0,0.603C14.378,14.463,14.647,14.463,14.813,14.298 M9.575,9.575v2.552c0,0.235,0.19,0.426,0.425,0.426s0.425-0.19,0.425-0.426V9.575c0-0.235-0.19-0.426-0.425-0.426S9.575,9.339,9.575,9.575 M5.187,14.298c0.167,0.165,0.436,0.165,0.603,0c0.166-0.167,0.166-0.437,0-0.603l-1.806-1.805c-0.167-0.167-0.435-0.167-0.602,0c-0.166,0.166-0.166,0.436,0,0.602L5.187,14.298z M7.448,4.044h0.851v2.127c0,0.235,0.19,0.425,0.425,0.425h2.553c0.234,0,0.426-0.19,0.426-0.425V4.044h0.851c0.234,0,0.425-0.19,0.425-0.425c0-0.117-0.047-0.224-0.124-0.301l-2.553-2.552C10.224,0.688,10.117,0.641,10,0.641S9.776,0.688,9.699,0.766L7.146,3.318C7.07,3.395,7.022,3.501,7.022,3.619C7.022,3.854,7.213,4.044,7.448,4.044 M10,1.667l1.525,1.525h-0.249c-0.234,0-0.425,0.191-0.425,0.426v2.127H9.149V3.619c0-0.235-0.19-0.426-0.425-0.426H8.475L10,1.667z"></path>
                        </svg>
                        Sunrise
                    </div>
                    
                    <div className="text-3xl ml-4">
                        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}  
                    </div>
                    
                </div>
                <div className="font-extralight text-xl text-white flex flex-row items-end">
                    <div className="text-3xl mr-4">
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}
                    </div>
                    <div className="flex flex-col justify-center">
                        <svg className="svg-icon" color="white" width="50" height="50" viewBox="0 0 20 20">
                                <path fill="#f6b346" d="M5.163,5.768c0.167,0.167,0.438,0.167,0.605,0c0.167-0.167,0.167-0.438,0-0.604L3.953,3.349c-0.167-0.167-0.438-0.167-0.604,0c-0.167,0.167-0.167,0.437,0,0.604L5.163,5.768z M14.837,5.768l1.814-1.814c0.167-0.167,0.167-0.438,0-0.604c-0.168-0.167-0.438-0.167-0.605,0l-1.813,1.814c-0.167,0.167-0.167,0.437,0,0.604C14.399,5.935,14.67,5.935,14.837,5.768 M10,4.014c0.236,0,0.428-0.191,0.428-0.428V1.021c0-0.236-0.192-0.428-0.428-0.428S9.572,0.785,9.572,1.021v2.565C9.572,3.823,9.764,4.014,10,4.014 M18.979,10h-3.848c0-2.833-2.297-5.131-5.131-5.131c-2.833,0-5.131,2.297-5.131,5.131H1.021c-0.236,0-0.428,0.191-0.428,0.428s0.192,0.428,0.428,0.428h17.957c0.236,0,0.428-0.191,0.428-0.428S19.215,10,18.979,10 M5.725,10c0-2.361,1.914-4.275,4.275-4.275S14.276,7.639,14.276,10H5.725zM12.565,15.985H11.71v-2.138c0-0.235-0.191-0.427-0.428-0.427H8.717c-0.236,0-0.428,0.191-0.428,0.427v2.138H7.435c-0.235,0-0.427,0.191-0.427,0.428c0,0.118,0.047,0.226,0.125,0.304l2.565,2.564c0.077,0.078,0.185,0.125,0.302,0.125s0.225-0.047,0.302-0.125l2.565-2.564c0.078-0.078,0.126-0.186,0.126-0.304C12.993,16.177,12.802,15.985,12.565,15.985 M10,18.374l-1.533-1.533h0.25c0.236,0,0.428-0.191,0.428-0.428v-2.138h1.709v2.138c0,0.236,0.192,0.428,0.428,0.428h0.251L10,18.374z"></path>
                        </svg>
                        Sunset
                    </div>
                    
                    
                </div>
            </div>
            
            
            <div className="mt-4 font-extralight text-2xl text-white flex flex-row justify-between border-t-4 border-black">
                <div>As of 『{moment().format('LTS')}』</div>
                <div className="  flex flex-row justify-end gap-x-4 italic">
                    <div>{moment().format('dddd')},</div>
                    <div>{moment().format('LL')}</div>  
                </div>
            </div>
            
            
        </div>
    </div>
)

export default WeatherDataDisplay;