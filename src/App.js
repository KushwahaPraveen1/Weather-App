import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import Moment from 'moment';
import { AiOutlineSearch } from "react-icons/ai";
import { BsCloudsFill } from "react-icons/bs";

function App() {
  const formatDate = Moment().format('DD MMM YYYY')
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})


  const getWetherDetails = (cityName) => 

{    
  if (!cityName)
  return
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=965f25c471250cb64de57c780b6d79ba`
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch(() => {
      alert("Enter correct city name");
    })
  
}
useEffect(() => {
  getWetherDetails("Jhansi")
}, [])



const handleChangeInput = (e) => {
   
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    
    getWetherDetails(inputCity)
  }


  return (
    <>   
<div className="main_div">
<div className="right_main">
    <div className="wrapper">
  <div className="searchBar">
    <input id="searchQueryInput" type="text" value={inputCity} onChange={handleChangeInput} name="searchQueryInput" placeHolder="Search" />
    <button id="searchQuerySubmit" type="button" onClick={handleSearch} name="searchQuerySubmit">
   <span className="search_icon"><AiOutlineSearch/></span> 
    </button>
  </div>
</div>
     
     <div className="right_card">

      <div className="humidity"><div className="content2">Humidity</div>{data.main?<div className="content1"> {((data?.main?.humidity))} %</div>:null}</div>
      <div className="feelslike"><div className="content2">Feels Like</div>  {data.main?<div className="content1"> {((data?.main?.feels_like) - 273.15).toFixed(2)}°C</div>:null}</div>
      <div className="wind"><div className="content2">Wind Speed</div>   {data.wind?<div className="content1"> {((data?.wind?.speed))} Km/h</div>:null}</div>
      <div className="pressure"><div className="content2">Pressure</div>   <div className="content1">{data.main?<div className="content1"> {((data?.main?.pressure))} Pa</div>:null}</div></div>
     </div>
</div>
    <div className="left_card">
      <div className="weekname">Wednesday</div>
      
     <div className="date">{formatDate}</div> 
     
     <div className="city">{data.name} {data.sys? <span> |  {data.sys.country}</span>:null }</div>
     <div className="image"> <BsCloudsFill/></div>
      {data.main?<div className="temprature">{((data?.main?.temp) - 273.15).toFixed(2)}°C</div>:null}
    {data.weather?<div className="description"> {((data.weather[0].main))}</div>:null}
      
    </div>

</div>


      </>
  );
}

export default App;
