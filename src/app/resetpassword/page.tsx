"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  searchParams: {
    token: string;
  };
};

export default function ResetPasswordPage({searchParams}: Props) {
  const router = useRouter();
  const token = searchParams.token || ""
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [event.target.name] : event.target.value
    }))
  };
  const onSubmit = async(event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true)
      const response = await axios.post(`/api/auth/reset`, {
        ...credentials, 
        token
      });
      toast.success(response.data.message);
      router.push('/login')
    } catch (error : any) {
       toast.error(error.response.data.error);
    }finally{
      setIsLoading(false);
    }

  };
  return (
    <div className="flex max-w-sm mx-auto space-y-4 items-start justify-center flex-col min-h-screen p-2">
     {
      token.length > 0 ? (<>
       <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Enter your new password</h1>
        <p className="text-sm">Continue your journey.</p>
      </div>

      <hr className="w-full bg-gray-500" />
      <form className="flex flex-col w-full gap-y-4" onSubmit={onSubmit}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={onChangeHandler}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={onChangeHandler}
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
      </div>
      </>) : (
        <p>Cannot reset your password.</p>
      ) 
     }
    </div>
  );
}
