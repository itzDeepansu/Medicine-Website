"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { nanoid } from "@reduxjs/toolkit";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const chatbot = () => {
  const [question, setquestion] = useState("Que-");
  const [conversation, setconversation] = useState([]);
  const handlequestion = async () => {
    setquestion("Que-");
    setconversation([...conversation, question]);
    const res = await fetch("api/getaians", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question }),
    });
    const ans = await res.json();
    setconversation([...conversation, question, ans.answer]);
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger className="bg-orange-500 rounded-full h-16 p-1">ChatBot</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Medico - AI ChatBot</SheetTitle>
            <div className="flex flex-col-reverse h-[88vh] gap-2">
              <div className="flex">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setquestion(e.target.value)}
                  className="mr-2 padding-x-2 h-12 placeholder-black border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm"
                />
                <Button onClick={handlequestion}>Send</Button>
              </div>
              <div className="flex flex-col h-full gap-2 overflow-y-scroll">
                {conversation.map((item) => (
                  <Card key={nanoid()}>
                    <CardHeader>
                      <CardTitle>{item}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default chatbot;
