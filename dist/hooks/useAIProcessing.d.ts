import { AIProvider, AIResponse } from '../services/AIServiceManager';
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
export declare function useAIProcessing(options: UseAIProcessingOptions): UseAIProcessingReturn;
//# sourceMappingURL=useAIProcessing.d.ts.map