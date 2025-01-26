import React, { useState } from 'react';
import Navbar from '../components/navbar';

export default function AnalyzerPage() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const submitAnalysis = async () => {
    if (!file) {
      setError("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/upload-csv', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (response.ok) {
        setAnalysis(data);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred during analysis");
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Review Analyzer
        </h1>

        <div className="bg-secondary/20 rounded-lg p-6 mb-8">
          <input 
            type="file" 
            accept=".csv"
            onChange={handleFileUpload}
            className="mb-4 text-text"
          />
          <button 
            onClick={submitAnalysis}
            className="px-6 py-3 bg-primary text-black rounded-lg"
          >
            Analyze Reviews
          </button>
          
          {error && (
            <div className="text-red-500 mt-4">
              {error}
            </div>
          )}
        </div>

        {analysis && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Top Positive Aspects
              </h2>
              {analysis.top_positive_aspects.map((aspect, index) => (
                <div key={index} className="bg-secondary/20 p-4 rounded-lg mb-2">
                  <p>{aspect.aspect}</p>
                  <p className="text-green-400">Score: {aspect.score.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Top Negative Aspects
              </h2>
              {analysis.top_negative_aspects.map((aspect, index) => (
                <div key={index} className="bg-secondary/20 p-4 rounded-lg mb-2">
                  <p>{aspect.aspect}</p>
                  <p className="text-red-400">Score: {aspect.score.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}