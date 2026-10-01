import { useMemo, useState } from "react";
import {
  Crosshair,
  Search,
  Shield,
  Target,
  Layers3,
  ChevronRight,
  X,
  CheckCircle2,
  Info,
} from "lucide-react";

const coverage = [
  {
    number: 1,
    technique: "T1055",
    name: "Process Injection",
    tactic: "Defense Evasion",
    detection: "CDIHO-001",
  },
  {
    number: 2,
    technique: "T1218.011",
    name: "Rundll32",
    tactic: "Defense Evasion",
    detection: "CDIHO-002",
  },
  {
    number: 3,
    technique: "T1053.005",
    name: "Scheduled Task",
    tactic: "Persistence",
    detection: "CDIHO-003",
  },
  {
    number: 4,
    technique: "T1569.002",
    name: "Service Execution",
    tactic: "Execution / Lateral Movement",
    detection: "CDIHO-004",
  },
  {
    number: 5,
    technique: "T1021.006",
    name: "Windows Remote Management",
    tactic: "Lateral Movement",
    detection: "CDIHO-005",
  },
  {
    number: 6,
    technique: "T1047",
    name: "Windows Management Instrumentation",
    tactic: "Execution",
    detection: "CDIHO-006",
  },
  {
    number: 7,
    technique: "T1569.002",
    name: "Service Execution",
    tactic: "Lateral Movement",
    detection: "CDIHO-007",
  },
  {
    number: 8,
    technique: "T1021.001",
    name: "Remote Services: RDP",
    tactic: "Lateral Movement",
    detection: "CDIHO-008",
  },
  {
    number: 9,
    technique: "T1559",
    name: "Inter-Process Communication",
    tactic: "Execution",
    detection: "CDIHO-009",
  },
  {
    number: 10,
    technique: "T1071",
    name: "Application Layer Protocol",
    tactic: "Command and Control",
    detection: "CDIHO-010",
  },
  {
    number: 11,
    technique: "T1574",
    name: "Hijack Execution Flow",
    tactic: "Defense Evasion",
    detection: "CDIHO-011",
  },
  {
    number: 12,
    technique: "T1059",
    name: "Command and Scripting Interpreter",
    tactic: "Execution",
    detection: "CDIHO-012",
  },
  {
    number: 13,
    technique: "T1112",
    name: "Modify Registry",
    tactic: "Defense Evasion / Persistence",
    detection: "CDIHO-013",
  },
  {
    number: 14,
    technique: "T1105",
    name: "Ingress Tool Transfer",
    tactic: "Command and Control",
    detection: "CDIHO-014",
  },
  {
    number: 15,
    technique: "T1204",
    name: "User Execution",
    tactic: "Execution",
    detection: "CDIHO-015",
  },
  {
    number: 16,
    technique: "T1059 + T1071",
    name: "Command/Scripting + Application Layer Protocol",
    tactic: "Execution / C2",
    detection: "CDIHO-016",
  },
  {
    number: 17,
    technique: "T1569.002",
    name: "Service Execution",
    tactic: "Lateral Movement",
    detection: "CDIHO-017",
  },
  {
    number: 18,
    technique: "T1021.001",
    name: "Remote Services: RDP",
    tactic: "Lateral Movement",
    detection: "CDIHO-018",
  },
];

const tactics = [
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Lateral Movement",
  "Command and Control",
];

