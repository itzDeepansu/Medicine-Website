"use client"
import React ,{ useState , useEffect } from 'react'

const page = () => {
    const [data, setdata] = useState([]);
    const [offer, setoffer] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const med = await fetch("http://localhost:3000/api/getOfferData");
      const medicines = await med.json();
      setdata(medicines.data);
      setoffer(medicines.result);
    };
    getdata();
  }, []);
  console.log(data);
  return (
    <div>
      OfferArea
    </div>
  )
}

export default page
