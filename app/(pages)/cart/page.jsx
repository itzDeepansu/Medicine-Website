"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/selfmade/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addItem, removeItem, dropItem } from "@/features/cart/cartSlice";
const page = () => {
  const cartItems = useSelector((state) => state.cartItems).slice(1);
  const cartValue = useSelector((state) => state.cartValue);
  const shippingfee = 0;
  const dispatch = useDispatch();
  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
  };
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  const handledropItem = (id) => {
    dispatch(dropItem(id));
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-4/5 mx-auto">
        <div className="my-5">Home / Cart</div>
        <ul className="grid grid-cols-4 gap-60 mb-5">
          <li>Product</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>SubTotal</li>
        </ul>
        <div className="flex flex-col gap-5 h-[350px] overflow-y-scroll">
          {cartItems?.map((item) => (
            <Card
              className="grid grid-cols-4 gap-60 rounded-none h-20 px-5"
              key="1"
            >
              <div className="flex items-center">
                {item.details.medicinename}
              </div>
              <div className="flex items-center">
                {item.details.hasOwnProperty("finalprice") ? (
                  <div>{item.details.finalprice}</div>
                ) : (
                  <div>{item.details.priceusd}</div>
                )}
              </div>
              <div className="text-green-500 flex gap-4 items-center">
                <div onClick={() => handleRemoveItem(item.id)}>-</div>
                <span>{item.quantity}</span>
                <div onClick={(e) => handleCartAddition(item.details, e)}>
                  +
                </div>
              </div>
              <div className="flex items-center">
                {item.details.hasOwnProperty("finalprice") ? (
                  <div>{item.quantity * item.details.finalprice}</div>
                ) : (
                  <div>{item.quantity * item.details.priceusd}</div>
                )}
              </div>
            </Card>
          ))}
        </div>
        <div className="border-2 p-4 border-black w-96 ml-auto flex flex-col mt-2 gap-1">
          <div className="font-medium text-lg">Cart Total</div>
          <div className="border-b flex">
            Subtotal:<div className="ml-auto">{cartValue}</div>
          </div>
          <div className="border-b flex">
            Shipping:<div className="ml-auto">{shippingfee}</div>
          </div>
          <div className="flex">
            Total :<div className="ml-auto">{cartValue + shippingfee}</div>
          </div>
          <Button>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};
export default page;
