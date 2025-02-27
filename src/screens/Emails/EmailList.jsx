import React from "react";

const EmailList = ({ emails }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Emails</h2>
      <div className="space-y-4">
        {emails.length === 0 ? (
          <p className="text-gray-500">No emails found.</p>
        ) : (
          emails.map((email, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-blue-600">
                    {email.subject}
                  </h3>
                  <span className="ml-2 text-sm text-gray-500">
                    - {email.threadId}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(email.received_at).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{email.snippet}</p>
              <div className="mt-2">
                <p className="text-gray-700">{email.body.slice(0, 200)}...</p>
              </div>
              <div className="mt-4 text-right">
                <a
                  href={`mailto:${email.threadId}`}
                  className="text-blue-500 hover:underline"
                >
                  Reply
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmailList;
