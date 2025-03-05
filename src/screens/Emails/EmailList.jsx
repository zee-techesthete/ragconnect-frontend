import React, { useState, useEffect } from "react";
import axios from "axios";

function EmailList() {
  const [user_id, setUserId] = useState("");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8787/api/emails/smtp/fetch`,
        {
          params: { user_id: 15 },
        }
      );
      setEmails(response.data.emails);
    } catch (err) {
      setError(
        "Failed to fetch emails. Please check the user ID and try again."
      );
      console.error("Fetch Emails Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Fetch Emails</h1>
      <div className="form">
        <button type="button" onClick={fetchEmails} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Emails"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="emails-list">
        {emails.length > 0 ? (
          emails.map((email) => (
            <div key={email.email_id} className="email-item">
              <h3>{email.subject}</h3>
              <p>{email.snippet}</p>
              <small>
                Received at: {new Date(email.received_at).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p>No emails found.</p>
        )}
      </div>
    </div>
  );
}

export default EmailList;