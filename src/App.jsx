import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Detections from "./pages/Detections";
import AttackCoverage from "./pages/AttackCoverage";
import ThreatHunts from "./pages/ThreatHunts";
import Incidents from "./pages/Incidents";
import Playbooks from "./pages/Playbooks";
import IOC from "./pages/IOC";
import Architecture from "./pages/Architecture";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detections" element={<Detections />} />
        <Route path="/attack" element={<AttackCoverage />} />
        <Route path="/hunts" element={<ThreatHunts />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/playbooks" element={<Playbooks />} />
        <Route path="/ioc" element={<IOC />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
