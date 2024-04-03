"use client";
import React, { useState } from "react";

const page = () => {
  const [question, setquestion] = useState("tell me the question");
  const [answer, setanswer] = useState("");
  const handlequestion = async () => {
    const res = await fetch("api/getaians", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question }),
    });
    const ans = await res.json();
    setanswer(ans.answer);
  };
  return (
    <div>
      <input
        type="text"
        value={question}
        onChange={(e) => setquestion(e.target.value)}
      />
      <button onClick={handlequestion}>Submit</button>
      {answer != "" ? (<div>{answer}</div>) : (<div>No Answer</div>)}
    </div>
  );
};

export default page;
