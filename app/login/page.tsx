"use client"

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter()
  const supabase = createClient();


  const signIn = async () => {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        scopes: 'https://www.googleapis.com/auth/calendar',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) console.error('Error signing in:', error.message);
  };


  return (
    <form className="flex flex-col gap-4 items-center justify-center w-full h-screen">
      <h1>Sign In To Get Started</h1>
      <Button variant={"outline"} onClick={() => signIn()}>
        Sign In with Google
      </Button>
    </form>
  );
}
