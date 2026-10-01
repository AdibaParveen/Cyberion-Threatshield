import { useMemo, useState } from "react";
import {
  Search,
  ShieldAlert,
  Database,
  Crosshair,
  FileSearch,
  GitBranch,
  X,
  ArrowRight,
} from "lucide-react";

const hunts = [
  {
    id: "HUNT-001",
    title: "PowerShell Process Access",
    status: "EVIDENCE OBSERVED",
    statusType: "observed",
    hypothesis:
      "An attacker may use PowerShell to access another process as part of process injection or process manipulation activity.",
    dataSources: ["Windows Sysmon Event ID 10"],
    investigation: [
      "SourceImage containing PowerShell",
      "TargetImage of another process",
      "High GrantedAccess values",
      "Suspicious CallTrace values",
    ],
    evidence: [
      "Observed in: de_unmanagedpowershell_psinject_sysmon_7_8_10.evtx",
      "Observed source: powershell.exe",
      "Observed target: notepad.exe",
      "Observed GrantedAccess: 0x001f1fff",
    ],
    assessment:
      "The telemetry demonstrates a PowerShell-originated process-access event requiring investigation.",
    followUp: [
      "Process creation",
      "User context",
      "Network connections",
      "Subsequent process behavior",
    ],
  },
  {
    id: "HUNT-002",
    title: "Remote Execution Activity",
    status: "INVESTIGATION HYPOTHESIS",
    statusType: "hypothesis",
    hypothesis:
      "An attacker may use Windows remote administration mechanisms for lateral movement.",
    dataSources: [
      "Security Event Logs",
      "Sysmon",
      "Service installation telemetry",
      "RDP telemetry",
      "PowerShell remoting telemetry",
      "WMI telemetry",
    ],
    investigation: [
      "Remote authentication",
      "New service creation",
      "WMI activity",
      "PowerShell remoting",
      "Process creation",
      "RDP sessions",
    ],
    detectionCandidates: [
      "CDIHO-004",
      "CDIHO-005",
      "CDIHO-006",
      "CDIHO-007",
      "CDIHO-008",
      "CDIHO-017",
      "CDIHO-018",
    ],
    assessment:
      "Remote execution should be investigated as a sequence rather than relying on a single event.",
    followUp: [
      "Correlate authentication",
      "Correlate execution telemetry",
      "Correlate network telemetry",
      "Use host and time-window correlation",
    ],
  },
];

function HuntModal({ hunt, onClose }) {
  if (!hunt) return null;

  return (
    <div className="hunt-modal-backdrop" onClick={onClose}>
      <div
        className="hunt-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="hunt-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="hunt-modal-header">
          <div>
            <div className="hunt-modal-id">{hunt.id}</div>
            <h2>{hunt.title}</h2>
          </div>

          <span className={`hunt-status ${hunt.statusType}`}>
            {hunt.status}
          </span>
        </div>

        <div className="hunt-detail-block">
          <div className="hunt-detail-title">
            <Crosshair size={17} />
            Hypothesis
          </div>
          <p>{hunt.hypothesis}</p>
        </div>

        <div className="hunt-detail-grid">
          <div className="hunt-detail-block">
            <div className="hunt-detail-title">
              <Database size={17} />
              Data Sources
            </div>

            <div className="hunt-chip-list">
              {hunt.dataSources.map((item) => (
                <span className="hunt-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hunt-detail-block">
            <div className="hunt-detail-title">
              <FileSearch size={17} />
              Investigation Focus
            </div>

            <ul>
              {hunt.investigation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {hunt.evidence && (
          <div className="hunt-detail-block evidence-block">
            <div className="hunt-detail-title">
              <ShieldAlert size={17} />
              Observed Evidence
            </div>

            <ul>
              {hunt.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {hunt.detectionCandidates && (
          <div className="hunt-detail-block">
            <div className="hunt-detail-title">
              <GitBranch size={17} />
              Detection Candidates
            </div>

            <div className="hunt-chip-list">
              {hunt.detectionCandidates.map((item) => (
                <span className="hunt-chip detection" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="hunt-detail-block">
          <div className="hunt-detail-title">
            <ShieldAlert size={17} />
            Assessment
          </div>
          <p>{hunt.assessment}</p>
        </div>

        <div className="hunt-detail-block">
          <div className="hunt-detail-title">
            <ArrowRight size={17} />
            Follow-up
          </div>

          <ul>
            {hunt.followUp.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ThreatHunts() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedHunt, setSelectedHunt] = useState(null);

  const filteredHunts = useMemo(() => {
    return hunts.filter((hunt) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "OBSERVED" && hunt.statusType === "observed") ||
        (filter === "HYPOTHESIS" && hunt.statusType === "hypothesis");

      const searchText = [
        hunt.id,
        hunt.title,
        hunt.hypothesis,
        ...hunt.dataSources,
        ...(hunt.detectionCandidates || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(query.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [query, filter]);

  return (
    <>
      <main className="hunts-page">
        <section className="hunts-hero">
          <div className="section-eyebrow">
            <Crosshair size={15} />
            THREAT HUNTING
          </div>

          <h1>
            Structured Threat
            <span> Hunts</span>
          </h1>

          <p>
            Evidence-driven hunting hypotheses designed to investigate
            suspicious activity across Windows security telemetry.
          </p>
        </section>

        <section className="hunt-stats">
          <div className="hunt-stat-card">
            <span>Total Hunts</span>
            <strong>{hunts.length}</strong>
          </div>

          <div className="hunt-stat-card">
            <span>Evidence Observed</span>
            <strong>
              {hunts.filter((h) => h.statusType === "observed").length}
            </strong>
          </div>

          <div className="hunt-stat-card">
            <span>Hypotheses</span>
            <strong>
              {hunts.filter((h) => h.statusType === "hypothesis").length}
            </strong>
          </div>

          <div className="hunt-stat-card">
            <span>Detection Candidates</span>
            <strong>7</strong>
          </div>
        </section>

        <section className="hunt-toolbar">
          <div className="hunt-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search hunts, telemetry, detections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="hunt-filters">
            {["ALL", "OBSERVED", "HYPOTHESIS"].map((item) => (
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

        <section className="hunts-list">
          {filteredHunts.map((hunt) => (
            <article className="hunt-card" key={hunt.id}>
              <div className="hunt-card-top">
                <div>
                  <div className="hunt-id">{hunt.id}</div>
                  <h2>{hunt.title}</h2>
                </div>

                <span className={`hunt-status ${hunt.statusType}`}>
                  {hunt.status}
                </span>
              </div>

              <p className="hunt-hypothesis">
                {hunt.hypothesis}
              </p>

              <div className="hunt-card-section">
                <div className="hunt-section-label">
                  <Database size={15} />
                  DATA SOURCES
                </div>

                <div className="hunt-chip-list">
                  {hunt.dataSources.map((source) => (
                    <span className="hunt-chip" key={source}>
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hunt-card-bottom">
                <div>
                  <span className="hunt-section-label">
                    <FileSearch size={15} />
                    INVESTIGATION
                  </span>

                  <span className="hunt-count">
                    {hunt.investigation.length} focus areas
                  </span>
                </div>

                <button
                  className="hunt-view-button"
                  onClick={() => setSelectedHunt(hunt)}
                >
                  View Hunt
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}

          {filteredHunts.length === 0 && (
            <div className="hunt-empty">
              <Search size={30} />
              <h3>No hunts found</h3>
              <p>Try another search or filter.</p>
            </div>
          )}
        </section>
      </main>

      <HuntModal
        hunt={selectedHunt}
        onClose={() => setSelectedHunt(null)}
      />
    </>
  );
}
