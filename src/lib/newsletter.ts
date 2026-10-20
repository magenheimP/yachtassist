import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export async function subscribe(email: string) {
  // Idempotent: re-signing up with the same email is a success, not an error.
  await prisma.newsletterSignup.upsert({
    where: { email },
    create: { email },
    update: {},
  });
  await sendWelcomeEmail(email);
}

// No email service provider is chosen yet (CLAUDE.md §8). This is the single
// place to wire one up later (Resend/Brevo/Listmonk) without touching callers.
async function sendWelcomeEmail(email: string) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[newsletter] would send welcome email to ${email}`);
  }
}
