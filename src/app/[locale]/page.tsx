import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HUB_HOME } from "@/lib/hub";

// One screen, no scrolling: the photo covers the whole viewport, behind the
// see-through header (HeaderShell), and the text is centred in the space below
// it. The footer is hidden on this page (HideOnHome in the locale layout).
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
      {/* Background photo (Bay of Kotor, Perast islands), fixed to the full
          viewport so it also runs behind the header. Decorative: no alt. */}
      <div className="fixed inset-0 bg-navy-900">
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        {/* Darkens the left side, where the text sits, and the top, where the
            transparent header sits, for contrast. */}
        <div className="absolute inset-0 bg-linear-to-r from-navy-900/90 via-navy-900/60 to-navy-900/10" />
        <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-navy-900/80 via-navy-900/35 to-transparent" />
      </div>
      <section className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-8 sm:px-8 sm:py-12 lg:px-10">
          <h1 className="max-w-4xl text-[2.6rem] leading-[1.05] font-normal tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            {t("heroSubtitle")}
          </p>
          <Link
            href={HUB_HOME}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-cyan-400"
          >
            {t("heroCta")}
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
