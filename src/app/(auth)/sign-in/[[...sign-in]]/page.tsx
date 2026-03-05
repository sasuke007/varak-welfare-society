import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-varak-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-varak-primary">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to continue supporting cancer patients
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg rounded-2xl border border-border/50",
              headerTitle: "font-heading",
              formButtonPrimary:
                "bg-varak-primary hover:bg-varak-primary-dark rounded-xl",
            },
          }}
        />
      </div>
    </div>
  );
}
