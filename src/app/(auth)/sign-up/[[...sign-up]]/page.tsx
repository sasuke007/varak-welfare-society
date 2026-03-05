import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-varak-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-varak-primary">
            Join the Fight Against Cancer
          </h1>
          <p className="text-muted-foreground mt-2">
            Create an account to start a fundraiser or donate
          </p>
        </div>
        <SignUp
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
