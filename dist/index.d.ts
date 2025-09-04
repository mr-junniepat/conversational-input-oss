import React$1 from 'react';

interface ConversationalInputProps {
    /** Callback function called when form is submitted */
    onSubmit: (text: string, files?: File[]) => Promise<void> | void;
    /** AI Processing Configuration */
    aiProcessing?: {
        /** AI Provider to use (openai, anthropic, lmstudio, ollama, gemini) */
        provider: string;
        /** API Key for the provider */
        apiKey?: string;
        /** Custom endpoint for local providers */
        endpoint?: string;
        /** Model to use */
        model?: string;
        /** Maximum tokens for response */
        maxTokens?: number;
        /** Temperature for response generation */
        temperature?: number;
        /** Whether to extract structured data */
        extractStructuredData?: boolean;
        /** Schema for structured data extraction */
        schema?: Record<string, any>;
        /** Whether to enable clarification mode */
        clarificationMode?: boolean;
        /** Language for responses */
        language?: string;
        /** Callback when AI processing is complete */
        onAIResponse?: (response: any) => void;
        /** Callback when AI processing fails */
        onAIError?: (error: string) => void;
    };
    /** Placeholder text for the input area */
    placeholder?: string;
    /** Whether file upload is required before submission */
    requireFiles?: boolean;
    /** Accepted file types for upload */
    acceptedFileTypes?: string[];
    /** Maximum file size in bytes */
    maxFileSize?: number;
    /** Custom styling for the component */
    className?: string;
    /** Whether to show the clear text button */
    showClearButton?: boolean;
    /** Custom labels for buttons */
    labels?: {
        submit?: string;
        clear?: string;
        addAttachments?: string;
        useVoice?: string;
        listening?: string;
        cvReady?: string;
    };
    /** Whether to enable voice input */
    enableVoice?: boolean;
    /** Whether to enable file upload */
    enableFileUpload?: boolean;
    /** Whether to show the submit button */
    showSubmitButton?: boolean;
    /** Custom submit trigger (e.g., for integration with forms) */
    submitTrigger?: 'button' | 'enter' | 'both' | 'none';
    /** Whether to clear text after submission */
    clearAfterSubmit?: boolean;
    /** Initial text value */
    initialValue?: string;
    /** Controlled text value */
    value?: string;
    /** Callback when text changes */
    onTextChange?: (text: string) => void;
    /** Callback when files change */
    onFilesChange?: (files: File[]) => void;
    /** Whether to auto-submit on Enter key */
    autoSubmitOnEnter?: boolean;
    /** Custom CSS classes for different parts */
    classNames?: {
        container?: string;
        textarea?: string;
        actionBar?: string;
        voiceButton?: string;
        fileButton?: string;
        submitButton?: string;
        clearButton?: string;
        fileDisplay?: string;
        errorDisplay?: string;
    };
    /** Custom render functions for different parts */
    render?: {
        voiceButton?: (props: VoiceButtonRenderProps) => React.ReactNode;
        fileButton?: (props: FileButtonRenderProps) => React.ReactNode;
        submitButton?: (props: SubmitButtonRenderProps) => React.ReactNode;
        clearButton?: (props: ClearButtonRenderProps) => React.ReactNode;
        fileDisplay?: (props: FileDisplayRenderProps) => React.ReactNode;
        errorDisplay?: (props: ErrorDisplayRenderProps) => React.ReactNode;
    };
    /** Custom validation function */
    validateInput?: (text: string) => string | null;
    /** Loading state for submit button */
    isSubmitting?: boolean;
    /** Disable the entire component */
    disabled?: boolean;
}
interface VoiceRecognitionHook {
    isListening: boolean;
    isSupported: boolean;
    startListening: () => void;
    stopListening: () => void;
    transcript: string;
    error: string | null;
    resetTranscript: () => void;
}
interface FileUploadHook {
    files: File[];
    addFiles: (files: FileList | File[]) => void;
    removeFile: (index: number) => void;
    clearFiles: () => void;
    isUploading: boolean;
    uploadProgress: number;
    validateFile: (file: File) => string | null;
    updateUploadProgress: (progress: number) => void;
    startUpload: () => void;
    finishUpload: () => void;
}
interface ConversationalInputState {
    text: string;
    files: File[];
    isListening: boolean;
    isSubmitting: boolean;
    error: string | null;
}
interface VoiceButtonRenderProps {
    isListening: boolean;
    isSupported: boolean;
    onClick: () => void;
    disabled: boolean;
    className: string;
}
interface FileButtonRenderProps {
    onClick: () => void;
    disabled: boolean;
    className: string;
    acceptedTypes: string[];
}
interface SubmitButtonRenderProps {
    onClick: () => void;
    disabled: boolean;
    className: string;
    isSubmitting: boolean;
    text: string;
}
interface ClearButtonRenderProps {
    onClick: () => void;
    disabled: boolean;
    className: string;
}
interface FileDisplayRenderProps {
    files: File[];
    onRemove: (index: number) => void;
    disabled: boolean;
    className: string;
}
interface ErrorDisplayRenderProps {
    error: string;
    className: string;
}
interface AIProcessor {
    process: (text: string, files?: File[]) => Promise<AIProcessingResult>;
    validate?: (text: string) => boolean;
}
interface AIProcessingResult {
    success: boolean;
    data?: any;
    error?: string;
    extractedFields?: Record<string, any>;
    confidence?: number;
    suggestions?: string[];
}
interface AIProvider$1 {
    name: string;
    apiKey?: string;
    endpoint?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
}
interface FormIntegrationProps {
    /** Form field name for the text input */
    name: string;
    /** Form field name for files */
    fileFieldName?: string;
    /** Whether this is part of a larger form */
    isFormField?: boolean;
    /** Form validation rules */
    formValidation?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        custom?: (value: string) => string | null;
    };
    /** Form submission handling */
    onFormSubmit?: (formData: FormData) => void;
    /** Form change handling */
    onFormChange?: (fieldName: string, value: any) => void;
}
interface ClarifierProps$1 {
    /** The question or clarification needed */
    question: string;
    /** Type of clarification */
    type?: 'info' | 'warning' | 'error' | 'success';
    /** Whether to show the clarifier */
    show?: boolean;
    /** Callback when user provides clarification */
    onClarify?: (response: string) => void;
    /** Suggested responses or options */
    suggestions?: string[];
    /** Whether to show input field */
    showInput?: boolean;
    /** Placeholder for input field */
    inputPlaceholder?: string;
    /** Custom styling */
    className?: string;
    /** Whether the clarifier is dismissible */
    dismissible?: boolean;
    /** Callback when dismissed */
    onDismiss?: () => void;
}

