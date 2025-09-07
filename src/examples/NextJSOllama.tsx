/**
 * Next.js Ollama Integration Example
 * Shows how to safely integrate Ollama with server-side proxy routes
 */

import React, { useState } from 'react';
import { ConversationalInput } from '../components/ConversationalInput';
import { ConversationalInputProps } from '../types';

interface OllamaConfig {
  model: string;
  endpoint: string;
  maxTokens?: number;
  temperature?: number;
}

interface NextJSOllamaProps {
  config: OllamaConfig;
  onResult?: (result: any) => void;
  onError?: (error: Error) => void;
}

export const NextJSOllama: React.FC<NextJSOllamaProps> = ({
  config,
  onResult,
  onError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string, files?: File[]) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Call server-side proxy route (NEVER call Ollama directly from browser)
      const response = await fetch('/api/ollama/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          files: files?.map(f => ({ name: f.name, size: f.size, type: f.type })),
          config
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      onResult?.(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      onError?.(err as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Next.js Ollama Integration
        </h2>
        <p className="text-gray-600">
          Safe server-side integration with Ollama. Never call Ollama directly from the browser!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div>
          <ConversationalInput
            onSubmit={handleSubmit}
            placeholder="Describe your experience or ask a question..."
            enableVoice={true}
            enableFileUpload={true}
            acceptedFileTypes={['.pdf', '.doc', '.docx', '.txt']}
            isSubmitting={isProcessing}
            labels={{
              submit: isProcessing ? 'Processing...' : 'Process with Ollama',
              addAttachments: 'Upload Documents',
              useVoice: 'Voice Input'
            }}
          />
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {/* Configuration Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Configuration</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Model:</span> {config.model}</div>
              <div><span className="font-medium">Endpoint:</span> {config.endpoint}</div>
              <div><span className="font-medium">Max Tokens:</span> {config.maxTokens || 'Default'}</div>
              <div><span className="font-medium">Temperature:</span> {config.temperature || 'Default'}</div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Result</h3>
              <pre className="text-green-700 text-sm whitespace-pre-wrap overflow-auto max-h-64">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">🔒 Security Notice</h3>
        <div className="text-blue-700 text-sm space-y-1">
          <p>• Ollama is called via server-side proxy routes, never directly from the browser</p>
          <p>• All requests are validated and sanitized on the server</p>
          <p>• PII detection and prompt injection defense are enabled</p>
          <p>• Audit logs are maintained for compliance</p>
        </div>
      </div>
    </div>
  );
};

// Example usage component
export const NextJSOllamaExample: React.FC = () => {
  const [config] = useState<OllamaConfig>({
    model: 'mixtral',
    endpoint: 'http://localhost:11434',
    maxTokens: 1000,
    temperature: 0.1
  });

  const handleResult = (result: any) => {
    console.log('Ollama result:', result);
  };

  const handleError = (error: Error) => {
    console.error('Ollama error:', error);
  };

  return (
    <NextJSOllama
      config={config}
      onResult={handleResult}
      onError={handleError}
    />
  );
};

export default NextJSOllama;
