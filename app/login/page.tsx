"use client"

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ChevronLeftIcon } from "lucide-react";

export default function Login() {
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
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <section className="flex flex-col justify-center items-center gap-2 md:items-start h-full px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold mt-auto">Welcome, Anon!</h1>
        <p className="text-sm md:text-base opacity-60">
          Sign In with Google to continue
        </p>
        <Button variant="outline" className="max-w-[250px] mt-4" onClick={() => signIn()}>
          <svg className="size-3 mr-2" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#ffffff"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#ffffff"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#ffffff"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#ffffff"></path></svg>
          Login with Google
        </Button>
        <div className="mt-auto text-xs opacity-50 text-center">
          By continuing, you agree to our{" "}
          <Link href="#" className="border-b border-white border-dashed pb-[2px]">
            Terms of Service
          </Link>
          {" "} and {" "}
          <Link href="#" className="border-b border-white border-dashed pb-[2px]">
            Privacy Policy
          </Link>
        </div>
        {/* back button */}
        <Button variant="outline" size={"sm"} className="absolute top-5 left-5 max-w-[250px] mt-8" asChild>
          <Link href="/" className="group">
            <ChevronLeftIcon className="mr-1 size-4 group-hover:-translate-x-1 duration-300 transition-all ease-in-out" />
            Back to Home
          </Link>
        </Button>
      </section>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/demo-screenshot.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.5] dark:grayscale border-l-2 border-white/35 bg-black border-dashed"
        />
        <AnimatedShinyText className="absolute top-5 right-5">
          hey, matty!
        </AnimatedShinyText>
      </div>
    </div>
  );
}
