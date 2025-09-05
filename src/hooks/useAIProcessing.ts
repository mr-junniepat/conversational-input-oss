import React, { useState, useCallback } from 'react';
import { aiServiceManager, AIProvider, ProcessingOptions, AIResponse } from '../services/AIServiceManager';

export interface UseAIProcessingOptions {
  provider: string;
  apiKey?: string;
  endpoint?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  extractStructuredData?: boolean;
  schema?: Record<string, any>;
  clarificationMode?: boolean;
  language?: string;
  systemPrompt?: string;
  userPromptTemplate?: string;
  customPromptBuilder?: (text: string, files?: File[], options?: ProcessingOptions) => {
    systemPrompt: string;
    userPrompt: string;
  };
  onAIStart?: () => void;
  onAIResponse?: (response: any) => void;
  onAIError?: (error: string) => void;
}

export interface UseAIProcessingReturn {
  processText: (text: string, files?: File[]) => Promise<AIResponse>;
  isProcessing: boolean;
  lastResponse: AIResponse | null;
  error: string | null;
  configureProvider: (config: Partial<AIProvider>) => void;
  isConfigured: boolean;
  availableProviders: string[];
}

export function useAIProcessing(options: UseAIProcessingOptions): UseAIProcessingReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Configure the provider when options change
  const configureProvider = useCallback((config: Partial<AIProvider>) => {
    aiServiceManager.configureProvider(options.provider, {
      ...config,
      apiKey: options.apiKey,
      endpoint: options.endpoint,
      model: options.model,
      maxTokens: options.maxTokens,
      temperature: options.temperature
    });
  }, [options.provider, options.apiKey, options.endpoint, options.model, options.maxTokens, options.temperature]);

  // Auto-configure provider when options change
  React.useEffect(() => {
    if (options.provider && (options.apiKey || options.endpoint)) {
      configureProvider({});
    }
  }, [options.provider, options.apiKey, options.endpoint, options.model, configureProvider]);

  // Check if provider is configured
  const isConfigured = aiServiceManager.isProviderConfigured(options.provider);

  // Get available providers
  const availableProviders = aiServiceManager.getAvailableProviders();

  // Process text with AI
  const processText = useCallback(async (text: string, files?: File[]): Promise<AIResponse> => {
    setIsProcessing(true);
    setError(null);

    try {
      // Configure provider if not already configured
      if (!isConfigured) {
        configureProvider({});
      }

      // Call onAIStart callback if provided
      if (options.onAIStart) {
        options.onAIStart();
      }

      const processingOptions: ProcessingOptions = {
        extractStructuredData: options.extractStructuredData,
        schema: options.schema,
        clarificationMode: options.clarificationMode,
        language: options.language,
        systemPrompt: options.systemPrompt,
        userPromptTemplate: options.userPromptTemplate,
        customPromptBuilder: options.customPromptBuilder
      };

      const response = await aiServiceManager.processText(
        options.provider,
        text,
        files,
        processingOptions
      );

      setLastResponse(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      const errorResponse: AIResponse = {
        success: false,
        error: errorMessage
      };
      setLastResponse(errorResponse);
      return errorResponse;
    } finally {
      setIsProcessing(false);
    }
  }, [options, isConfigured, configureProvider]);

  return {
    processText,
    isProcessing,
    lastResponse,
    error,
    configureProvider,
    isConfigured,
    availableProviders
  };
}
