import { useMemo, useState } from "react";
import {
  Search,
  ShieldAlert,
  Activity,
  Server,
  Lock,
  FileSearch,
  X,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const incidents = [
  {
    id: "INC-001",
    title: "PowerShell Process Access Investigation",
    status: "EVIDENCE OBSERVED",
    statusType: "observed",
    severity: "HIGH",
    summary:
      "Investigation of suspicious process access originating from PowerShell.",

    initialEvidence: [
      "Provider: Microsoft-Windows-Sysmon",
      "Event ID: 10",
      "Source: PowerShell",
      "Target: notepad.exe",
      "GrantedAccess: 0x001f1fff",
    ],

    assessment:
      "The event represents suspicious process-access behavior and is suitable for investigation as potential process injection.",

    investigation: [
      "Identify source process.",
      "Identify target process.",
      "Review GrantedAccess.",
      "Review CallTrace.",
      "Correlate surrounding process events.",
      "Review network activity.",
      "Determine whether the activity is authorized.",
    ],

    containment: [
      "Isolate affected host if malicious activity is confirmed.",
      "Preserve relevant event logs.",
      "Record process and user context.",
    ],

    recovery: [
      "Remove malicious tooling if confirmed.",
      "Validate endpoint integrity.",
      "Review persistence mechanisms.",
    ],

    lessons:
      "Process-access telemetry should be correlated with process creation and user/network context.",
  },

  {
    id: "INC-002",
    title: "Remote Execution Investigation",
    status: "INVESTIGATION WORKFLOW",
    statusType: "workflow",
    severity: "UNDETERMINED",
    summary:
      "Investigation workflow for suspected Windows lateral movement.",

    initialEvidence: [
      "Remote authentication",
      "Service creation",
      "WMI execution",
      "PowerShell remoting",
      "RDP activity",
      "PsExec-style execution",
    ],

    assessment:
      "The documented workflow focuses on correlating authentication, execution and remote-service telemetry to investigate suspected lateral movement.",

    investigation: [
      "Identify source and destination hosts.",
      "Review authentication events.",
      "Review service creation.",
      "Review process creation.",
      "Review PowerShell/WMI telemetry.",
      "Establish an event timeline.",
      "Identify affected accounts.",
    ],

    containment: [
      "Isolate affected endpoints where appropriate.",
      "Disable compromised credentials.",
      "Preserve logs and forensic evidence.",
    ],

    recovery: [
      "Remove unauthorized services/tools.",
      "Reset affected credentials.",
      "Verify endpoint configuration.",
    ],

    lessons:
      "Lateral movement investigations benefit from correlation across authentication, execution and remote-service telemetry.",
  },
];

function IncidentModal({ incident, onClose }) {
  if (!incident) return null;

  return (
    <div className="incident-modal-backdrop" onClick={onClose}>
      <div
        className="incident-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="incident-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="incident-modal-header">
          <div>
            <div className="incident-id">{incident.id}</div>
            <h2>{incident.title}</h2>
            <p>{incident.summary}</p>
          </div>

          <div className="incident-header-badges">
            <span
              className={`incident-status ${incident.statusType}`}
            >
              {incident.status}
            </span>

            <span className="incident-severity">
              {incident.severity}
            </span>
          </div>
        </div>

        <IncidentSection
          icon={<FileSearch size={17} />}
          title="Initial Evidence / Indicators"
        >
          <ul>
            {incident.initialEvidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </IncidentSection>

        <IncidentSection
          icon={<ShieldAlert size={17} />}
          title="Initial Assessment"
        >
          <p>{incident.assessment}</p>
        </IncidentSection>

        <IncidentSection
          icon={<Activity size={17} />}
          title="Investigation"
        >
          <ol>
            {incident.investigation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </IncidentSection>

        <div className="incident-detail-grid">
          <IncidentSection
            icon={<Lock size={17} />}
            title="Containment"
          >
            <ul>
              {incident.containment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </IncidentSection>

          <IncidentSection
            icon={<Server size={17} />}
            title="Recovery"
          >
            <ul>
              {incident.recovery.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </IncidentSection>
        </div>

        <IncidentSection
          icon={<CheckCircle2 size={17} />}
          title="Lessons Learned"
        >
          <p>{incident.lessons}</p>
        </IncidentSection>
      </div>
    </div>
  );
}

function IncidentSection({ icon, title, children }) {
  return (
    <section className="incident-detail-section">
      <div className="incident-detail-title">
        {icon}
        {title}
      </div>

      <div className="incident-detail-content">
        {children}
      </div>
    </section>
  );
}

export default function Incidents() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedIncident, setSelectedIncident] = useState(null);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "OBSERVED" &&
          incident.statusType === "observed") ||
        (filter === "WORKFLOW" &&
          incident.statusType === "workflow");

      const searchText = [
        incident.id,
        incident.title,
        incident.summary,
        incident.status,
        incident.severity,
        ...incident.initialEvidence,
        ...incident.investigation,
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
      <main className="incidents-page">
        <section className="incidents-hero">
          <div className="section-eyebrow">
            <ShieldAlert size={15} />
            INCIDENT RESPONSE
          </div>

          <h1>
            Incident
            <span> Investigations</span>
          </h1>

          <p>
            Structured incident investigations documenting evidence,
            investigation procedures, containment, recovery and lessons
            learned.
          </p>
        </section>

        <section className="incident-stats">
          <div className="incident-stat-card">
            <span>Total Cases</span>
            <strong>{incidents.length}</strong>
          </div>

          <div className="incident-stat-card">
            <span>Evidence Observed</span>
            <strong>
              {
                incidents.filter(
                  (i) => i.statusType === "observed"
                ).length
              }
            </strong>
          </div>

          <div className="incident-stat-card">
            <span>Investigation Workflows</span>
            <strong>
              {
                incidents.filter(
                  (i) => i.statusType === "workflow"
                ).length
              }
            </strong>
          </div>

          <div className="incident-stat-card">
            <span>Documented Areas</span>
            <strong>4</strong>
          </div>
        </section>

        <section className="incident-toolbar">
          <div className="incident-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search incidents, evidence, investigation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="incident-filters">
            {["ALL", "OBSERVED", "WORKFLOW"].map((item) => (
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

        <section className="incidents-list">
          {filteredIncidents.map((incident) => (
            <article
              className="incident-card"
              key={incident.id}
            >
              <div className="incident-card-top">
                <div>
                  <div className="incident-id">
                    {incident.id}
                  </div>

                  <h2>{incident.title}</h2>

                  <p>{incident.summary}</p>
                </div>

                <div className="incident-badge-column">
                  <span
                    className={`incident-status ${incident.statusType}`}
                  >
                    {incident.status}
                  </span>

                  <span className="incident-severity">
                    {incident.severity}
                  </span>
                </div>
              </div>

              <div className="incident-evidence-preview">
                <div className="incident-section-label">
                  <FileSearch size={15} />
                  {incident.id === "INC-001"
                    ? "INITIAL EVIDENCE"
                    : "INITIAL INDICATORS"}
                </div>

                <div className="incident-evidence-grid">
                  {incident.initialEvidence
                    .slice(0, 5)
                    .map((item) => (
                      <div
                        className="incident-evidence-item"
                        key={item}
                      >
                        <span />
                        {item}
                      </div>
                    ))}
                </div>
              </div>

              <div className="incident-card-bottom">
                <div className="incident-method">
                  <Activity size={15} />
                  {incident.investigation.length} investigation steps
                </div>

                <button
                  className="incident-view-button"
                  onClick={() =>
                    setSelectedIncident(incident)
                  }
                >
                  Open Investigation
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}

          {filteredIncidents.length === 0 && (
            <div className="incident-empty">
              <AlertTriangle size={30} />
              <h3>No incidents found</h3>
              <p>Try another search or filter.</p>
            </div>
          )}
        </section>
      </main>

      <IncidentModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </>
  );
}
