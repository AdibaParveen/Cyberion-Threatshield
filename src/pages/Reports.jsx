const validationReports = [
  {
    id: "CDIHO-001",
    title: "PowerShell Accessing Another Process",
    status: "PASS",
    type: "Evidence-backed validation",
    technique: "T1055 — Process Injection",
    dataset: "EVTX-ATTACK-SAMPLES",
    event: "Sysmon Event ID 10",
    evidence: [
      ["SourceImage", "PowerShell"],
      ["TargetImage", "notepad.exe"],
      ["GrantedAccess", "0x001f1fff"],
      ["SourceProcessId", "2108"],
      ["TargetProcessId", "2840"],
      ["CallTrace", "System.Management.Automation"],
      ["Timestamp", "2019-05-18 17:16:08 UTC"],
    ],
    summary:
      "Matching Event ID 10 telemetry was observed in the referenced EVTX dataset.",
    falsePositive:
      "Legitimate administrative PowerShell activity and security software may generate process-access events.",
    tuning:
      "Initial tuning requires additional benign telemetry before production use.",
  },
];

const qualityChecks = [
  {
    title: "Windows Sigma Rules",
    file: "sigma_windows_check.txt",
    status: "PASS",
    details: "0 errors · 0 condition errors · 0 validation issues",
  },
  {
    title: "Correlation Sigma Rules",
    file: "sigma_correlation_check.txt",
    status: "PASS",
    details: "0 errors · 0 condition errors · 0 validation issues",
  },
];

const reportPipeline = [
  {
    title: "Rule Validation",
    status: "AVAILABLE",
    description:
      "Evidence-backed validation and Sigma quality-check reports are available.",
  },
  {
    title: "Hunt Reports",
    status: "NOT GENERATED",
    description:
      "Hunt hypotheses are documented, but dedicated report files have not yet been generated.",
  },
  {
    title: "Incident Reports",
    status: "NOT GENERATED",
    description:
      "Incident investigation cases are documented, but dedicated report files have not yet been generated.",
  },
  {
    title: "Executive Reports",
    status: "NOT GENERATED",
    description:
      "No executive report file has been generated yet.",
  },
];

function StatusBadge({ children, type = "default" }) {
  return <span className={`report-badge ${type}`}>{children}</span>;
}

function Reports() {
  return (
    <main className="page reports-page">
      <section className="reports-hero">
        <div className="section-kicker">08 / DOCUMENTATION</div>

        <div className="reports-hero-grid">
          <div>
            <h1>Reports & Documentation</h1>

            <p className="reports-lead">
              Evidence-backed validation, Sigma quality checks, investigation
              documentation and project reporting status for Cyberion
              ThreatShield.
            </p>

            <div className="reports-hero-tags">
              <StatusBadge type="pass">1 Evidence-backed Validation</StatusBadge>
              <StatusBadge type="pass">18 Sigma Rules Checked</StatusBadge>
              <StatusBadge type="pass">0 Validation Issues</StatusBadge>
            </div>
          </div>

          <div className="reports-status-card">
            <div className="status-card-label">VALIDATION STATUS</div>

            <div className="status-card-value">PASS</div>

            <div className="status-card-line">
              <span>Evidence-backed rules</span>
              <strong>1</strong>
            </div>

            <div className="status-card-line">
              <span>Sigma errors</span>
              <strong>0</strong>
            </div>

            <div className="status-card-line">
              <span>Condition errors</span>
              <strong>0</strong>
            </div>

            <div className="status-card-line">
              <span>Validation issues</span>
              <strong>0</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="report-section">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">01 / RULE VALIDATION</div>
            <h2>Evidence-Backed Validation</h2>
          </div>

          <StatusBadge type="pass">VERIFIED TELEMETRY</StatusBadge>
        </div>

        <div className="validation-card">
          {validationReports.map((report) => (
            <div key={report.id}>
              <div className="validation-header">
                <div>
                  <div className="report-id">{report.id}</div>
                  <h3>{report.title}</h3>
                  <p>{report.type}</p>
                </div>

                <StatusBadge type="pass">{report.status}</StatusBadge>
              </div>

              <div className="validation-meta">
                <div>
                  <span>ATT&CK</span>
                  <strong>{report.technique}</strong>
                </div>

                <div>
                  <span>DATASET</span>
                  <strong>{report.dataset}</strong>
                </div>

                <div>
                  <span>EVENT</span>
                  <strong>{report.event}</strong>
                </div>
              </div>

              <div className="evidence-block">
                <div className="evidence-title">OBSERVED EVIDENCE</div>

                <div className="evidence-grid">
                  {report.evidence.map(([label, value]) => (
                    <div className="evidence-item" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="report-analysis-grid">
                <div className="analysis-card">
                  <span>DETECTION OBJECTIVE</span>
                  <p>
                    Identify PowerShell-originated process-access activity that
                    may represent process injection or related process
                    manipulation.
                  </p>
                </div>

                <div className="analysis-card">
                  <span>VALIDATION RESULT</span>
                  <p>{report.summary}</p>
                </div>

                <div className="analysis-card">
                  <span>FALSE POSITIVE ANALYSIS</span>
                  <p>{report.falsePositive}</p>
                </div>

                <div className="analysis-card">
                  <span>TUNING</span>
                  <p>{report.tuning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="report-section">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">02 / QUALITY CONTROL</div>
            <h2>Sigma Validation Checks</h2>
          </div>

          <StatusBadge type="pass">ALL CHECKS CLEAN</StatusBadge>
        </div>

        <div className="quality-grid">
          {qualityChecks.map((check) => (
            <div className="quality-card" key={check.title}>
              <div className="quality-card-top">
                <div>
                  <span className="report-file">{check.file}</span>
                  <h3>{check.title}</h3>
                </div>

                <StatusBadge type="pass">{check.status}</StatusBadge>
              </div>

              <div className="quality-result">
                <span>RESULT</span>
                <strong>{check.details}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="report-note">
          <strong>Validation distinction:</strong> Sigma parsing and quality
          checks confirm that the rules contain no reported rule, condition or
          validation issues. They do not by themselves establish that every
          rule has been tested against actual telemetry.
        </div>
      </section>

      <section className="report-section">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">03 / REPORT PIPELINE</div>
            <h2>Documentation Status</h2>
          </div>
        </div>

        <div className="pipeline-grid">
          {reportPipeline.map((item) => {
            const available = item.status === "AVAILABLE";

            return (
              <div className="pipeline-card" key={item.title}>
                <div className="pipeline-top">
                  <h3>{item.title}</h3>

                  <StatusBadge type={available ? "pass" : "pending"}>
                    {item.status}
                  </StatusBadge>
                </div>

                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="report-section final-report-note">
        <div className="section-kicker">04 / EVIDENCE STANDARD</div>

        <h2>Evidence Before Claims</h2>

        <p>
          Cyberion ThreatShield separates directly observed telemetry from
          investigation hypotheses and documentation. Current evidence
          supports the CDIHO-001 validation result and the Sigma quality
          checks shown above. Additional rule-level validation reports should
          be added as telemetry testing is completed.
        </p>
      </section>
    </main>
  );
}

export default Reports;
