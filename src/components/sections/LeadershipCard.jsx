import React from "react";
import { UserCheck } from "lucide-react";
import "./LeadershipCard.css";

export default function LeadershipCard({ leader }) {
  if (!leader) return null;

  return (
    <div className="leadership-card">
      <div className="leadership-icon-wrap">
        <UserCheck size={28} />
      </div>

      <div className="leadership-content">
        <span className="leadership-role-tag">{leader.role}</span>
        <h3 className="leadership-name">{leader.name}</h3>
        {leader.note && <p className="leadership-note">{leader.note}</p>}
      </div>

      <div className="leadership-card-line" />
    </div>
  );
}
