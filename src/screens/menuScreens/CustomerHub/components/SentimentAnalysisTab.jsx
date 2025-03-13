import React from 'react';

const SentimentAnalysisTab = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Sentiment Analysis</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700">Customer Sentiment</h3>
            <p className="text-gray-600">Analyze customer feedback and sentiment</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Trend Analysis</h3>
            <p className="text-gray-600">Track sentiment trends over time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisTab; 