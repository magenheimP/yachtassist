import { PORT_AGENTS, type PortAgent } from "@/lib/portAgents";
import { GlobeIcon, MailIcon, PhoneIcon } from "@/components/icons";

const contactLink =
  "inline-flex min-w-0 items-start gap-2 text-cyan-700 wrap-anywhere hover:text-cyan-600";

// Every port agent as a card with its contact details (same cards as on the
// Contractors page).
export function PortAgentList() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {PORT_AGENTS.map((agent) => (
        <PortAgentCard key={agent.key} agent={agent} />
      ))}
    </ul>
  );
}

function PortAgentCard({ agent }: { agent: PortAgent }) {
  const { name, phones, emails, website } = agent;

  return (
    <li className="rounded-2xl border border-border-soft bg-white p-5">
      <h2 className="font-semibold text-ink">{name}</h2>

      <ul className="mt-4 space-y-1.5 border-t border-border-soft pt-4 text-sm">
        {phones?.map((phone) => (
          <li key={phone}>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className={contactLink}>
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {phone}
            </a>
          </li>
        ))}
        {emails?.map((email) => (
          <li key={email}>
            <a href={`mailto:${email}`} className={contactLink}>
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {email}
            </a>
          </li>
        ))}
        {website && (
          <li>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={contactLink}
            >
              <GlobeIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {new URL(website).hostname.replace(/^www\./, "")}
            </a>
          </li>
        )}
      </ul>
    </li>
  );
}
