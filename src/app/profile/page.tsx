"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

export default function ProfilePage({}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const getUserDetails = async() => {
    try {
      const response = await axios.get('/api/me');
      setData(response.data.data._id);
    } catch (error : any) {
     toast.error(error.response.data.error);      
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  const onLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/auth/logout");
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="grid place-content-center text-2xl min-h-screen">
      <h3>
        Profile{" "}
        <span className="font-bold text-orange-500">Page</span>
      </h3>
      {data ? <Link href={`/profile/${data}`}>Visit your profile</Link> : "Nothing"}
      <div className="flex items-center gap-x-4">

      <button
        disabled={isLoading}
        type="button"
        onClick={onLogout}
        className="mt-4 
        disabled:opacity-50
        disabled:cursor-not-allowed
        px-4 py-2 bg-orange-700 rounded-md font-medium cursor-pointer hover:opacity-50"
      >
        Logout
      </button>
      {/* <button
        disabled={isLoading}
        type="button"
        onClick={getUserDetails}
        className="mt-4 
      disabled:opacity-50
      disabled:cursor-not-allowed
      px-4 py-2 bg-blue-700 rounded-md font-medium cursor-pointer hover:opacity-50"
      >
        get user details
      </button> */}
        </div>
    </main>
  );
}
