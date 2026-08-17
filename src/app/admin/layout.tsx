import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin | Yacht Assist Montenegro",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-neutral-50 dark:bg-neutral-950">
        {children}
      </body>
    </html>
  );
}
