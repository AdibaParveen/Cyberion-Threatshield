import { useMemo, useState } from "react";
import {
  Shield,
  Search,
  Filter,
  ChevronRight,
  X,
  Terminal,
  Target,
  FileCheck2,
  AlertTriangle,
} from "lucide-react";

const detections = [
  {
    id: "CDIHO-001",
    title: "PowerShell Process Access",
    category: "Process Injection",
    severity: "HIGH",
    status: "CONFIRMED",
    telemetry: "Sysmon Event ID 10",
    technique: "T1055",
    description:
      "Detects suspicious process-access activity where PowerShell interacts with another process.",
    falsePositive:
      "Administrative tooling, debugging utilities and legitimate security software may generate similar process-access events.",
    evidence:
      "Validated against real EVTX telemetry containing PowerShell as SourceImage and notepad.exe as TargetImage.",
  },
  {
    id: "CDIHO-002",
    title: "Rundll32 Execution",
    category: "Signed Binary Proxy Execution",
    severity: "MEDIUM",
    status: "PENDING",
    telemetry: "Windows / Sysmon telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Detects rundll32-based execution activity for investigation of potentially suspicious signed-binary proxy execution.",
    falsePositive:
      "Legitimate Windows components and software installers may use rundll32.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-003",
    title: "Scheduled Task Creation",
    category: "Persistence",
    severity: "MEDIUM",
    status: "PENDING",
    telemetry: "Windows Security telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Identifies scheduled-task creation activity that may require investigation for persistence or execution.",
    falsePositive:
      "Software installation, system administration and legitimate scheduled maintenance.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-004",
    title: "Remote Service Creation",
    category: "Lateral Movement",
    severity: "HIGH",
    status: "PENDING",
    telemetry: "Windows Service telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Highlights remote service creation activity associated with potential lateral movement.",
    falsePositive:
      "Remote administration tools and legitimate enterprise software deployment.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-005",
    title: "PowerShell Remoting",
    category: "Lateral Movement",
    severity: "HIGH",
    status: "PENDING",
    telemetry: "PowerShell / Windows telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Detects PowerShell remoting activity that may indicate remote administration or lateral movement.",
    falsePositive:
      "Authorized PowerShell remoting by administrators and automation systems.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-006",
    title: "WMI Remote Execution",
    category: "Remote Execution",
    severity: "HIGH",
    status: "PENDING",
    telemetry: "WMI / Sysmon telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Identifies WMI-related remote execution activity for investigation.",
    falsePositive:
      "Enterprise management platforms and legitimate administrative operations.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-007",
    title: "PsExec Activity",
    category: "Lateral Movement",
    severity: "HIGH",
    status: "PENDING",
    telemetry: "Sysmon / Windows telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Highlights PsExec-related activity that may represent remote service execution.",
    falsePositive:
      "Authorized system administration and software deployment.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-008",
    title: "RDP Logon Activity",
    category: "Remote Access",
    severity: "MEDIUM",
    status: "PENDING",
    telemetry: "Windows Security Event 4624",
    technique: "ATT&CK mapping under validation",
    description:
      "Identifies RDP-associated interactive logon activity for investigation.",
    falsePositive:
      "Legitimate remote desktop administration and support activity.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-009",
    title: "Named Pipe Activity",
    category: "IPC / Execution",
    severity: "MEDIUM",
    status: "PENDING",
    telemetry: "Sysmon named-pipe telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Highlights named-pipe activity that can provide useful context during endpoint investigations.",
    falsePositive:
      "Normal Windows services and legitimate applications frequently use named pipes.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-010",
    title: "Network Connection",
    category: "Network Activity",
    severity: "MEDIUM",
    status: "PENDING",
    telemetry: "Sysmon Event ID 3",
    technique: "ATT&CK mapping under validation",
    description:
      "Provides network-connection telemetry for investigation of suspicious endpoint communications.",
    falsePositive:
      "Normal applications, browsers, update services and enterprise software.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-011",
    title: "DLL Image Load",
    category: "Image Loading",
    severity: "MEDIUM",
    status: "PENDING",
    telemetry: "Sysmon Event ID 7",
    technique: "ATT&CK mapping under validation",
    description:
      "Identifies DLL image-load activity for investigation of unusual module loading.",
    falsePositive:
      "Normal application startup and legitimate Windows DLL loading.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-012",
    title: "Process Creation",
    category: "Execution",
    severity: "LOW",
    status: "PENDING",
    telemetry: "Sysmon Event ID 1",
    technique: "ATT&CK mapping under validation",
    description:
      "Captures process-creation telemetry that can serve as a foundation for endpoint investigation.",
    falsePositive:
      "Almost all normal Windows applications generate process creation events.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-013",
    title: "Registry Modification",
    category: "Defense Evasion / Persistence",
    severity: "MEDIUM",
    status: "PENDING",
    telemetry: "Sysmon Event ID 13",
    technique: "ATT&CK mapping under validation",
    description:
      "Highlights registry modification activity for investigation of persistence or configuration changes.",
    falsePositive:
      "Legitimate software installation, updates and Windows configuration changes.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-014",
    title: "BITS Activity",
    category: "Transfer / Execution",
    severity: "MEDIUM",
    status: "PENDING",
    telemetry: "BITS / Windows telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Highlights Background Intelligent Transfer Service activity requiring investigation.",
    falsePositive:
      "Windows updates, enterprise software and legitimate background transfers.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-015",
    title: "Defender Detection",
    category: "Security Detection",
    severity: "HIGH",
    status: "PENDING",
    telemetry: "Windows Defender events",
    technique: "ATT&CK mapping under validation",
    description:
      "Surfaces Windows Defender detections as high-value investigation signals.",
    falsePositive:
      "Security-tool detections can include known software, test payloads or research samples.",
    evidence: "EVTX validation pending.",
  },
  {
    id: "CDIHO-016",
    title: "PowerShell + Network Correlation",
    category: "Correlation",
    severity: "HIGH",
    status: "PENDING",
    telemetry: "Sysmon Event IDs 1 + 3",
    technique: "ATT&CK mapping under validation",
    description:
      "Correlation-style detection combining PowerShell process activity with network communication.",
    falsePositive:
      "Legitimate PowerShell automation that communicates with approved services.",
    evidence: "Correlation validation pending.",
  },
  {
    id: "CDIHO-017",
    title: "Process + Service Correlation",
    category: "Correlation",
    severity: "HIGH",
    status: "PENDING",
    telemetry: "Process + Service telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Correlation-style detection linking process execution and service activity.",
    falsePositive:
      "Software installation, administration and enterprise deployment workflows.",
    evidence: "Correlation validation pending.",
  },
  {
    id: "CDIHO-018",
    title: "RDP Logon + Process Correlation",
    category: "Correlation",
    severity: "HIGH",
    status: "PENDING",
    telemetry: "Security + Sysmon telemetry",
    technique: "ATT&CK mapping under validation",
    description:
      "Correlation-style detection connecting RDP logon activity with subsequent process activity.",
    falsePositive:
      "Authorized remote desktop sessions followed by normal administrative activity.",
    evidence: "Correlation validation pending.",
  },
];

