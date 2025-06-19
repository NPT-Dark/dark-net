import { ThemeProvider } from "next-themes";
import Header from "~/components/layouts/header";
import { Libre_Baskerville } from "next/font/google";
import "~/styles/index.scss";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={libreBaskerville.className}
      suppressHydrationWarning
    >
      <body className="bg-third dark:bg-primary flex flex-col items-stretch max-w-[1920px] px-10 mx-auto">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="mx-auto flex-1 flex items-stretch">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
