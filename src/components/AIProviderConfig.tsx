import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Settings, Key, Server } from 'lucide-react';

export interface AIProviderConfigProps {
  onConfigure: (config: {
    provider: string;
    apiKey?: string;
    endpoint?: string;
    model?: string;
  }) => void;
  currentConfig?: {
    provider: string;
    apiKey?: string;
    endpoint?: string;
    model?: string;
  };
}

export const AIProviderConfig: React.FC<AIProviderConfigProps> = ({
  onConfigure,
  currentConfig
}) => {
  const [provider, setProvider] = useState(currentConfig?.provider || 'openai');
  const [apiKey, setApiKey] = useState(currentConfig?.apiKey || '');
  const [endpoint, setEndpoint] = useState(currentConfig?.endpoint || '');
  const [model, setModel] = useState(currentConfig?.model || '');
  const [isConfigured, setIsConfigured] = useState(false);

  // Initialize model with default value for the selected provider
  useEffect(() => {
    if (!currentConfig?.model) {
      const providerInfo = getProviderInfo(provider);
      setModel(providerInfo.defaultModel);
      setEndpoint(providerInfo.defaultEndpoint);
    }
  }, [provider, currentConfig?.model]);

  const handleSave = () => {
    const config = {
      provider,
      apiKey: provider === 'openai' || provider === 'anthropic' || provider === 'gemini' || provider === 'mistral' ? apiKey : undefined,
      endpoint: provider === 'lmstudio' || provider === 'ollama' ? endpoint : undefined,
      model: model || undefined
    };
    
    onConfigure(config);
    setIsConfigured(true);
    
    // Reset after 2 seconds
    setTimeout(() => setIsConfigured(false), 2000);
  };

  const getProviderInfo = (providerId: string) => {
    switch (providerId) {
      case 'openai':
        return {
          name: 'OpenAI',
          description: 'GPT models for general purpose AI',
          icon: '🤖',
          needsApiKey: true,
          defaultModel: 'gpt-4o-mini',
          defaultEndpoint: ''
        };
      case 'anthropic':
        return {
          name: 'Anthropic Claude',
          description: 'Claude models for advanced reasoning',
          icon: '🧠',
          needsApiKey: true,
          defaultModel: 'claude-3-5-sonnet-20241022',
          defaultEndpoint: ''
        };
      case 'lmstudio':
        return {
          name: 'LM Studio',
          description: 'Local AI models for privacy',
          icon: '🏠',
          needsApiKey: false,
          defaultModel: 'openai/gpt-oss-20b',
          defaultEndpoint: 'http://localhost:1234/v1/chat/completions'
        };
      case 'ollama':
        return {
          name: 'Ollama',
          description: 'Local AI models with easy setup',
          icon: '🦙',
          needsApiKey: false,
          defaultModel: 'mixtral',
          defaultEndpoint: 'http://localhost:11434/api/generate'
        };
      case 'gemini':
        return {
          name: 'Google Gemini',
          description: 'Google\'s advanced AI models',
          icon: '💎',
          needsApiKey: true,
          defaultModel: 'gemini-1.5-flash',
          defaultEndpoint: ''
        };
      case 'mistral':
        return {
          name: 'Mistral Cloud',
          description: 'Mistral\'s powerful AI models',
          icon: '🌪️',
          needsApiKey: true,
          defaultModel: 'mistral-small-latest',
          defaultEndpoint: ''
        };
      default:
        return {
          name: 'Unknown',
          description: 'Unknown provider',
          icon: '❓',
          needsApiKey: false,
          defaultModel: '',
          defaultEndpoint: ''
        };
    }
  };

  const providerInfo = getProviderInfo(provider);

  return (
    <div className="bg-white">
    

      {/* Provider Selection */}
      <div className="mb-6">
      
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['openai', 'anthropic', 'lmstudio', 'ollama', 'gemini', 'mistral'].map((providerId) => {
            const info = getProviderInfo(providerId);
            return (
              <button
                key={providerId}
                onClick={() => {
                  setProvider(providerId);
                  setModel(info.defaultModel);
                  setEndpoint(info.defaultEndpoint);
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  provider === providerId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{info.icon}</div>
                <div className="text-sm font-medium text-gray-900">{info.name}</div>
                <div className="text-xs text-gray-500">{info.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Configuration Form */}
      <div className="space-y-4">
        {providerInfo.needsApiKey && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Key className="w-4 h-4 inline mr-1" />
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Enter your ${providerInfo.name} API key`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>
        )}

        {!providerInfo.needsApiKey && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Server className="w-4 h-4 inline mr-1" />
              Endpoint URL
            </label>
            <input
              type="url"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder={providerInfo.defaultEndpoint}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">
              Make sure your local AI service is running
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model Name
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder={providerInfo.defaultModel}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={!apiKey && !endpoint}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isConfigured ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Configured!</span>
            </>
          ) : (
            <>
              <Settings className="w-5 h-5" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
      </div>

      {/* Status */}
      {isConfigured && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 text-sm">
            AI provider configured successfully! You can now use AI processing.
          </span>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-blue-800 text-sm">
            <p className="font-medium mb-1">Need help getting started?</p>
            <ul className="text-xs space-y-1">
              <li>• <strong>OpenAI:</strong> Get your API key from platform.openai.com</li>
              <li>• <strong>Anthropic:</strong> Get your API key from console.anthropic.com</li>
              <li>• <strong>LM Studio:</strong> Download and run LM Studio locally</li>
              <li>• <strong>Ollama:</strong> Install Ollama and run: ollama run mixtral</li>
              <li>• <strong>Gemini:</strong> Get your API key from makersuite.google.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProviderConfig;
