"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { UserIcon } from "lucide-react";
import Link from "next/link";


export default function ProfileMenu({credits} : {credits: number}) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!user) {
    return (
      <div className="border-2 border-white/10 rounded-sm h-10 w-10 flex items-center justify-center">
        <UserIcon size={24} />
      </div>
    )
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-sm">
        <Avatar className="rounded-sm">
          <AvatarImage src={user.user_metadata.picture} />
          <AvatarFallback>{user.user_metadata.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Credits: {credits}</DropdownMenuLabel>
        <DropdownMenuItem disabled>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/privacy")}>Privacy Policy</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/terms")}>Terms & Conditions</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}