'use client';

import { useState } from 'react';

export default function TestDbPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const testDbConnection = async () => {
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      const response = await fetch('/api/db-test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to test database');
      }
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Database test error:', error);
      setError(error instanceof Error ? error.message : 'Failed to test database');
    } finally {
      setLoading(false);
    }
  };

  const createTestLead = async () => {
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      const testData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
      };
      
      console.log('Submitting test lead:', testData);
      
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create test lead');
      }
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Test lead creation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to create test lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>
        
        <div className="space-y-4 mb-8">
          <button
            onClick={testDbConnection}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Database Connection'}
          </button>
          
          <button
            onClick={createTestLead}
            disabled={loading}
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Test Lead'}
          </button>
        </div>
        
        {error && (
          <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {result && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <p className="font-bold">Result:</p>
            <pre className="whitespace-pre-wrap overflow-x-auto">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}