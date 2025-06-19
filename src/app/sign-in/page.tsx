import type { Metadata } from "next";
import SignInForm from "~/components/contents/signIn";
export const metadata: Metadata = {
  title: "Dark Net – Log In",
  description:
    "Sign in to Dark Net, the next-gen social platform where AI curates your feed and boosts meaningful connections. Secure, smart, and designed for modern users who want more signal, less static.",
};
export default function Page() {
  return <SignInForm />;
}
