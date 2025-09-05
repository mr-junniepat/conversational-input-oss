import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Mic, Upload, Loader2, XCircle, FileText } from 'lucide-react';
import { ConversationalInputProps } from '../types';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useFileUpload } from '../hooks/useFileUpload';
import { useAIProcessing } from '../hooks/useAIProcessing';

export const ConversationalInput: React.FC<ConversationalInputProps> = ({
  onSubmit,
  aiProcessing,
  placeholder = "Start typing or speaking naturally...",
  requireFiles = false,
  acceptedFileTypes = ['.pdf', '.doc', '.docx', '.txt'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  className = "",
  showClearButton = true,
  labels = {},
  enableVoice = true,
  enableFileUpload = true,
  showSubmitButton = true,
  validateInput,
  isSubmitting = false,
  disabled = false,
  initialValue = "",
  value: controlledValue,
  onTextChange,
  onFilesChange,
  autoSubmitOnEnter = false,
  submitTrigger = 'both',
  clearAfterSubmit = true,
  classNames = {},
  render,
}) => {
  const [text, setText] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // AI Processing hook
  const aiProcessingHook = useAIProcessing({
    provider: aiProcessing?.provider || 'openai',
    apiKey: aiProcessing?.apiKey,
    endpoint: aiProcessing?.endpoint,
    model: aiProcessing?.model,
    maxTokens: aiProcessing?.maxTokens,
    temperature: aiProcessing?.temperature,
    extractStructuredData: aiProcessing?.extractStructuredData,
    schema: aiProcessing?.schema,
    clarificationMode: aiProcessing?.clarificationMode,
    language: aiProcessing?.language,
    systemPrompt: aiProcessing?.systemPrompt,
    userPromptTemplate: aiProcessing?.userPromptTemplate,
    customPromptBuilder: aiProcessing?.customPromptBuilder,
    onAIStart: aiProcessing?.onAIStart,
    onAIResponse: aiProcessing?.onAIResponse,
    onAIError: aiProcessing?.onAIError
  });

  // Use controlled value if provided
  const displayText = controlledValue !== undefined ? controlledValue : text;

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
  const fullText = displayText + (isListening ? transcript : '');

  // Handle text changes
  const handleTextChange = useCallback((newText: string) => {
    if (controlledValue === undefined) {
      setText(newText);
    }
    onTextChange?.(newText);
  }, [controlledValue, onTextChange]);

  // Handle file changes
  const handleFilesChange = useCallback((newFiles: File[]) => {
    onFilesChange?.(newFiles);
  }, [onFilesChange]);

  // Update files when they change
  useEffect(() => {
    handleFilesChange(files);
  }, [files, handleFilesChange]);

  const toggleMic = useCallback(() => {
    if (!voiceSupported) {
      setError('Voice input is not supported in this browser');
      return;
    }

    if (isListening) {
      stopListening();
      // Add the transcript to the main text
      const newText = displayText + transcript;
      handleTextChange(newText);
      resetTranscript();
    } else {
      startListening();
    }
  }, [isListening, voiceSupported, startListening, stopListening, transcript, resetTranscript, displayText, handleTextChange]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      addFiles(selectedFiles);
    }
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  }, [addFiles]);

  const handleSubmit = useCallback(async () => {
    if (!fullText.trim()) {
      setError('Please enter some text before submitting');
      return;
    }

    if (requireFiles && files.length === 0) {
      setError('Please upload at least one file before submitting');
      return;
    }

    if (validateInput) {
      const validationError = validateInput(fullText);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setError(null);
    
    try {
      // If AI processing is configured, process the text first
      if (aiProcessing && aiProcessingHook.isConfigured) {
        const aiResponse = await aiProcessingHook.processText(fullText, files);
        
        if (aiResponse.success) {
          // Call the AI response callback if provided
          if (aiProcessing.onAIResponse) {
            aiProcessing.onAIResponse(aiResponse.data);
          }
        } else {
          // Call the AI error callback if provided
          if (aiProcessing.onAIError) {
            aiProcessing.onAIError(aiResponse.error || 'AI processing failed');
          }
          setError(aiResponse.error || 'AI processing failed');
          return;
        }
      }
      
      await onSubmit(fullText, files);
      // Clear form after successful submission if enabled
      if (clearAfterSubmit) {
        if (controlledValue === undefined) {
          setText('');
        }
        clearFiles();
        resetTranscript();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    }
  }, [fullText, files, requireFiles, validateInput, onSubmit, clearAfterSubmit, controlledValue, clearFiles, resetTranscript, aiProcessing, aiProcessingHook]);

  const clearText = useCallback(() => {
    if (controlledValue === undefined) {
      setText('');
    }
    resetTranscript();
    setError(null);
  }, [controlledValue, resetTranscript]);

  const handleRemoveFile = useCallback((index: number) => {
    removeFileFromHook(index);
  }, [removeFileFromHook]);

  // Handle Enter key for auto-submit
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      if (submitTrigger === 'enter' || submitTrigger === 'both') {
        handleSubmit();
      }
    }
  }, [handleSubmit, submitTrigger]);

  const defaultLabels = {
    submit: 'Submit',
    clear: 'Clear text',
    addAttachments: 'add attachments',
    useVoice: 'use voice',
    listening: 'Listening...',
    cvReady: 'File Ready ✓',
  };

  const finalLabels = { ...defaultLabels, ...labels };

  // Determine if submit should be disabled
  const isSubmitDisabled = !fullText.trim() || 
    (requireFiles && files.length === 0) || 
    isSubmitting || 
    disabled ||
    submitTrigger === 'none';

  // Render custom components if provided
  const renderVoiceButton = () => {
    if (!enableVoice || !voiceSupported) return null;
    
    if (render?.voiceButton) {
      return render.voiceButton({
        isListening,
        isSupported: voiceSupported,
        onClick: toggleMic,
        disabled: disabled || isSubmitting,
        className: classNames.voiceButton || "flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
      });
    }

    return (
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
    );
  };

  const renderFileButton = () => {
    if (!enableFileUpload) return null;
    
    if (render?.fileButton) {
      return render.fileButton({
        onClick: () => (textareaRef.current?.querySelector('input[type="file"]') as HTMLInputElement)?.click(),
        disabled: disabled || isSubmitting,
        className: classNames.fileButton || "cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium",
        acceptedTypes: acceptedFileTypes
      });
    }

    return (
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
    );
  };

  const renderSubmitButton = () => {
    if (!showSubmitButton) return null;
    
    if (render?.submitButton) {
      return render.submitButton({
        onClick: handleSubmit,
        disabled: isSubmitDisabled,
        className: classNames.submitButton || "px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed",
        isSubmitting,
        text: finalLabels.submit
      });
    }

    return (
      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
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
    );
  };

  const renderClearButton = () => {
    if (!showClearButton || !fullText) return null;
    
    if (render?.clearButton) {
      return render.clearButton({
        onClick: clearText,
        disabled: disabled || isSubmitting,
        className: classNames.clearButton || "px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
      });
    }

    return (
      <button
        onClick={clearText}
        disabled={disabled || isSubmitting}
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
      >
        {finalLabels.clear}
      </button>
    );
  };

  const renderFileDisplay = () => {
    if (files.length === 0) return null;
    
    if (render?.fileDisplay) {
      return render.fileDisplay({
        files,
        onRemove: handleRemoveFile,
        disabled: disabled || isSubmitting,
        className: classNames.fileDisplay || "mt-4 space-y-2"
      });
    }

    return (
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
    );
  };

  const renderErrorDisplay = () => {
    if (!error) return null;
    
    if (render?.errorDisplay) {
      return render.errorDisplay({
        error,
        className: classNames.errorDisplay || "mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm"
      });
    }

    return (
      <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
        {error}
      </div>
    );
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className || ''} ${classNames.container || ''}`}>
      {/* Main Input Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Text Input Area */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            className={`w-full h-[40vh] p-6 text-xl resize-none text-gray-900 placeholder-gray-500 border-none focus:outline-none ${
              isListening ? 'bg-green-50' : 'bg-white'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${classNames.textarea || ''}`}
            placeholder={placeholder}
            value={fullText}
            onChange={e => handleTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
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

        {/* Action Bar - Only show if there are actions to display */}
        {(enableVoice || enableFileUpload || showSubmitButton || (showClearButton && fullText)) && (
          <>
            <div className="border-t border-gray-200"></div>
            <div className={`p-4 flex items-center justify-between ${classNames.actionBar || ''}`}>
              <div className="flex items-center gap-3">
                {renderFileButton()}
                {renderVoiceButton()}
              </div>

              {/* Action Buttons (Clear and Submit) */}
              <div className="flex items-center gap-3">
                {renderClearButton()}
                {renderSubmitButton()}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Error Display */}
      {renderErrorDisplay()}

      {/* Files Display */}
      {renderFileDisplay()}

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
