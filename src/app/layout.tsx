import type { Metadata } from "next";
import "@/app/index.css";

export const metadata: Metadata = {
  title: "Sofascore",
  description: "Sofascore academy project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
