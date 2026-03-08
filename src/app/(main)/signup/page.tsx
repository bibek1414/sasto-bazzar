import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Signup - Trimurti",
  description: "Create a Trimurti account.",
};

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading signup...
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
