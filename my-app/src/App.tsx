import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Routes,Route, Navigate } from "react-router-dom"
import Nav from './Nav'
import Homepage from './Components/Homepage'
import JSONPost from './Components/JSONPost'
import Weather from './Components/Weather/WeatherMaster'
import GoREST from './Components/GoREST'
import AWS_Raspberry from './Components/AWS_Raspberry';
import { LangProvider } from './Components/Utilities/LangContext';
import './App.css';

const App = () => {

  return (
    <div>
      <LangProvider> {/* Providing Context for the Language*/}
      <BrowserRouter> 
      <Nav/>
      <Routes>
        <Route path="/Home" element={<Homepage/>} />
        <Route path="/" element={<Navigate replace to="/Home" />} />
        <Route path="/Post" element={<JSONPost/>} />
        <Route path="/Weather" element={<Weather/>} />
        <Route path="/GoREST" element={<GoREST/>} />
        <Route path="/AWS/Raspberry" element={<AWS_Raspberry/>} />
      </Routes>
      </BrowserRouter>
      </LangProvider>
    </div>
  )
}

export default App;
