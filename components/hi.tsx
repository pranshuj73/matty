"use client";

export default function Hi() {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }
  console.log(`  
    ██████╗     ██╗
    ██╔══██╗    ██║
    ██████╔╝    ██║
    ██╔═══╝██   ██║
    ██║    ╚█████╔╝
    ╚═╝     ╚════╝ 
    say hi -> pranshujha.com
    `);

  return null;
}