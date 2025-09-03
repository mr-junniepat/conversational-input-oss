import React from 'react';

interface ConversationalInputProps {
    /** Callback function called when form is submitted */
    onSubmit: (text: string, files?: File[]) => Promise<void> | void;
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

declare const ConversationalInput: React.FC<ConversationalInputProps>;

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
declare function useVoiceRecognition(): VoiceRecognitionHook;

declare function useFileUpload(acceptedTypes?: string[], maxSize?: number): FileUploadHook;

export { ConversationalInput, ConversationalInputProps, ConversationalInputState, FileUploadHook, VoiceRecognitionHook, ConversationalInput as default, useFileUpload, useVoiceRecognition };
