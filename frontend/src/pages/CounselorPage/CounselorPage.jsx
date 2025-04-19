import React from "react";
import { useNavigate } from "react-router-dom";
import CounselorDashboard from "../../components/CounselorDashboard/CounselorDashboard";

const CounselorPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // or localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "8px 16px",
          backgroundColor: "black",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
        }}
      >
        Logout
      </button>

      <CounselorDashboard />
    </div>
  );
};

export default CounselorPage;
