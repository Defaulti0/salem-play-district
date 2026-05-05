import { useEffect } from "react";
import { useState } from "react";

export default function GeoLocation() {

    // const [locationData, setLocationData] = useState(null)
    const [latitude,setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude,longitude} = pos.coords;

            console.log(latitude,longitude)

            setLatitude(latitude)
            setLongitude(longitude)
            
            // const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            // fetch(url).then(res=>res.json()).then(data=>setLocationData(data))
        })
    },[])

    return {
        latitude,
        longitude,
    }
}