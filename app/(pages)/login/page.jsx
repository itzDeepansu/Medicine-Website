"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const [wrongcred, setwrongcred] = useState("none")
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const onSubmit = async (data) => {
    let res = await signIn("credentials", { ...data, redirect: false });
    console.log(res.error);
    if (res.error) {
      setwrongcred(res.error)
    } 
  };
  return (
    <div className=" h-screen flex items-center justify-center bg-white text-black">
      <div className="flex items-center justify-center bg-transparent h-[630px] w-[1150px] gap-6">
        <div className="py-10 px-16 flex flex-col gap-3 rounded-sm">
      {wrongcred !== "none" && <div className="text-red-500 mx-auto">{wrongcred}</div>}
          <div className=" text-4xl text-center mb-5">Log In</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "This Field is Mandatory" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter valid email address",
                },
              })}
              className="h-12 placeholder-black border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm focus:placeholder:-translate-y-4 focus:placeholder:transition-all focus:placeholder:duration-400"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "This Field is Mandatory" },
              })}
              className="h-12 placeholder-black border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm focus:placeholder:-translate-y-4 focus:placeholder:transition-all focus:placeholder:duration-400"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
            <input
              type="submit"
              value="Log In"
              className="h-9 my-4 rounded-full bg-blue-500 m-auto py-3 px-6 cursor-pointer text-white"
            />
          </form>
          <div className="m-auto">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-700 underline">
              Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
