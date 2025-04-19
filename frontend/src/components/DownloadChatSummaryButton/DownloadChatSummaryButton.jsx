import React from "react";
import "./DownloadChatSummaryButton.css";

const DownloadChatSummaryButton = ({ rollno }) => {
  const downloadChatSummary = async () => {
    if (!rollno) {
      alert("⚠️ No student selected.");
      return;
    }

    try {
      // const response = await fetch(`http://10.1.160.86:8000/report/${rollno}`, {
        const response = await fetch(`/report/${rollno}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch chat summary: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${rollno}_report.pdf`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading summary:", error);
      alert("Failed to download the chat summary.");
    }
  };

  return (
    <button onClick={downloadChatSummary} className="download-summary-btn">
      📥 Download Chat Summary
    </button>
  );
};

export default DownloadChatSummaryButton;
