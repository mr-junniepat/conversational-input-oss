import React, { useState } from 'react';
import { ConversationalInput } from '../components/ConversationalInput';

export const AIIntegrationExample: React.FC = () => {
  const [aiResponse, setAIResponse] = useState<any>(null);
  const [aiError, setAIError] = useState<string | null>(null);

  const handleSubmit = async (text: string, files?: File[]) => {
    console.log('Form submitted:', { text, files });
    // Your custom submission logic here
  };

  const handleAIResponse = (response: any) => {
    setAIResponse(response);
    setAIError(null);
    console.log('AI Response:', response);
  };

  const handleAIError = (error: string) => {
    setAIError(error);
    setAIResponse(null);
    console.error('AI Error:', error);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI Integration Examples
        </h2>
        <p className="text-gray-600">
          See how easy it is to integrate AI processing with just an API key!
        </p>
      </div>

      {/* OpenAI Example */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🤖 OpenAI Integration
        </h3>
        <p className="text-gray-600 mb-4">
          Just provide your OpenAI API key and the component handles everything!
        </p>
        
        <ConversationalInput
          onSubmit={handleSubmit}
          placeholder="Tell me about your experience and I'll extract structured data..."
          aiProcessing={{
            provider: 'openai',
            apiKey: process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key',
            model: 'gpt-3.5-turbo',
            extractStructuredData: true,
            schema: {
              name: 'string',
              experience: 'string',
              skills: 'array',
              location: 'string',
              email: 'string'
            },
            onAIResponse: handleAIResponse,
            onAIError: handleAIError
          }}
          labels={{
            submit: 'Process with AI'
          }}
        />

        {aiResponse && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">AI Extracted Data:</h4>
            <pre className="text-sm text-green-800 overflow-auto">
              {JSON.stringify(aiResponse, null, 2)}
            </pre>
          </div>
        )}

        {aiError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">AI Error:</h4>
            <p className="text-sm text-red-800">{aiError}</p>
          </div>
        )}
      </div>

      {/* LM Studio Example */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🏠 LM Studio Integration
        </h3>
        <p className="text-gray-600 mb-4">
          Use your local LM Studio instance for privacy-focused AI processing.
        </p>
        
        <ConversationalInput
          onSubmit={handleSubmit}
          placeholder="Ask me anything and I'll respond using your local AI model..."
          aiProcessing={{
            provider: 'lmstudio',
            endpoint: 'http://localhost:1234/v1/chat/completions',
            model: 'local-model',
            clarificationMode: true,
            onAIResponse: handleAIResponse,
            onAIError: handleAIError
          }}
          labels={{
            submit: 'Ask Local AI'
          }}
        />
      </div>

      {/* Ollama Example */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🦙 Ollama Integration
        </h3>
        <p className="text-gray-600 mb-4">
          Connect to your local Ollama instance for powerful local AI processing.
        </p>
        
        <ConversationalInput
          onSubmit={handleSubmit}
          placeholder="Describe your project and I'll help you plan it..."
          aiProcessing={{
            provider: 'ollama',
            endpoint: 'http://localhost:11434/api/generate',
            model: 'mixtral',
            maxTokens: 2000,
            temperature: 0.7,
            onAIResponse: handleAIResponse,
            onAIError: handleAIError
          }}
          labels={{
            submit: 'Generate with Ollama'
          }}
        />
      </div>

      {/* Anthropic Example */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🧠 Anthropic Claude Integration
        </h3>
        <p className="text-gray-600 mb-4">
          Use Claude for advanced reasoning and analysis.
        </p>
        
        <ConversationalInput
          onSubmit={handleSubmit}
          placeholder="Describe a complex problem and I'll help you solve it..."
          aiProcessing={{
            provider: 'anthropic',
            apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY || 'your-anthropic-api-key',
            model: 'claude-3-haiku-20240307',
            maxTokens: 1500,
            temperature: 0.3,
            onAIResponse: handleAIResponse,
            onAIError: handleAIError
          }}
          labels={{
            submit: 'Analyze with Claude'
          }}
        />
      </div>
    </div>
  );
};

export default AIIntegrationExample;
