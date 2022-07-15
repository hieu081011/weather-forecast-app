import React,{useEffect,useState}from 'react'
import './style.scss'
import {BsSearch} from 'react-icons/bs'
import { getWeather,getAutoComplete } from './api'
import { colorDisplay } from './components/colorDisplay'
import Loading from './components/Loading'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from './i18n'
const App = ()=>{
    const [isLoading,setIsLoading]=useState(false)
    const [weatherData,setWeatherData]=useState({})
    const [search,setSearch]=useState('')
    const [themeColor,setThemeColor]=useState(colorDisplay[0])  
    const [error,setError]=useState('')
    const [searchAutoComplete,setSearchAutoComplete]=useState([])
    const { t, i18n } = useTranslation();
    const handleKeyPress=(e)=>{
        
        if(e.code==='Enter'){

            handleSearch()
        }
    } 

    const handleSearch =()=>{
        const searchQuery=search.trim()
        getWeatherData(searchQuery)
        setSearch('')
    }
    async function getAutoCompleteSearch(query){
        try {
            const {data}=await getAutoComplete(query)
            setSearchAutoComplete(data)
        } catch (error) {
            setSearchAutoComplete([])
        }
    }

    async function getWeatherData(location='Haiphong'){
        setIsLoading(true)
        setSearch('')
        setSearchAutoComplete([])
        try {

            const {data}=await getWeather(location)
            setWeatherData(data)
            
            setError('')
            const weather=data.current.condition.text
            console.log(weather)
            if(weather.match(/rain/g)){
                setThemeColor(colorDisplay[0])
            }
            else if(weather.match(/cloud|Cloud/g)){
                setThemeColor(colorDisplay[1])
            }
            else if(weather.match(/sunny|Sunny/g)){
                setThemeColor(colorDisplay[2])
            }
            
        } catch (error) {
            setError('Cant find the city!')
        }
        setIsLoading(false)
    }
    useEffect( ()=>{
        
         getWeatherData()  
    },[])
    useEffect(()=>{
        if(search){
            getAutoCompleteSearch(search)
        }
    },[search])
    return (
        <div style={{ backgroundImage: `url(${themeColor.background})` }} className='container'>
            {
                Object.keys(weatherData).length!==0&&
            <div className='temp-display'>
                <div className='temperature'>{weatherData.current.temp_c.toFixed(0)}°</div>
                <div className='city-date'>
                    <h3 className='city'>{weatherData.location.name}</h3>
                    <div className='other-info'>
                        <h5>{weatherData?.location?.localtime.split(' ')[1]} -</h5>
                        <h5>Tuesday,</h5>
                        <h5>{weatherData?.location?.localtime.split(' ')[0]}</h5>
                    </div>
                    
                </div>
                <div  className='weather'>
                        <span>{themeColor.icon}</span>
                        <h3>{themeColor.name}</h3>
                    </div>
            </div>

            }
            {isLoading&&<Loading/>}
            <div onKeyDown={handleKeyPress} className='side-bar'>
                <div>
                
                    <input type='text' placeholder={t('AnotherLocation')} value={search} onChange={(e)=>setSearch(e.target.value)}></input>
                    {
                        error&&
                    <div style={{color:'red',margin:'10px 0 0'}}>{error}</div>
                    }
                    {searchAutoComplete.length!==0&&
                    <div className='search-suggestions'>
                        {searchAutoComplete.map((item,index)=>(<div tabIndex={index} onClick={()=>{getWeatherData(item.name);setSearch('');setSearchAutoComplete([])}} key={item.name}>{item.name}</div>))}
                        
                    </div>
                    
                    }
                </div>
                <div className='relate-location'>
                    <h4>Brimingham</h4>
                    <h4>Brimingham</h4>
                    <h4>Brimingham</h4>
                    <h4>Brimingham</h4>
                </div>
                <div className='weather-detail'>
                    {t("WeatherDetail")}
                    {
                        Object.keys(weatherData).length!==0&&
                        <>
                            <div><h3>{t("Cloudy")}</h3><h4>{weatherData.current.cloud}%</h4></div>
                            <div><h3>{t("Humidity")}</h3><h4>{weatherData.current.humidity}%</h4></div>
                            <div><h3>{t("Wind")}</h3><h4>{weatherData.current.wind_kph}km/h</h4></div>
                            <div><h3>{t("Rain")}</h3><h4>{weatherData.current.precip_mm}mm</h4></div>
                        </>
                    }
                </div>
            </div>
            <div onClick={handleSearch}  style={{ backgroundColor: themeColor.buttonColor }} className='search-button'>
                <BsSearch/>
            </div>
            <div>
                <select onChange={(e)=>changeLanguage(e.target.value)}>
                    <option value='vi' >Tiếng Việt</option>
                    <option value='en'>English</option>

                </select>
            </div>
        </div>
    )
}
export default App