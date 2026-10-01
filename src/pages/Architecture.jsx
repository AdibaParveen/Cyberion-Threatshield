import {
  Database,
  Shield,
  Search,
  AlertTriangle,
  FileText,
  GitBranch,
  TestTube2,
  FolderSearch,
  ArrowDown,
  CheckCircle2,
  Layers,
} from "lucide-react";

const pipeline = [
  {
    number: "01",
    title: "Telemetry & Data",
    description:
      "Security telemetry and publicly available datasets provide the raw investigation material.",
    icon: Database,
    items: [
      "data/raw",
      "data/processed",
      "data/normalized",
      "data/metadata",
    ],
  },
  {
    number: "02",
    title: "Detection Engineering",
    description:
      "Sigma detection logic is organized by platform, network, authentication and correlation use cases.",
    icon: Shield,
    items: [
      "rules/windows",
      "rules/network",
      "rules/authentication",
      "rules/correlation",
      "rules/hunting",
    ],
  },
  {
    number: "03",
    title: "Validation & Testing",
    description:
      "Detection artifacts are checked and investigated against available telemetry.",
    icon: TestTube2,
    items: [
      "tests/rule_tests",
      "tests/fixtures",
      "reports/rule_validation",
    ],
  },
  {
    number: "04",
    title: "Threat Hunting",
    description:
      "Structured hypotheses guide investigation of suspicious behavior and evidence.",
    icon: Search,
    items: [
      "hunts/hypotheses",
      "hunts/evidence",
      "reports/hunts",
    ],
  },
  {
    number: "05",
    title: "Incident Investigation",
    description:
      "Documented cases capture investigation steps, assessment, containment and recovery.",
    icon: AlertTriangle,
    items: [
      "incidents/cases",
      "incidents/timelines",
      "reports/incidents",
    ],
  },
  {
    number: "06",
    title: "Response & Intelligence",
    description:
      "Response playbooks and IOC research support structured investigation and response.",
    icon: GitBranch,
    items: [
      "playbooks",
      "ioc/ip",
      "ioc/domain",
      "ioc/hash",
    ],
  },
  {
    number: "07",
    title: "Reporting & Coverage",
    description:
      "MITRE ATT&CK coverage and executive reporting provide the final analytical view.",
    icon: FileText,
    items: [
      "mitre",
      "reports/executive",
      "analysis/notebooks",
      "analysis/scripts",
    ],
  },
];

const repositoryAreas = [
  {
    title: "Rules",
    path: "rules/",
    description: "Detection engineering artifacts.",
  },
  {
    title: "Hunts",
    path: "hunts/",
    description: "Structured hunting hypotheses and evidence.",
  },
  {
    title: "Incidents",
    path: "incidents/",
    description: "Incident cases and timelines.",
  },
  {
    title: "Playbooks",
    path: "playbooks/",
    description: "Structured response procedures.",
  },
  {
    title: "IOC",
    path: "ioc/",
    description: "Indicator research organization.",
  },
  {
    title: "Reports",
    path: "reports/",
    description: "Validation, hunting, incident and executive reporting.",
  },
];

export default function Architecture() {
  return (
    <main className="architecture-page">
      <section className="architecture-hero">
        <div className="section-eyebrow">
          <Layers size={15} />
          DETECTION ENGINEERING ARCHITECTURE
        </div>

        <h1>
          Project
          <span> Architecture</span>
        </h1>

        <p>
          Cyberion ThreatShield organizes detection engineering,
          threat hunting, incident investigation and reporting into
          a structured analysis workflow.
        </p>
      </section>

      <section className="architecture-note">
        <CheckCircle2 size={18} />

        <div>
          <strong>Repository-driven architecture</strong>
          <p>
            This view represents the documented project structure.
            It does not imply a live SIEM, SOAR platform, production
            backend or database.
          </p>
        </div>
      </section>

      <section className="architecture-pipeline">
        {pipeline.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <div key={stage.number}>
              <article className="architecture-stage">
                <div className="architecture-stage-number">
                  {stage.number}
                </div>

                <div className="architecture-stage-icon">
                  <Icon size={22} />
                </div>

                <div className="architecture-stage-content">
                  <h2>{stage.title}</h2>

                  <p>{stage.description}</p>

                  <div className="architecture-paths">
                    {stage.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>

              {index < pipeline.length - 1 && (
                <div className="architecture-arrow">
                  <ArrowDown size={18} />
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section className="architecture-repository">
        <div className="architecture-section-heading">
          <FolderSearch size={19} />

          <div>
            <div className="architecture-label">
              REPOSITORY ORGANIZATION
            </div>
            <h2>Core Project Areas</h2>
          </div>
        </div>

        <div className="architecture-repository-grid">
          {repositoryAreas.map((area) => (
            <div
              className="architecture-repository-card"
              key={area.path}
            >
              <div className="architecture-repository-top">
                <h3>{area.title}</h3>
                <code>{area.path}</code>
              </div>

              <p>{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="architecture-boundaries">
        <div className="architecture-section-heading">
          <Shield size={19} />

          <div>
            <div className="architecture-label">
              PROJECT BOUNDARIES
            </div>
            <h2>What this architecture represents</h2>
          </div>
        </div>

        <div className="architecture-boundary-grid">
          <div>
            <CheckCircle2 size={17} />
            <span>Detection engineering</span>
          </div>

          <div>
            <CheckCircle2 size={17} />
            <span>Windows security telemetry analysis</span>
          </div>

          <div>
            <CheckCircle2 size={17} />
            <span>Threat hunting workflows</span>
          </div>

          <div>
            <CheckCircle2 size={17} />
            <span>Incident investigation</span>
          </div>

          <div>
            <CheckCircle2 size={17} />
            <span>Response playbooks</span>
          </div>

          <div>
            <CheckCircle2 size={17} />
            <span>IOC research</span>
          </div>
        </div>
      </section>
    </main>
  );
}
