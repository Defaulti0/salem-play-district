import { useEffect } from "react";
import { useState } from "react";

export default function GeoLocation() {
    const [latitude,setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    useEffect(()=>{
        const options = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        }
        
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude,longitude} = pos.coords;
            
            console.log(latitude,longitude)
            
            setLatitude(latitude)
            setLongitude(longitude)
        },
        (err) => console.error(err),
        options
        )
    },[])

    return {
        latitude,
        longitude,
    }
}