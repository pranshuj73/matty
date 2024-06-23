import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";

export default function Login() {
  const signIn = async () => {
    "use server"

    const supabase = createClient();
    const origin = headers().get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        scopes: 'https://www.googleapis.com/auth/calendar',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }).then((res) => {
      // open in new tab
      redirect(res.data.url!);
    }
    );
    
    if (error) {
      console.log(error);
      return redirect("/login");
    }
  };


  return (
    <form className="flex items-center justify-center w-full h-screen">
      <Button variant={"outline"} formAction={signIn}>
        Sign In with Google
      </Button>
    </form>
  );
}
