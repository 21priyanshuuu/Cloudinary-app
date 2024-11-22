"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn } = useAuth(); // Check authentication status
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/home"); // Redirect authenticated users to /home
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
