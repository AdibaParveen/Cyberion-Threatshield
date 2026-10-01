import { NavLink } from "react-router-dom";
import { Shield, ExternalLink } from "lucide-react";

const links = [
  { name: "Overview", path: "/" },
  { name: "Detections", path: "/detections" },
  { name: "ATT&CK", path: "/attack" },
  { name: "Hunts", path: "/hunts" },
  { name: "Incidents", path: "/incidents" },
  { name: "Playbooks", path: "/playbooks" },
  { name: "IOC", path: "/ioc" },
  { name: "Architecture", path: "/architecture" },
  { name: "Reports", path: "/reports" },
];

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <div className="brand-icon">
          <Shield size={22} />
        </div>

        <div>
          <div className="brand-name">CYBERION</div>
          <div className="brand-subtitle">THREATSHIELD</div>
        </div>
      </NavLink>

      <div className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <a
        className="github-button"
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
      >
        <ExternalLink size={16} />
        GitHub
      </a>
    </nav>
  );
}

export default Navbar;
