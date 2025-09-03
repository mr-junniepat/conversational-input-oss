// Main component
export { ConversationalInput } from './components/ConversationalInput';

// Hooks
export { useVoiceRecognition } from './hooks/useVoiceRecognition';
export { useFileUpload } from './hooks/useFileUpload';

// Types
export type {
  ConversationalInputProps,
  VoiceRecognitionHook,
  FileUploadHook,
  ConversationalInputState,
} from './types';

// Default export
export { ConversationalInput as default } from './components/ConversationalInput';
