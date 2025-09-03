import React, { useState, useCallback } from 'react';
import { Mic, Upload, Loader2, XCircle, FileText } from 'lucide-react';
import { ConversationalInputProps } from '../types';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useFileUpload } from '../hooks/useFileUpload';

export const ConversationalInput: React.FC<ConversationalInputProps> = ({
  onSubmit,
  placeholder = "Start typing or speaking naturally...",
  requireFiles = false,
  acceptedFileTypes = ['.pdf', '.doc', '.docx', '.txt'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  className = "",
  showClearButton = true,
  labels = {},
  enableVoice = true,
  enableFileUpload = true,
  validateInput,
  isSubmitting = false,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const {
    isListening,
    isSupported: voiceSupported,
    startListening,
    stopListening,
    transcript,
    resetTranscript,
  } = useVoiceRecognition();

  const {
    files,
    addFiles,
    removeFile: removeFileFromHook,
    clearFiles,
    validateFile,
  } = useFileUpload(acceptedFileTypes, maxFileSize);

  // Merge voice transcript with typed text
  const displayText = text + (isListening ? transcript : '');

  const toggleMic = useCallback(() => {
    if (!voiceSupported) {
      setError('Voice input is not supported in this browser');
      return;
    }

    if (isListening) {
      stopListening();
      // Add the transcript to the main text
      setText(prev => prev + transcript);
      resetTranscript();
    } else {
      startListening();
    }
  }, [isListening, voiceSupported, startListening, stopListening, transcript, resetTranscript]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      addFiles(selectedFiles);
    }
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  }, [addFiles]);

  const handleSubmit = useCallback(async () => {
    if (!displayText.trim()) {
      setError('Please enter some text before submitting');
      return;
    }

    if (requireFiles && files.length === 0) {
      setError('Please upload at least one file before submitting');
      return;
    }

    if (validateInput) {
      const validationError = validateInput(displayText);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setError(null);
    
    try {
      await onSubmit(displayText, files);
      // Clear form after successful submission
      setText('');
      clearFiles();
      resetTranscript();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    }
  }, [displayText, files, requireFiles, validateInput, onSubmit, clearFiles, resetTranscript]);

  const clearText = useCallback(() => {
    setText('');
    resetTranscript();
    setError(null);
  }, [resetTranscript]);

  const handleRemoveFile = useCallback((index: number) => {
    removeFileFromHook(index);
  }, [removeFileFromHook]);

  const defaultLabels = {
    submit: 'Submit',
    clear: 'Clear text',
    addAttachments: 'add attachments',
    useVoice: 'use voice',
    listening: 'Listening...',
    cvReady: 'File Ready ✓',
  };

  const finalLabels = { ...defaultLabels, ...labels };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* Main Input Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Text Input Area */}
        <div className="relative">
          <textarea
            className={`w-full h-[40vh] p-6 text-xl resize-none text-gray-900 placeholder-gray-500 border-none focus:outline-none ${
              isListening ? 'bg-green-50' : 'bg-white'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder={placeholder}
            value={displayText}
            onChange={e => setText(e.target.value)}
            disabled={disabled || isSubmitting}
          />
          
          {/* Listening indicator */}
          {isListening && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {finalLabels.listening}
            </div>
          )}
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-200"></div>

        {/* Action Bar */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Add Attachments Button */}
            {enableFileUpload && (
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  id="file-upload" 
                  accept={acceptedFileTypes.join(',')} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  multiple
                  disabled={disabled || isSubmitting}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium ${
                    disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  {finalLabels.addAttachments}
                </label>
              </div>
            )}

            {/* Use Voice Button */}
            {enableVoice && voiceSupported && (
              <button
                onClick={toggleMic}
                disabled={disabled || isSubmitting}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium ${
                  isListening ? 'border-green-300 bg-green-50 text-green-700' : ''
                } ${disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-pressed={isListening}
              >
                <Mic className="w-4 h-4" />
                {finalLabels.useVoice}
              </button>
            )}
          </div>

          {/* Action Buttons (Clear and Submit) */}
          <div className="flex items-center gap-3">
            {/* Clear Text Button - Only show when there's text */}
            {showClearButton && displayText && (
              <button
                onClick={clearText}
                disabled={disabled || isSubmitting}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {finalLabels.clear}
              </button>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!displayText.trim() || (requireFiles && files.length === 0) || isSubmitting || disabled}
              className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                  Processing...
                </>
              ) : (
                finalLabels.submit
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Files Display */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-green-300 bg-green-50 text-green-700">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="ml-2 p-1 text-green-600 hover:text-green-800 transition-colors"
                disabled={disabled || isSubmitting}
              >
                <XCircle className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Voice Not Supported Warning */}
      {enableVoice && !voiceSupported && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-700 text-sm">
          Voice input is not supported in this browser. Please use text input instead.
        </div>
      )}
    </div>
  );
};

export default ConversationalInput;
