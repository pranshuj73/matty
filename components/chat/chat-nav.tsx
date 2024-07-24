"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { LogOutIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/lib/hooks/use-media-query";


export default function ChatNav({credits} : {credits: number}) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

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
      <nav className="fixed right-5 top-5 border-2 border-white/10 rounded-sm h-10 w-10 flex items-center justify-center">
        <UserIcon size={24} />
      </nav>
    )
  };
  
  if (isDesktop) {
    return (
      <nav className="fixed right-5 top-5 flex gap-2 mb-4 items-center justify-end z-10">
        <Button className="hidden md:inline-flex" variant={"outline"}>
          <PlusIcon className="mr-2" size={18} />
          New Chat
        </Button>
  
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-sm">
            <Avatar className="rounded-sm">
              <AvatarImage src={user.user_metadata.picture} />
              <AvatarFallback>{user.user_metadata.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="md:hidden">New Chat</DropdownMenuItem>
            <DropdownMenuSeparator className="md:hidden" />
            <DropdownMenuLabel>Credits: {credits}</DropdownMenuLabel>
            <DropdownMenuItem disabled>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/privacy")}>Privacy Policy</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/terms")}>Terms & Conditions</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    )
  }

  return (
    <nav className="fixed right-5 top-5 flex gap-2 mb-4 items-center justify-end z-10">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <Avatar className="rounded-sm">
            <AvatarImage src={user.user_metadata.picture} />
            <AvatarFallback>{user.user_metadata.name}</AvatarFallback>
          </Avatar>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Credits: {credits}</DrawerTitle>
            <DrawerDescription className="mb-2">
              You currently have {credits} credits remaining. Please <Link className="border-b border-dashed border-muted-foreground" href={"mailto:hello@pranshujha.com"}>email me</Link> for more credits.
            </DrawerDescription>
            
          </DrawerHeader>
          <DrawerFooter className="pt-2 sm:flex-row">
            <Button className="w-full sm:w-1/2" variant={"outline"}>
              <PlusIcon className="mr-2" size={18} />
              New Chat
            </Button>
            <Button className="w-full sm:w-1/2" variant={"destructive"}>
              <LogOutIcon className="mr-2" size={18} />
              Log Out
            </Button>

            <p className="text-xs mt-2 opacity-50 text-center">
              <Link href={"/privacy"}>Privacy Policy</Link>
              {" "} & {" "}
              <Link href={"/terms"}>Terms & Conditions</Link>
            </p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}