declare const ConversationalInput: React$1.FC<ConversationalInputProps>;

interface ClarifierProps {
    /** The question or clarification needed */
    question: string;
    /** Type of clarification */
    type?: 'info' | 'warning' | 'error' | 'success';
    /** Whether to show the clarifier */
    show?: boolean;
    /** Callback when user provides clarification */
    onClarify?: (response: string) => void;
    /** Suggested responses or options */
    suggestions?: string[];
    /** Whether to show input field */
    showInput?: boolean;
    /** Placeholder for input field */
    inputPlaceholder?: string;
    /** Custom styling */
    className?: string;
    /** Whether the clarifier is dismissible */
    dismissible?: boolean;
    /** Callback when dismissed */
    onDismiss?: () => void;
}
declare const Clarifier: React$1.FC<ClarifierProps>;

interface AIProviderConfigProps {
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
declare const AIProviderConfig: React$1.FC<AIProviderConfigProps>;

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
declare function useVoiceRecognition(): VoiceRecognitionHook;

declare function useFileUpload(acceptedTypes?: string[], maxSize?: number): FileUploadHook;

interface AIProvider {
    name: string;
    apiKey?: string;
    endpoint?: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
}
interface AIResponse {
    success: boolean;
    data?: any;
    error?: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}
interface ProcessingOptions {
    extractStructuredData?: boolean;
    schema?: Record<string, any>;
    clarificationMode?: boolean;
    language?: string;
}
declare class AIServiceManager {
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
declare const aiServiceManager: AIServiceManager;

interface UseAIProcessingOptions {
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
interface UseAIProcessingReturn {
    processText: (text: string, files?: File[]) => Promise<AIResponse>;
    isProcessing: boolean;
    lastResponse: AIResponse | null;
    error: string | null;
    configureProvider: (config: Partial<AIProvider>) => void;
    isConfigured: boolean;
    availableProviders: string[];
}
declare function useAIProcessing(options: UseAIProcessingOptions): UseAIProcessingReturn;

/**
 * Basic Usage Example
 *
 * This example shows the simplest way to use ConversationalInput
 * with default settings and basic functionality.
 */
declare const BasicUsage: React$1.FC;

/**
 * Form Integration Example
 *
 * This example shows how to integrate ConversationalInput
 * into a larger form without using its submit functionality.
 */
declare const FormIntegration: React$1.FC;

/**
 * Custom Styling Example
 *
 * This example shows how to customize the appearance
 * using the classNames prop and custom CSS.
 */
declare const CustomStyling: React$1.FC;

/**
 * Render Props Example
 *
 * This example shows how to use render props for complete
 * customization of button appearance and behavior.
 */
declare const RenderProps: React$1.FC;

declare const AIIntegrationExample: React$1.FC;

/**
 * OpenAI Integration Example
 *
 * This example shows how to integrate ConversationalInput
 * with OpenAI's GPT models for intelligent data extraction and processing.
 */
declare const OpenAI: React$1.FC;

/**
 * Local LLM Integration Example
 *
 * This example shows how to integrate ConversationalInput
 * with local LLMs like Ollama or LM Studio for privacy-focused, offline processing.
 */
declare const LocalLLM: React$1.FC;

export { AIIntegrationExample, AIProcessingResult, AIProcessor, AIProvider$1 as AIProvider, AIProviderConfig, AIResponse, AIServiceManager, AIProvider as AIServiceProvider, BasicUsage, BasicUsage as BasicUsageExample, Clarifier, ClarifierProps$1 as ClarifierProps, ClearButtonRenderProps, ConversationalInput, ConversationalInputProps, ConversationalInputState, CustomStyling, CustomStyling as CustomStylingExample, ErrorDisplayRenderProps, FileButtonRenderProps, FileDisplayRenderProps, FileUploadHook, FormIntegration, FormIntegration as FormIntegrationExample, FormIntegrationProps, LocalLLM, LocalLLM as LocalLLMExample, OpenAI, OpenAI as OpenAIExample, ProcessingOptions, RenderProps, RenderProps as RenderPropsExample, SubmitButtonRenderProps, VoiceButtonRenderProps, VoiceRecognitionHook, aiServiceManager, ConversationalInput as default, useAIProcessing, useFileUpload, useVoiceRecognition };
