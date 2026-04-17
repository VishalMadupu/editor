"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const RichTextEditor = dynamic(
  () => import("@vishal4500/rich-text-editor").then(mod => mod.RichTextEditor),
  { ssr: false }
);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <RichTextEditor />;
}