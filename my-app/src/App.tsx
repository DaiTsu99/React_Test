import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Routes,Route, Navigate } from "react-router-dom"
import Nav from './Nav'
import Homepage from './Components/Homepage'
import JSONPost from './Components/JSONPost'
import Weather from './Components/WeatherMaster'
import GoREST from './Components/GoREST'
import './App.css';

const App = () => {

  return (
    <div>
      
      <BrowserRouter> 
      <Nav/>
      <Routes>
        <Route path="/Home" element={<Homepage/>} />
        <Route path="/" element={<Navigate replace to="/Home" />} />
        <Route path="/Post" element={<JSONPost/>} />
        <Route path="/Weather" element={<Weather/>} />
        <Route path="/GoREST" element={<GoREST/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
