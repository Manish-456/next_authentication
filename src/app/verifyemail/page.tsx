"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from 'next/link';

type Props = {
  searchParams: {
    token: string;
  };
};

export default function VerifyEmailPage({ searchParams }: Props) {
  const token = searchParams.token || "";
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/auth/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (token?.length > 0) verifyUserEmail();
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
        {
            verified && (
                <div>
                    <h3 className="text-2xl">Email verified</h3>
                    <Link href={'/login'} className="text-blue-500">
                        Login
                    </Link>
                </div>
            )
        }
        {
            error && (
                <div>
                    <h2 className="text-2xl text-black bg-red-500">Error</h2>
                </div>
            )
        }
    </div>
  );
}
