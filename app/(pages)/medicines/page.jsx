"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/selfmade/Navbar";
import { Card, CardTitle , CardContent } from "@/components/ui/card";

const page = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const med = await fetch("http://localhost:3000/api/getdata");
      const medicines = await med.json();
      setdata(medicines);
    };
    getdata();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="w-2/3 mx-auto flex flex-wrap gap-8 mt-8">
        {data.map((item) => (
          <Card key={item.id} className="w-[220px] h-[250px] flex flex-col">
            <img src={item.imageurl} alt="" className="rounded-t-xl" />
            <CardContent className="gap-2">
            <CardTitle className="mt-2">{item.medicinename}</CardTitle>
              <div className="mt-1">Price:{item.priceusd} USD</div>
              <div>{item.manufacturer}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
