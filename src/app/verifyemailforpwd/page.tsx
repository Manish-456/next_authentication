"use client";

import React, { useState } from 'react'

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function VerifyEmailForPwdPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async(event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     try {
      setIsLoading(true);
     const response = await axios.post("/api/auth/verifyresetpwd", {email});
     toast.success(response.data.message);
     } catch (error : any) {
      toast.error(error.response.data.error)
     }finally{
      setIsLoading(false);
     }
     
    }
  return (


        <div className="flex max-w-sm mx-auto space-y-4 items-start justify-center flex-col min-h-screen p-2">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Enter your email</h1>
            <p className="text-sm">Continue to reset your password.</p>
          </div>
    
          <hr className="w-full bg-gray-500" />
          <form className="flex flex-col w-full gap-y-4" onSubmit={onSubmit}>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Continue &rarr;
            </button>
          </form>
          <div className="flex items-center w-full justify-between p-2">
          <Link href={"/login"} className="focus:underline">
            go back to login
          </Link>
          <Link href={"/verifyemailforpwd"} className="focus:underline">
            Forgot password?
          </Link>
          </div>
        </div>
      );
    }
  

