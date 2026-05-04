import { useEffect } from "react";
import { useState } from "react";

export default function GeoLocation() {

    const [locationData, setLocationData] = useState(null)

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude,longitude} = pos.coords;
            console.log(latitude,longitude)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url).then(res=>res.json()).then(data=>setLocationData(data))
        })
    },[])

    return {
        road: locationData?.address?.road,
        city: locationData?.address?.city,
    }
}