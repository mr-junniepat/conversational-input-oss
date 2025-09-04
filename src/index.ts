// Main component
export { ConversationalInput } from './components/ConversationalInput';
export { Clarifier } from './components/Clarifier';
export { AIProviderConfig } from './components/AIProviderConfig';

// Hooks
export { useVoiceRecognition } from './hooks/useVoiceRecognition';
export { useFileUpload } from './hooks/useFileUpload';
export { useAIProcessing } from './hooks/useAIProcessing';

// AI Services
export { AIServiceManager, aiServiceManager } from './services/AIServiceManager';

// Examples
export * from './examples';

// AI Integrations
export * from './ai-integrations';

// Types
export type {
  ConversationalInputProps,
  ClarifierProps,
  VoiceRecognitionHook,
  FileUploadHook,
  ConversationalInputState,
  VoiceButtonRenderProps,
  FileButtonRenderProps,
  SubmitButtonRenderProps,
  ClearButtonRenderProps,
  FileDisplayRenderProps,
  ErrorDisplayRenderProps,
  AIProcessor,
  AIProcessingResult,
  AIProvider,
  FormIntegrationProps,
} from './types';

// AI Service Types
export type { AIProvider as AIServiceProvider, AIResponse, ProcessingOptions } from './services/AIServiceManager';

// Default export
export { ConversationalInput as default } from './components/ConversationalInput';
