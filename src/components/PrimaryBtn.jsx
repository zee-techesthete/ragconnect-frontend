import React from "react";
import { Link } from "react-router-dom";

export default function PrimaryBtn({
  onClick,
  title,
  className = "",
  disabled = false,
  icon = null,
  icon2 = null,
  href,
}) {
  return (
    <Link to={href}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={` py-2 px-6 border border-gray rounded-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50 hover:border-black ${className}`}
      >
        {icon && <span className="material-icons">{icon}</span>}
        <span className="text-sm">{title}</span>
        {icon2 && <span className="material-icons">{icon2}</span>}
      </button>
    </Link>
  );
}
