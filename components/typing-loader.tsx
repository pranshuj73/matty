import { useState, useEffect } from "react";

export default function TypingLoader() {
  const dots = ['.', '..', '...'];
  const [dot, setDot] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDot((dot + 1) % 3);
    }, 500);
    return () => clearInterval(interval);
  }, [dot]);
  return (
    <p>typing{dots[dot]}</p>
  );
}