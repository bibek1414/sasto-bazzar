import SastoBazzarHome from "@/components/home/SastoBazzarHome";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Trimurti | Premium Electronics Store",
};

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SastoBazzarHome />
    </Suspense>
  );
}