function Detections() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState(null);

  const filteredDetections = useMemo(() => {
    return detections.filter((detection) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "CONFIRMED" && detection.status === "CONFIRMED") ||
        (filter === "PENDING" && detection.status === "PENDING") ||
        (filter === "CORRELATION" &&
          detection.category === "Correlation");

      const query = search.toLowerCase();

      const matchesSearch =
        detection.id.toLowerCase().includes(query) ||
        detection.title.toLowerCase().includes(query) ||
        detection.category.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  return (
    <main className="detections-page">
      <section className="detection-hero">
        <div>
          <div className="section-kicker">01 / DETECTION ENGINEERING</div>

          <h1>
            Detection
            <br />
            <span>Library.</span>
          </h1>

          <p>
            A structured collection of Sigma detection artifacts engineered
            around Windows security telemetry, investigation workflows and
            MITRE ATT&CK alignment.
          </p>
        </div>

        <div className="detection-summary">
          <div className="summary-icon">
            <Shield size={25} />
          </div>

          <div className="summary-number">18</div>

          <div className="summary-label">DETECTION ARTIFACTS</div>

          <div className="summary-divider" />

          <div className="summary-row">
            <span>Confirmed</span>
            <strong>01</strong>
          </div>

          <div className="summary-row">
            <span>Pending validation</span>
            <strong>17</strong>
          </div>

          <div className="summary-row">
            <span>Correlation rules</span>
            <strong>03</strong>
          </div>
        </div>
      </section>

      <section className="detection-controls">
        <div className="search-box">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search detection ID, title or category..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={15} />

          {["ALL", "CONFIRMED", "PENDING", "CORRELATION"].map((item) => (
            <button
              key={item}
              className={filter === item ? "filter-active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="detection-list">
        <div className="list-header">
          <span>RULE</span>
          <span>CATEGORY</span>
          <span>TELEMETRY</span>
          <span>SEVERITY</span>
          <span>STATUS</span>
          <span />
        </div>

        {filteredDetections.map((detection) => (
          <button
            className="detection-row"
            key={detection.id}
            onClick={() => setSelected(detection)}
          >
            <div className="rule-cell">
              <span className="rule-id">{detection.id}</span>
              <strong>{detection.title}</strong>
            </div>

            <span className="category-cell">{detection.category}</span>

            <span className="telemetry-cell">{detection.telemetry}</span>

            <span
              className={`severity ${detection.severity.toLowerCase()}`}
            >
              {detection.severity}
            </span>

            <span
              className={`rule-status ${detection.status.toLowerCase()}`}
            >
              {detection.status}
            </span>

            <ChevronRight size={17} />
          </button>
        ))}

        {filteredDetections.length === 0 && (
          <div className="empty-state">
            No detection artifacts match your search.
          </div>
        )}
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="detection-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
            >
              <X size={19} />
            </button>

            <div className="modal-top">
              <div>
                <div className="rule-id">{selected.id}</div>
                <h2>{selected.title}</h2>
              </div>

              <span
                className={`rule-status ${selected.status.toLowerCase()}`}
              >
                {selected.status}
              </span>
            </div>

            <p className="modal-description">{selected.description}</p>

            <div className="detail-grid">
              <div className="detail-card">
                <Terminal size={18} />
                <span>Telemetry</span>
                <strong>{selected.telemetry}</strong>
              </div>

              <div className="detail-card">
                <Target size={18} />
                <span>ATT&CK</span>
                <strong>{selected.technique}</strong>
              </div>

              <div className="detail-card">
                <AlertTriangle size={18} />
                <span>Severity</span>
                <strong>{selected.severity}</strong>
              </div>

              <div className="detail-card">
                <FileCheck2 size={18} />
                <span>Validation</span>
                <strong>
                  {selected.status === "CONFIRMED"
                    ? "Evidence confirmed"
                    : "Validation pending"}
                </strong>
              </div>
            </div>

            <div className="modal-section">
              <h3>False Positive Considerations</h3>
              <p>{selected.falsePositive}</p>
            </div>

            <div className="modal-section">
              <h3>Validation Evidence</h3>
              <p>{selected.evidence}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Detections;
