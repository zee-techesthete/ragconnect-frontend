import { useState } from "react";

const EmailFetcher = () => {
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState("");

  const fetchEmail = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:8787/api/email/fetch");
      if (!response.ok) {
        throw new Error("No recent email found or an error occurred");
      }
      const data = await response.json();
      setEmailData(data);
    } catch (err) {
      setError(err.message);
      setEmailData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Email Summary</h1>
        <button
          onClick={fetchEmail}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Fetch Latest Email
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {emailData && (
          <div className="mt-4">
            <h2 className="font-semibold">Email Snippet:</h2>
            <p className="mb-2">{emailData.email_snippet}</p>
            <h2 className="font-semibold">Summary:</h2>
            <p>{emailData.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailFetcher;
