# CLAUDE.md — Yacht Assist Montenegro (working title)

> This file is project memory for Claude Code. It captures the vision, the phased
> plan, the locked technical decisions, and — most importantly — the scope of the
> current phase (v0). Read it fully before making changes. When a decision here
> conflicts with an instinct to "build it properly for scale," follow this file:
> discipline and small scope are deliberate.

---

## 1. What we're building

A two-sided marketplace website for the **yachting scene in Montenegro**. It serves
two audiences ("points of view"):

- **Yachters** (captains, owners, crew, charter guests) — the demand side. The site
  is **free** for them. It exists to be the single most useful place to plan and run
  a yacht visit to Montenegro.
- **Service providers** (agents, provisioning, maintenance, transfers, chefs,
  chandlery, berths, etc.) — the supply side. They pay a **subscription** to be
  listed, after **manual verification** by the site admin.

The site has **three parts**:

1. **Info hub** — procedures, Montenegrin yacht laws, and a **weekly-updated fuel
   price**. This is the demand magnet and the SEO engine. Open to everyone.
2. **Services directory** — verified providers, browsable by category and location.
3. **Forum** — community Q&A. Gated behind a free account.

**Monetization (later phases):** providers create an account → submit for
verification → once approved, they pay for a **fixed-duration package (3 / 6 / 9 /
12 months)** to become visible → when it expires they simply disappear from the
directory but keep their account and can re-pay. Paid **promotion/boost** bumps them
to the top of their category. IMPORTANT: these are **one-time, fixed-duration
purchases, not recurring subscriptions** — no dunning, no auto-renew, no failed-
payment retries needed. A provider is *visible* if a simple derived rule holds (see
§6).

---

## 2. The crown jewel (do this really well)

The single highest-value page is a **"How to bring your yacht to Montenegro"**
guide — checklist format, always current: vignette/navigation permit, clearance &
customs, duty-free fuel, insurance minimums, speed limits in Boka Bay, etc. Our real
launch-day competitor is "a captain Googling and finding scattered Google Maps pins."
Being the best single answer to that question is what makes the site stick. This is
pure content — no auth, no payments — and it should be the centerpiece of v0.

---

## 3. Phased plan

Each phase is independently useful and de-risks the next. Do **not** pull later-phase
work forward.

- **Phase 0 — Spec & scaffold.** Empty deployed shell + this file. (Mostly done once
  the repo is live on Vercel.)
- **Phase 1 (v0) — Info hub only.** No auth, no payments, no directory. Content pages
  + admin-entered weekly fuel price + email newsletter capture. **← WE ARE HERE.**
- **Phase 2 — Accounts + provider onboarding + admin verification queue + public
  directory** driven by the visibility rule.
- **Phase 3 — Payments** (packages) + **promotion/boost**.
- **Phase 4 — Reviews** (gated behind a free yachter account, moderated).
- **Phase 5 — Forum** (built last; only *opened* once it can be seeded with real
  content, or it reads as a dead site).

**Target:** full app by ~March next year. This is a solo, part-time side project;
the phasing is what makes that timeline realistic. Staying disciplined about scope is
a hard requirement, not a preference.

---

## 4. Locked technical stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSR is required for SEO. |
| Styling | **Tailwind CSS** | |
| DB | **PostgreSQL** | Managed: **Neon** or **Supabase** (free tier for v0). |
| ORM | **Prisma** | |
| i18n | **next-intl** | Structure in from **day one**; only English filled at first. |
| Auth | **Auth.js (NextAuth)** or Clerk | **Deferred to Phase 2.** v0 has no auth. |
| Hosting | **Vercel** | Push-to-deploy from GitHub. Free (Hobby) for v0. |
| Email capture | TBD (e.g. Resend/Brevo/Listmonk) | Just needs to store an email + send confirm. |
| Analytics | Privacy-friendly (Plausible/Umami) | GDPR-friendly; optional in v0. |

**Deployment workflow:** code lives on GitHub; Vercel auto-builds and deploys on every
`git push`. Every push also gets a **preview URL** (good for showing the partner a
change before it goes live). HTTPS and the `*.vercel.app` URL are automatic. A custom
domain gets added later (not yet chosen — see §8).

---

## 5. v0 scope — build exactly this

**Pages (all public, no login):**
- Home / landing (what the site is; links into the hub; newsletter signup).
- **"Bring your yacht to Montenegro"** checklist guide (the crown jewel — §2).
- **Procedures** (clearance, customs, immigration).
- **Laws / regulations** (vignette, insurance, speed limits, VAT/fuel rules).
- **Fuel price** page: shows the current weekly price + a **"last updated"** timestamp,
  and clearly distinguishes **retail** fuel from **duty-free yacht** fuel.
- **About** + **Contact**.
- Newsletter signup (email only; optional fields can come later).

**Admin (minimal, no fancy panel yet):**
- A simple protected form to **enter/update the weekly fuel price** (with the
  timestamp) and to **edit article content**. For v0 this can be as simple as a
  password-protected route or editing content in the repo/DB — keep it lightweight.
  The partner will use this weekly, so it must be *fast* and obvious.

