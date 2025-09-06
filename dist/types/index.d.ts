export interface ConversationalInputProps {
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
        /** Custom system prompt to override the default */
        systemPrompt?: string;
        /** Custom user prompt template (use {text} and {files} as placeholders) */
        userPromptTemplate?: string;
        /** Custom prompt builder function for advanced customization */
        customPromptBuilder?: (text: string, files?: File[], options?: any) => {
            systemPrompt: string;
            userPrompt: string;
        };
        /** Callback when AI processing starts */
        onAIStart?: () => void;
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
export interface VoiceRecognitionHook {
    isListening: boolean;
    isSupported: boolean;
    startListening: () => void;
    stopListening: () => void;
    transcript: string;
    error: string | null;
    resetTranscript: () => void;
}
export interface FileUploadHook {
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
export interface ConversationalInputState {
    text: string;
    files: File[];
    isListening: boolean;
    isSubmitting: boolean;
    error: string | null;
}
export interface VoiceButtonRenderProps {
    isListening: boolean;
    isSupported: boolean;
    onClick: () => void;
    disabled: boolean;
    className: string;
}
export interface FileButtonRenderProps {
    onClick: () => void;
    disabled: boolean;
    className: string;
    acceptedTypes: string[];
}
export interface SubmitButtonRenderProps {
    onClick: () => void;
    disabled: boolean;
    className: string;
    style?: React.CSSProperties;
    isSubmitting: boolean;
    text: string;
}
export interface ClearButtonRenderProps {
    onClick: () => void;
    disabled: boolean;
    className: string;
}
export interface FileDisplayRenderProps {
    files: File[];
    onRemove: (index: number) => void;
    disabled: boolean;
    className: string;
}
export interface ErrorDisplayRenderProps {
    error: string;
    className: string;
}
export interface AIProcessor {
    process: (text: string, files?: File[]) => Promise<AIProcessingResult>;
    validate?: (text: string) => boolean;
}
export interface AIProcessingResult {
    success: boolean;
    data?: any;
    error?: string;
    extractedFields?: Record<string, any>;
    confidence?: number;
    suggestions?: string[];
}
export interface AIProvider {
    name: string;
    apiKey?: string;
    endpoint?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
}
export interface FormIntegrationProps {
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
export interface ClarifierProps {
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
//# sourceMappingURL=index.d.ts.map