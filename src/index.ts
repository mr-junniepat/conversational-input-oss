// Main component
export { ConversationalInput } from './components/ConversationalInput';
export { Clarifier } from './components/Clarifier';

// Hooks
export { useVoiceRecognition } from './hooks/useVoiceRecognition';
export { useFileUpload } from './hooks/useFileUpload';

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

// Default export
export { ConversationalInput as default } from './components/ConversationalInput';
