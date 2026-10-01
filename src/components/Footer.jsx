import { Shield } from "lucide-react";

function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <Shield size={19} />
        <span>CYBERION THREATSHIELD</span>
      </div>

      <p>Detection Engineering & Threat Hunting Platform</p>

      <div className="footer-right">
        <span>PROJECT STATUS: ACTIVE</span>
        <span>© 2026 CYBERION</span>
      </div>
    </footer>
  );
}

export default Footer;
