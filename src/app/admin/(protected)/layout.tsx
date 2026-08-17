import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { logoutAction } from "../actions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <header className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
        <Link href="/admin" className="font-semibold">
          Yacht Assist Admin
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          >
            Sign out
          </button>
        </form>
      </header>
      <main className="mt-8">{children}</main>
    </div>
  );
}
