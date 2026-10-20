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
    <div className="mx-auto max-w-2xl px-4 py-10">
      <header className="flex items-center justify-between border-b border-border-soft pb-5">
        <Link href="/admin" className="text-lg font-semibold text-ink">
          Yacht Assist <span className="text-cyan-600">Admin</span>
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-ink-soft hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </header>
      <main className="mt-8">{children}</main>
    </div>
  );
}
