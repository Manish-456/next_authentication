"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "../../../type";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });


  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
   if(user.email.length === 0 || user.password.length  === 0 || user.username.length  === 0 ){
    setIsLoading(true)
   }else{
    setIsLoading(false)
   }
  }, [user, isLoading]);
  
  const onSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/auth/register`, user);
      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }finally {
      setIsLoading(false);
    }
  };

  


  return (
    <div className="flex max-w-sm mx-auto space-y-4 items-start justify-center flex-col min-h-screen p-2">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <hr className="w-full bg-gray-500" />
      <form className="flex flex-col w-full gap-y-4" onSubmit={onSignUp}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={onInputChange}
          required
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={onInputChange}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={onInputChange}
          required
        />
        <button
        disabled={isLoading}
          type="submit"
          className="bg-blue-500
            p-2 
            mt-4
            disabled:bg-gray-500
            font-bold
            text-medium
            disabled:cursor-not-allowed
            rounded-md
            inset-0"
        >
         Sign up
        </button>
      </form>
      <Link href={"/login"} className="focus:underline">
        Visit login page here
      </Link>
    </div>
  );
}
