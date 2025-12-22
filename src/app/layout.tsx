import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ConditionalFooter } from "@/components/Footer/ConditionalFooter";
import { ConditionalNavbar } from "@/components/Navbar/ConditionalNavbar";
import { Providers } from "./providers";
import ChatBox from "@/components/ChatBot/ChatBox";

export const metadata: Metadata = {
  title: "Eduguin",
  description: "Eduguin - Your Educational Companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` min-h-screen flex flex-col `}>
        <Providers>
          <ConditionalNavbar />
          <AppRouterCacheProvider options={{ key: "mui", prepend: true }}>
            <main className="flex-1 ">{children}</main>
            <ChatBox />
          </AppRouterCacheProvider>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