function AttackCoverage() {
  const [search, setSearch] = useState("");
  const [tacticFilter, setTacticFilter] = useState("ALL");
  const [selected, setSelected] = useState(null);

  const filteredCoverage = useMemo(() => {
    return coverage.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.technique.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.tactic.toLowerCase().includes(query) ||
        item.detection.toLowerCase().includes(query);

      const matchesTactic =
        tacticFilter === "ALL" ||
        item.tactic.toLowerCase().includes(tacticFilter.toLowerCase());

      return matchesSearch && matchesTactic;
    });
  }, [search, tacticFilter]);

  const uniqueTechniques = new Set(
    coverage.flatMap((item) =>
      item.technique.includes("+")
        ? item.technique.split("+").map((x) => x.trim())
        : [item.technique]
    )
  ).size;

  const activeTactics = new Set(
    coverage.flatMap((item) =>
      item.tactic.split("/").map((x) => x.trim())
    )
  ).size;

  return (
    <main className="attack-page">
      {/* HERO */}
      <section className="attack-hero">
        <div>
          <div className="section-kicker">02 / MITRE ATT&CK</div>

          <h1>
            ATT&CK
            <br />
            <span>Coverage.</span>
          </h1>

          <p>
            Cyberion ThreatShield evaluates detection opportunities across
            MITRE ATT&CK tactics and techniques using Windows security
            telemetry.
          </p>
        </div>

        <div className="attack-objective">
          <div className="attack-objective-icon">
            <Crosshair size={25} />
          </div>

          <span className="objective-label">COVERAGE OBJECTIVE</span>

          <p>
            Assess detection opportunities across multiple ATT&CK tactics and
            map them to Cyberion detection artifacts.
          </p>

          <div className="objective-status">
            <Info size={14} />
            Detection mappings remain hypotheses until telemetry validation.
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="attack-stats">
        <div className="attack-stat">
          <Layers3 size={20} />
          <strong>18</strong>
          <span>ASSESSED MAPPINGS</span>
        </div>

        <div className="attack-stat">
          <Target size={20} />
          <strong>{uniqueTechniques}</strong>
          <span>TECHNIQUE IDs REPRESENTED</span>
        </div>

        <div className="attack-stat">
          <Shield size={20} />
          <strong>{activeTactics}</strong>
          <span>TACTICS REPRESENTED IN MATRIX</span>
        </div>

        <div className="attack-stat">
          <CheckCircle2 size={20} />
          <strong>HYPOTHESIS</strong>
          <span>VALIDATION STATE</span>
        </div>
      </section>

      {/* TACTIC MAP */}
      <section className="tactic-section">
        <div className="attack-section-heading">
          <div>
            <div className="section-kicker">TACTIC MAP</div>
            <h2>ATT&CK Tactics</h2>
          </div>

          <p>
            The project coverage document lists eight ATT&CK tactics as the
            overall assessment scope.
          </p>
        </div>

        <div className="tactic-grid">
          {tactics.map((tactic, index) => {
            const represented = coverage.some((item) =>
              item.tactic
                .toLowerCase()
                .includes(tactic.toLowerCase())
            );

            return (
              <button
                key={tactic}
                className={`tactic-card ${
                  represented ? "represented" : "not-represented"
                }`}
                onClick={() =>
                  represented
                    ? setTacticFilter(
                        tacticFilter === tactic ? "ALL" : tactic
                      )
                    : null
                }
              >
                <span className="tactic-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="tactic-name">{tactic}</span>

                <span className="tactic-status">
                  {represented ? "MAPPED" : "SCOPE"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* COVERAGE MATRIX */}
      <section className="coverage-section">
        <div className="attack-section-heading">
          <div>
            <div className="section-kicker">COVERAGE MATRIX</div>
            <h2>Technique Mapping</h2>
          </div>

          <p>
            Each row connects an ATT&CK technique hypothesis with a Cyberion
            detection artifact.
          </p>
        </div>

        <div className="coverage-controls">
          <div className="search-box">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search technique, tactic or detection..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="active-filter">
            FILTER:{" "}
            <strong>{tacticFilter === "ALL" ? "ALL" : tacticFilter}</strong>

            {tacticFilter !== "ALL" && (
              <button onClick={() => setTacticFilter("ALL")}>CLEAR</button>
            )}
          </div>
        </div>

        <div className="coverage-table">
          <div className="coverage-header">
            <span>#</span>
            <span>TECHNIQUE</span>
            <span>TACTIC</span>
            <span>CYBERION DETECTION</span>
            <span />
          </div>

          {filteredCoverage.map((item) => (
            <button
              className="coverage-row"
              key={`${item.number}-${item.detection}`}
              onClick={() => setSelected(item)}
            >
              <span className="coverage-number">
                {String(item.number).padStart(2, "0")}
              </span>

              <div className="technique-cell">
                <strong>{item.technique}</strong>
                <span>{item.name}</span>
              </div>

              <span className="tactic-cell">{item.tactic}</span>

              <span className="detection-badge">
                {item.detection}
              </span>

              <ChevronRight size={17} />
            </button>
          ))}

          {filteredCoverage.length === 0 && (
            <div className="attack-empty">
              No ATT&CK mappings match the current search.
            </div>
          )}
        </div>
      </section>

      {/* VALIDATION NOTE */}
      <section className="validation-note">
        <div className="validation-note-icon">
          <Info size={20} />
        </div>

        <div>
          <div className="section-kicker">VALIDATION NOTE</div>

          <h3>Coverage is an assessment, not a production claim.</h3>

          <p>
            The ATT&CK mapping represents the detection hypothesis documented
            by Cyberion ThreatShield. Individual detections must be validated
            against corresponding telemetry before they are treated as
            confirmed production detections.
          </p>
        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="attack-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
            >
              <X size={19} />
            </button>

            <div className="section-kicker">
              ATT&CK MAPPING / {selected.detection}
            </div>

            <h2>{selected.technique}</h2>

            <div className="attack-technique-name">
              {selected.name}
            </div>

            <div className="attack-detail-grid">
              <div>
                <span>TACTIC</span>
                <strong>{selected.tactic}</strong>
              </div>

              <div>
                <span>DETECTION</span>
                <strong>{selected.detection}</strong>
              </div>

              <div>
                <span>ASSESSMENT</span>
                <strong>Detection hypothesis</strong>
              </div>

              <div>
                <span>VALIDATION</span>
                <strong>Telemetry validation required</strong>
              </div>
            </div>

            <div className="attack-modal-note">
              <Info size={16} />
              <p>
                This mapping is sourced from the Cyberion ThreatShield
                coverage matrix. It should not be interpreted as a confirmed
                production detection until the associated telemetry test is
                complete.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AttackCoverage;
