import { ThemeProvider } from "next-themes";
import Header from "~/components/layouts/header";
import { Libre_Baskerville } from "next/font/google";
import "~/styles/index.scss";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-baskerville",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-third dark:bg-primary flex flex-col items-stretch max-w-[1920px] px-10 mx-auto max-md:px-5 custom-scroll">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="mx-auto flex-1 flex items-stretch justify-stretch w-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
