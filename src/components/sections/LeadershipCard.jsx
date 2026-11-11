import React from "react";
import { UserCheck } from "lucide-react";
import "./LeadershipCard.css";

export default function LeadershipCard({ leader }) {
  if (!leader) return null;

  const imageSrc = leader.image
    ? leader.image.startsWith("http")
      ? leader.image
      : `${process.env.PUBLIC_URL || ""}${leader.image.startsWith("/") ? "" : "/"}${leader.image}`
    : null;

  return (
    <div className={`leadership-card ${imageSrc ? "has-photo" : ""}`}>
      <div className="leadership-card-main">
        {imageSrc ? (
          <div className="leadership-photo-wrap">
            <div className="leadership-photo-frame">
              <img
                src={imageSrc}
                alt={leader.imageAlt || `${leader.name} - ${leader.role}`}
                className="leadership-photo"
                style={leader.imagePosition ? { objectPosition: leader.imagePosition } : undefined}
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="leadership-icon-wrap">
            <UserCheck size={28} />
          </div>
        )}

        <div className="leadership-content">
          <span className="leadership-role-tag">{leader.role}</span>
          <h3 className="leadership-name">{leader.name}</h3>
          {leader.note && <p className="leadership-note">{leader.note}</p>}
        </div>
      </div>

      <div className="leadership-card-line" />
    </div>
  );
}
