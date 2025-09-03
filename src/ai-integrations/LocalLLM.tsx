import React, { useState } from 'react';
import { ConversationalInput } from '../components/ConversationalInput';

/**
 * Local LLM Integration Example
 * 
 * This example shows how to integrate ConversationalInput
 * with local LLMs like Ollama or LM Studio for privacy-focused, offline processing.
 */
export const LocalLLM: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelStatus, setModelStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected');
  const [extractedData, setExtractedData] = useState<any>(null);
  const [modelInfo, setModelInfo] = useState<any>(null);

  const checkModelConnection = async () => {
    try {
      setModelStatus('disconnected');
      
      // Check if local model is running
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (response.ok) {
        const models = await response.json();
        setModelInfo(models);
        setModelStatus('connected');
        return true;
      } else {
        throw new Error('Model not responding');
      }
    } catch (error) {
      console.error('Model connection error:', error);
      setModelStatus('error');
      return false;
    }
  };

  const processWithLocalLLM = async (text: string, files?: File[]) => {
    try {
      setIsProcessing(true);
      
      // Check model connection first
      const isConnected = await checkModelConnection();
      if (!isConnected) {
        alert('Local LLM not available. Please ensure Ollama or LM Studio is running.');
        return;
      }
      
      // Process with local model
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mixtral', // or 'llama2', 'mistral', etc.
          prompt: `Extract structured information from this text and return as JSON:
          
Text: ${text}

Files: ${files?.map(f => f.name).join(', ') || 'None'}

Please extract and return a JSON object with the following structure:
{
  "experience": "years of experience",
  "skills": ["skill1", "skill2"],
  "availability": "availability details",
  "location": "preferred location",
  "salary": "salary expectations"
}`,
          stream: false,
          options: {
            temperature: 0.1,
            top_p: 0.9,
            max_tokens: 1000
          }
        })
      });

      if (!response.ok) throw new Error('Local LLM processing failed');
      
      const result = await response.json();
      
      try {
        // Try to parse the response as JSON
        const extracted = JSON.parse(result.response);
        setExtractedData(extracted);
      } catch (parseError) {
        // If parsing fails, show the raw response
        setExtractedData({
          rawResponse: result.response,
          note: 'Response could not be parsed as JSON'
        });
      }
      
    } catch (error) {
      console.error('Local LLM processing error:', error);
      alert('Error processing with local LLM');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Local LLM Integration</h2>
      <p className="text-gray-600 mb-6">
        Process conversational input with local LLMs like Ollama or LM Studio for privacy and offline processing.
      </p>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Model Status</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              modelStatus === 'connected' ? 'bg-green-500' : 
              modelStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'
            }`}></div>
            <span className="capitalize">{modelStatus}</span>
          </div>
          
          {modelStatus === 'connected' && modelInfo && (
            <div className="text-sm text-gray-600">
              Available models: {modelInfo.models?.map((m: any) => m.name).join(', ') || 'Unknown'}
            </div>
          )}
          
          <button
            onClick={checkModelConnection}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
          >
            Check Connection
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ConversationalInput
            onSubmit={processWithLocalLLM}
            isSubmitting={isProcessing}
            placeholder="Describe your experience and requirements..."
            requireFiles={false}
            labels={{
              submit: "Process with Local LLM"
            }}
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Extracted Data</h3>
          {extractedData ? (
            <pre className="bg-white p-3 rounded border text-sm overflow-auto">
              {JSON.stringify(extractedData, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">
              Submit text to see local LLM extracted data here...
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Features:</h4>
        <ul className="space-y-1">
          <li>✅ Local LLM integration (Ollama, LM Studio)</li>
          <li>✅ Privacy-focused processing</li>
          <li>✅ Offline capability</li>
          <li>✅ Model status monitoring</li>
          <li>✅ Structured data extraction</li>
        </ul>
        
        <h4 className="font-semibold mt-3 mb-2">Setup Instructions:</h4>
        <ol className="list-decimal list-inside space-y-1 ml-4">
          <li>Install Ollama: <code className="bg-gray-200 px-1 rounded">curl -fsSL https://ollama.ai/install.sh | sh</code></li>
          <li>Pull a model: <code className="bg-gray-200 px-1 rounded">ollama pull mixtral</code></li>
          <li>Start Ollama: <code className="bg-gray-200 px-1 rounded">ollama serve</code></li>
        </ol>
      </div>
    </div>
  );
};

export default LocalLLM;
