export interface AIProvider {
    name: string;
    apiKey?: string;
    endpoint?: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
}
export interface AIResponse {
    success: boolean;
    data?: any;
    error?: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}
export interface ProcessingOptions {
    extractStructuredData?: boolean;
    schema?: Record<string, any>;
    clarificationMode?: boolean;
    language?: string;
}
export declare class AIServiceManager {
    private providers;
    constructor();
    private initializeDefaultProviders;
    /**
     * Configure a provider with API key or endpoint
     */
    configureProvider(providerId: string, config: Partial<AIProvider>): void;
    /**
     * Get available providers
     */
    getAvailableProviders(): string[];
    /**
     * Check if a provider is properly configured
     */
    isProviderConfigured(providerId: string): boolean;
    /**
     * Process text with the specified AI provider
     */
    processText(providerId: string, text: string, files?: File[], options?: ProcessingOptions): Promise<AIResponse>;
    private processWithOpenAI;
    private processWithAnthropic;
    private processWithLMStudio;
    private processWithOllama;
    private processWithGemini;
    private buildPrompt;
    private getSystemPrompt;
    private parseAIResponse;
}
export declare const aiServiceManager: AIServiceManager;
//# sourceMappingURL=AIServiceManager.d.ts.map