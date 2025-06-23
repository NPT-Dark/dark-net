import { Metadata } from "next";
import React from "react";
import SignUpForm from "~/components/contents/signUp";
export const metadata: Metadata = {
  title: "Dark Net – Sign Up",
  description:
    "Join Dark Net, the next-gen social platform where AI curates your feed and empowers meaningful connections. Create your account today and step into a smarter, more secure digital experience.",
};
export default function Page(): React.ReactNode {
  return <SignUpForm />;
}
