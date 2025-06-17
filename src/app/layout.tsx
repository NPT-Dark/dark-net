import { ThemeProvider } from "next-themes";
import Header from "~/components/layouts/header";
import "~/styles/index.scss";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <body className="bg-third dark:bg-primary flex flex-col items-stretch">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="container mx-auto flex-1 flex items-stretch">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
