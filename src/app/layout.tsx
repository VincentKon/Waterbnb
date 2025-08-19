import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import { RegisterModal } from "./components/Modal/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LogInModal from "./components/Modal/LogInModal";
import getCurrentUser from "./actions/getCurrentUser";
import { RentModal } from "./components/Modal/RentModal";
import SearchModal from "./components/Modal/SearchModal";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waterbnb",
  description:
    "Online marketplace that connects hosts with travelers look ing for unique stays and experiences.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <ClientOnly>
          <ToasterProvider></ToasterProvider>
          <RentModal></RentModal>
          <RegisterModal></RegisterModal>
          <LogInModal></LogInModal>
          <SearchModal></SearchModal>
          <Navbar currentUser={currentUser}></Navbar>
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
