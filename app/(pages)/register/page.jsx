"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch("api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status != 400) {
      alert("Registered successfully");
      reset();
      router.push("/login");
    } else {
      alert("Error occured");
      const b = await res.json();
      console.log(b);
    }
  };
  return (
    <div className=" h-screen flex items-center justify-center bg-white text-black">
      <div className="flex items-center justify-center bg-transparent h-[630px] w-[1150px] gap-6">
        <div className="py-10 px-16 flex flex-col gap-3 rounded-sm">
          <div className=" text-4xl text-center mb-5">Sign Up</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              {...register("name", {
                required: { value: true, message: "This Field is mandatory" },
              })}
              className="h-12 placeholder-black border-b-2 border-b-slate-200 outline-none bg-transparent focus:border-b-black focus:border-b-2 focus:placeholder:text-sm focus:placeholder:-translate-y-4 focus:placeholder:transition-all focus:placeholder:duration-400"
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
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
              value="Create Account"
              className="h-9 my-4 rounded-full bg-blue-500 m-auto py-3 px-6 cursor-pointer text-white"
            />
          </form>
          <div className="m-auto">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-700 underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
