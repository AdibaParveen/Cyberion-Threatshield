import { useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  Globe,
  Server,
  Hash,
  FileSearch,
  X,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const iocTypes = [
  {
    id: "IP",
    title: "IP Addresses",
    icon: Server,
    description:
      "Track source IP, destination IP, remote service IP and C2 candidate IP.",
    examples: [
      "Source IP",
      "Destination IP",
      "Remote service IP",
      "C2 candidate IP",
    ],
  },
  {
    id: "DOMAIN",
    title: "Domains",
    icon: Globe,
    description:
      "Track suspicious or newly observed domains associated with investigated activity.",
    examples: [
      "Suspicious domains",
      "Newly observed domains",
      "Domains associated with investigated activity",
    ],
  },
  {
    id: "HASH",
    title: "Hashes",
    icon: Hash,
    description:
      "Track file hashes, malware hashes and suspicious executable hashes.",
    examples: [
      "File hashes",
      "Malware hashes",
      "Suspicious executable hashes",
    ],
  },
];

const handlingFields = [
  "Value",
  "Type",
  "Source",
  "First observed time",
  "Related case",
  "Confidence",
  "Investigation status",
];

function IocModal({ type, onClose }) {
  if (!type) return null;

  const Icon = type.icon;

  return (
    <div className="ioc-modal-backdrop" onClick={onClose}>
      <div className="ioc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ioc-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="ioc-modal-header">
          <div className="ioc-modal-icon">
            <Icon size={24} />
          </div>

          <div>
            <div className="ioc-label">IOC TYPE</div>
            <h2>{type.title}</h2>
          </div>
        </div>

        <section className="ioc-detail-section">
          <div className="ioc-detail-title">
            <FileSearch size={17} />
            Research Scope
          </div>

          <p>{type.description}</p>
        </section>

        <section className="ioc-detail-section">
          <div className="ioc-detail-title">
            <ShieldCheck size={17} />
            Track These Indicators
          </div>

          <ul>
            {type.examples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="ioc-detail-section">
          <div className="ioc-detail-title">
            <AlertTriangle size={17} />
            Handling Principle
          </div>

          <p>
            An IOC should not be treated as malicious solely because it
            appears in a dataset. Context and supporting telemetry are
            required.
          </p>
        </section>
      </div>
    </div>
  );
}

export default function IOC() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedType, setSelectedType] = useState(null);

  const filteredTypes = useMemo(() => {
    return iocTypes.filter((type) => {
      const matchesFilter =
        filter === "ALL" || type.id === filter;

      const searchText = [
        type.id,
        type.title,
        type.description,
        ...type.examples,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesFilter &&
        searchText.includes(query.toLowerCase())
      );
    });
  }, [query, filter]);

  return (
    <>
      <main className="ioc-page">
        <section className="ioc-hero">
          <div className="section-eyebrow">
            <ShieldCheck size={15} />
            THREAT INTELLIGENCE
          </div>

          <h1>
            IOC
            <span> Research</span>
          </h1>

          <p>
            A structured approach to researching, recording and
            correlating indicators of compromise with supporting
            security telemetry.
          </p>
        </section>

        <section className="ioc-stats">
          <div className="ioc-stat-card">
            <span>IOC Types</span>
            <strong>3</strong>
          </div>

          <div className="ioc-stat-card">
            <span>Handling Fields</span>
            <strong>{handlingFields.length}</strong>
          </div>

          <div className="ioc-stat-card">
            <span>Research Areas</span>
            <strong>10</strong>
          </div>

          <div className="ioc-stat-card">
            <span>Raw IOC Values</span>
            <strong>0</strong>
          </div>
        </section>

        <div className="ioc-notice">
          <AlertTriangle size={18} />

          <div>
            <strong>Context-first IOC handling</strong>
            <p>
              The current research document defines IOC handling
              standards but does not contain specific IP addresses,
              domains or hashes. No indicator values are fabricated
              for this dashboard.
            </p>
          </div>
        </div>

        <section className="ioc-toolbar">
          <div className="ioc-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search IOC types or research areas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="ioc-filters">
            {["ALL", "IP", "DOMAIN", "HASH"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="ioc-grid">
          {filteredTypes.map((type) => {
            const Icon = type.icon;

            return (
              <article className="ioc-card" key={type.id}>
                <div className="ioc-card-header">
                  <div className="ioc-icon">
                    <Icon size={23} />
                  </div>

                  <div>
                    <div className="ioc-label">{type.id}</div>
                    <h2>{type.title}</h2>
                  </div>
                </div>

                <p className="ioc-card-description">
                  {type.description}
                </p>

                <div className="ioc-research">
                  <div className="ioc-section-label">
                    <FileSearch size={14} />
                    RESEARCH AREAS
                  </div>

                  <div className="ioc-research-list">
                    {type.examples.map((item) => (
                      <div key={item}>
                        <span />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="ioc-view-button"
                  onClick={() => setSelectedType(type)}
                >
                  View Handling Standard
                  <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </section>

        <section className="ioc-standard">
          <div className="ioc-standard-header">
            <div className="ioc-icon">
              <ShieldCheck size={22} />
            </div>

            <div>
              <div className="ioc-label">HANDLING STANDARD</div>
              <h2>Required IOC Record</h2>
            </div>
          </div>

          <p>
            Every IOC should record the following fields for
            consistent investigation and correlation.
          </p>

          <div className="ioc-fields">
            {handlingFields.map((field, index) => (
              <div key={field}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {field}
              </div>
            ))}
          </div>
        </section>
      </main>

      <IocModal
        type={selectedType}
        onClose={() => setSelectedType(null)}
      />
    </>
  );
}