**Cross-cutting v0 requirements:**
- **SEO first:** server-rendered pages, clean URLs, proper `<title>`/meta per page,
  Open Graph tags, `sitemap.xml`, `robots.txt`, sensible headings.
- **i18n scaffolding present** via next-intl (locale routing, message files) even
  though only `en` is populated. Do **not** hardcode user-facing strings — route
  them through the i18n layer so adding languages later is config, not a rewrite.
- Fast, mobile-friendly, accessible. Captains will hit this on phones on a dock.

**Explicitly OUT of scope for v0** (do not build yet): auth/accounts, provider
profiles, the directory, payments, reviews, forum, maps, a fuel-price scraper
(admin types it in manually for now).

---

## 6. Design notes for LATER phases (context, not v0 work)

Keep these in mind so v0 doesn't paint us into a corner, but **do not implement now**.

- **Provider visibility is derived, not a manual flag.** A provider listing is public
  iff: `status == APPROVED` **AND** there is an active paid period **AND**
  `now < paid_until`. A daily job hides expired listings. Model it this way from the
  start of Phase 2.
- **Rough domain model (Phase 2+):** `User` (role: yachter | provider | admin),
  `ProviderProfile` (business info, category, location, status:
  draft → pending → approved → rejected), `SubscriptionPeriod` (start, end, package,
  payment ref), `Promotion` (boost with its own expiry, affects sort), `Review`
  (yachter → provider, moderated), `Category`, `Article` (info hub), forum entities.
- **Payments (Phase 3):** Montenegro-based businesses can't use Stripe natively.
  Plan for a **Merchant-of-Record** (Paddle / Lemon Squeezy) or a local bank gateway.
  Also keep a manual **"mark as paid"** admin action for bank-transfer/invoice
  providers (common locally).
- **Yachter access tiers (Phase 2+):** anonymous users get the whole info hub and the
  directory (browse + provider contact details). Only **reviews** and the **forum**
  require a free account. Add small carrots for registering (favorites list,
  newsletter). Capture **email only** at signup; ask country/boat type/role as
  **optional** fields contextually afterward.
- **Verification** is manual, done by the (business-side) partner. When we build it,
  the admin verification screen must be **one screen**: business info + submitted
  docs + approve/reject-with-reason + auto-email to the provider. Keep an audit trail
  (who approved whom, when, why).
- Providers can likely belong to **multiple categories/locations** — decide when we
  spec Phase 2.

---

## 7. Principles / house style

- **Boring monolith on purpose.** One Next.js app, one Postgres DB. No microservices,
  no separate frontend/backend, no premature "scale" architecture. Expected scale:
  hundreds of providers, low-thousands of monthly visitors. Postgres carries this for
  years.
- **Ship small, ship live.** Prefer a working, deployed thing over a perfect one.
  Deployment is background noise (every push), not a scary final event.
- **Don't over-build.** The hard parts of this project are *workflows and content
  discipline*, not algorithms. When in doubt, do the simpler thing.
- **Content must stay current.** The fuel price and laws are trust-critical — a stale
  fuel number is worse than none. Make updating them trivial.
- **English first, but never English-only in the code.** All user-facing text goes
  through i18n from the first commit.

---

## 8. Open decisions / blockers (not blocking v0 build)

- **Name & domain:** not chosen yet (partner to decide). NOTE: "Yacht Assist" is
  already used by Porto Montenegro's in-house team — check for trademark/brand
  confusion before committing. Until decided, use the free `*.vercel.app` URL.
- **Package prices** (3/6/9/12 months) and **what a "boost" buys** — TBD (Phase 3).
- **Service categories** list — to be drafted/agreed before Phase 2.
- **Email/newsletter tool** and **analytics tool** — pick during v0.

---

## 9. Team & context

- **One developer** (solo, part-time side project), comfortable across languages/stacks.
- **Business partner** is non-technical: will be the **admin** (verification, content,
  weekly fuel updates). Design admin-facing things for *his* speed and clarity.
- Montenegro company (D.O.O.) **not yet registered** — fine; revisit payments/legal
  when it exists.

---

## 10. First tasks for Claude Code (v0)

1. Scaffold a Next.js (App Router) + TypeScript + Tailwind project.
2. Wire up **next-intl** with `en` locale and locale-based routing; no hardcoded
   strings.
3. Set up **Prisma** with a Postgres connection (Neon/Supabase) — minimal schema for
   v0: `Article`/content + `FuelPrice` (value(s) + updatedAt) + `NewsletterSignup`
   (email + createdAt + optional fields).
4. Build the v0 pages in §5, with the **"Bring your yacht to Montenegro"** guide as
   the centerpiece.
5. Add SEO essentials: per-page metadata/OG, `sitemap.xml`, `robots.txt`.
6. Add a minimal protected admin path to update the weekly fuel price + timestamp.
7. Add newsletter email capture.
8. Ensure it builds and deploys cleanly on Vercel from `git push`.

Keep everything else (auth, directory, payments, reviews, forum) for later phases.
