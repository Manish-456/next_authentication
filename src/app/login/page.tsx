"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

export default function LoginPage({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/auth/login`, user);
      toast.success(response.data.message);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length === 0 || user.password.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user, isLoading]);

  return (
    <div className="flex max-w-sm mx-auto space-y-4 items-start justify-center flex-col min-h-screen p-2">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Sign in to your account</h1>
        <p className="text-sm">Welcome back</p>
      </div>

      <hr className="w-full bg-gray-500" />
      <form className="flex flex-col w-full gap-y-4" onSubmit={onLogin}>
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
          Login
        </button>
      </form>
      <div className="flex items-center w-full justify-between p-2">
      <Link href={"/signup"} className="focus:underline">
        Visit Signup page here
      </Link>
      <Link href={"/verifyemailforpwd"} className="focus:underline">
        Forgot password?
      </Link>
      </div>
    </div>
  );
}
