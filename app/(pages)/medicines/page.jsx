"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/selfmade/Navbar";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, dropItem } from "@/features/cart/cartSlice";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Script from "next/script";

const page = () => {
  const [data, setdata] = useState([]);
  const [offer, setoffer] = useState([]);
  const [location, setlocation] = useState("Location");
  const dispatch = useDispatch();
  const state_location = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman And Nicobar Islands",
    "Chandigarh",
    "Dadra And Nagar Haveli",
    "Daman And Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  useEffect(() => {
    const getdata = async () => {
      const med = await fetch("http://localhost:3000/api/getOfferData");
      const medicines = await med.json();
      setdata(medicines.data);
      setoffer(medicines.result);
    };
    getdata();
  }, []);
  const handleCartAddition = (item, e) => {
    dispatch(addItem(item));
  };
  const handleLocationChange = (loc) => {
    setlocation(loc)
    data.map((item) => {
      const finalprice = (
        item.priceusd *
        (1 - offer[0][loc.replace(/\s/g, "")][item.associateddisease] * 0.1)
      ).toFixed(2);
      item["finalprice"] = parseFloat(finalprice);
    })
  };
  return (
    <div>
      <Navbar />
      <div className="w-2/3 mx-auto flex flex-wrap gap-8 mt-8 relative">
        {location === "Location"
          ? data.map((item) => (
              <Card
                key={item.id}
                className="w-[220px] h-[250px] flex flex-col overflow-hidden relative group"
              >
                <img src={item.imageurl} alt="" className="rounded-t-xl" />
                <CardContent className="gap-2">
                  <CardTitle className="mt-2">{item.medicinename}</CardTitle>
                  <div className="mt-1">Price:{item.priceusd} USD</div>
                  <div>{item.manufacturer}</div>
                </CardContent>
                <Button
                  className="absolute -bottom-16 w-full h-[60px] group-hover:bottom-0 transition-all"
                  onClick={(e) => handleCartAddition(item, e)}
                >
                  Add to cart
                </Button>
              </Card>
            ))
          : data.map((item) => (
              <Card
                key={item.id}
                className="w-[220px] h-[250px] flex flex-col overflow-hidden relative group"
              >
                <img src={item.imageurl} alt="" className="rounded-t-xl" />
                <CardContent className="gap-2">
                  <CardTitle className="mt-2">{item.medicinename}</CardTitle>
                  <div className="mt-1">
                    Price:
                    {item.finalprice}{" "}
                    USD
                  </div>
                  <div>{item.manufacturer}</div>
                </CardContent>
                <Button
                  className="absolute -bottom-16 w-full h-[60px] group-hover:bottom-0 transition-all"
                  onClick={(e) => handleCartAddition(item, e)}
                >
                  Add to cart
                </Button>
              </Card>
            ))}
      </div>
      <div className="fixed right-10 bottom-5">
        <Popover>
          <PopoverTrigger>{location}</PopoverTrigger>
          <PopoverContent className="h-[200px] overflow-y-scroll">
            {state_location.map((loc) => (
              <Button
                key={loc}
                className="block"
                variant="ghost"
                onClick={(e) => handleLocationChange(loc,e)}
              >
                {loc}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default page;
