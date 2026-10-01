import { useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  KeyRound,
  Network,
  Radio,
  ArrowRight,
  X,
  CircleAlert,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";

const playbooks = [
  {
    id: "PLAYBOOK-001",
    title: "Credential Compromise",
    type: "CREDENTIAL RESPONSE",
    icon: KeyRound,
    trigger:
      "Suspicious authentication or credential-access activity.",
    actions: [
      "Validate alert.",
      "Identify affected account.",
      "Identify source host.",
      "Review authentication history.",
      "Review privilege level.",
      "Disable/reset compromised credentials when confirmed.",
      "Review lateral movement.",
      "Document evidence.",
    ],
    evidence: [
      "Authentication events",
      "Account information",
      "Source/destination hosts",
      "Process telemetry",
    ],
  },
  {
    id: "PLAYBOOK-002",
    title: "Lateral Movement",
    type: "LATERAL MOVEMENT",
    icon: Network,
    trigger:
      "Remote execution, RDP, WMI, PowerShell remoting or service-based execution.",
    actions: [
      "Identify source and destination.",
      "Establish timeline.",
      "Review authentication.",
      "Review process creation.",
      "Review service creation.",
      "Isolate affected endpoints if confirmed malicious.",
      "Review additional hosts.",
      "Document affected accounts and systems.",
    ],
    closure:
      "Confirm that unauthorized remote execution has stopped and affected credentials/systems have been remediated.",
  },
  {
    id: "PLAYBOOK-003",
    title: "Suspicious C2 / Network Activity",
    type: "NETWORK RESPONSE",
    icon: Radio,
    trigger:
      "Suspicious network connection or BITS-related telemetry.",
    actions: [
      "Identify source process.",
      "Identify destination.",
      "Record timestamp.",
      "Review DNS/domain/IP context.",
      "Correlate with process creation.",
      "Search for repeated connections.",
      "Isolate endpoint if malicious C2 is confirmed.",
      "Preserve network and endpoint evidence.",
    ],
    closure:
      "Verify removal of unauthorized communication mechanisms and investigate related hosts.",
  },
];

function PlaybookModal({ playbook, onClose }) {
  if (!playbook) return null;

  const Icon = playbook.icon;

  return (
    <div className="playbook-modal-backdrop" onClick={onClose}>
      <div
        className="playbook-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="playbook-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="playbook-modal-header">
          <div className="playbook-modal-icon">
            <Icon size={24} />
          </div>

          <div>
            <div className="playbook-id">{playbook.id}</div>
            <h2>{playbook.title}</h2>
            <span className="playbook-type">{playbook.type}</span>
          </div>
        </div>

        <section className="playbook-detail-section">
          <div className="playbook-detail-title">
            <CircleAlert size={17} />
            Trigger
          </div>

          <p>{playbook.trigger}</p>
        </section>

        <section className="playbook-detail-section">
          <div className="playbook-detail-title">
            <ClipboardCheck size={17} />
            Response Actions
          </div>

          <ol className="playbook-action-list">
            {playbook.actions.map((action, index) => (
              <li key={action}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {action}
              </li>
            ))}
          </ol>
        </section>

        {playbook.evidence && (
          <section className="playbook-detail-section">
            <div className="playbook-detail-title">
              <ShieldCheck size={17} />
              Evidence Required
            </div>

            <div className="playbook-evidence-list">
              {playbook.evidence.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={14} />
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        {playbook.closure && (
          <section className="playbook-detail-section closure-section">
            <div className="playbook-detail-title">
              <CheckCircle2 size={17} />
              Closure
            </div>

            <p>{playbook.closure}</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default function Playbooks() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);

  const filteredPlaybooks = useMemo(() => {
    return playbooks.filter((playbook) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "CREDENTIAL" &&
          playbook.id === "PLAYBOOK-001") ||
        (filter === "LATERAL" &&
          playbook.id === "PLAYBOOK-002") ||
        (filter === "NETWORK" &&
          playbook.id === "PLAYBOOK-003");

      const searchableText = [
        playbook.id,
        playbook.title,
        playbook.type,
        playbook.trigger,
        ...playbook.actions,
        ...(playbook.evidence || []),
        playbook.closure || "",
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesFilter &&
        searchableText.includes(query.toLowerCase())
      );
    });
  }, [query, filter]);

  return (
    <>
      <main className="playbooks-page">
        <section className="playbooks-hero">
          <div className="section-eyebrow">
            <ShieldCheck size={15} />
            INCIDENT RESPONSE
          </div>

          <h1>
            Response
            <span> Playbooks</span>
          </h1>

          <p>
            Structured response procedures for credential compromise,
            lateral movement and suspicious command-and-control activity.
          </p>
        </section>

        <section className="playbook-stats">
          <div className="playbook-stat-card">
            <span>Total Playbooks</span>
            <strong>3</strong>
          </div>

          <div className="playbook-stat-card">
            <span>Credential Response</span>
            <strong>1</strong>
          </div>

          <div className="playbook-stat-card">
            <span>Lateral Movement</span>
            <strong>1</strong>
          </div>

          <div className="playbook-stat-card">
            <span>Network Response</span>
            <strong>1</strong>
          </div>
        </section>

        <section className="playbook-toolbar">
          <div className="playbook-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search playbooks, actions, triggers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="playbook-filters">
            {[
              ["ALL", "ALL"],
              ["CREDENTIAL", "CREDENTIAL"],
              ["LATERAL", "LATERAL"],
              ["NETWORK", "NETWORK"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={filter === value ? "active" : ""}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="playbooks-list">
          {filteredPlaybooks.map((playbook) => {
            const Icon = playbook.icon;

            return (
              <article className="playbook-card" key={playbook.id}>
                <div className="playbook-card-header">
                  <div className="playbook-icon">
                    <Icon size={23} />
                  </div>

                  <div className="playbook-card-heading">
                    <div className="playbook-id">
                      {playbook.id}
                    </div>

                    <h2>{playbook.title}</h2>

                    <span className="playbook-type">
                      {playbook.type}
                    </span>
                  </div>
                </div>

                <div className="playbook-trigger">
                  <div className="playbook-section-label">
                    <CircleAlert size={14} />
                    TRIGGER
                  </div>

                  <p>{playbook.trigger}</p>
                </div>

                <div className="playbook-actions-preview">
                  <div className="playbook-section-label">
                    <ClipboardCheck size={14} />
                    RESPONSE ACTIONS
                  </div>

                  <div className="playbook-action-preview-list">
                    {playbook.actions.slice(0, 4).map((action, index) => (
                      <div key={action}>
                        <span>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {action}
                      </div>
                    ))}
                  </div>

                  {playbook.actions.length > 4 && (
                    <div className="playbook-more">
                      + {playbook.actions.length - 4} more actions
                    </div>
                  )}
                </div>

                <div className="playbook-card-footer">
                  <span>
                    {playbook.actions.length} documented actions
                  </span>

                  <button
                    onClick={() =>
                      setSelectedPlaybook(playbook)
                    }
                  >
                    Open Playbook
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            );
          })}

          {filteredPlaybooks.length === 0 && (
            <div className="playbook-empty">
              <Search size={30} />
              <h3>No playbooks found</h3>
              <p>Try another search or filter.</p>
            </div>
          )}
        </section>
      </main>

      <PlaybookModal
        playbook={selectedPlaybook}
        onClose={() => setSelectedPlaybook(null)}
      />
    </>
  );
}
