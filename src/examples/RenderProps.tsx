import React from 'react';
import { ConversationalInput } from '../components/ConversationalInput';

/**
 * Render Props Example
 * 
 * This example shows how to use render props for complete
 * customization of button appearance and behavior.
 */
export const RenderProps: React.FC = () => {
  const handleSubmit = async (text: string, files?: File[]) => {
    console.log('Render props submission:', { text, files });
    alert(`Received: "${text}" and ${files?.length || 0} files`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Render Props</h2>
      <p className="text-gray-600 mb-6">
        Complete customization using render props for maximum flexibility.
      </p>
      
      <ConversationalInput
        onSubmit={handleSubmit}
        placeholder="Try our completely custom rendered interface..."
        render={{
          voiceButton: ({ isListening, onClick, disabled, className }) => (
            <button
              onClick={onClick}
              disabled={disabled}
              className={`${className} ${isListening ? 'animate-pulse bg-red-500' : 'bg-blue-500'} text-white px-6 py-2 rounded-full font-bold transition-all duration-300`}
            >
              {isListening ? '🔴 Recording...' : '🎤 Start Voice'}
            </button>
          ),
          
          fileButton: ({ onClick, disabled, className, acceptedTypes }) => (
            <button
              onClick={onClick}
              disabled={disabled}
              className={`${className} bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition-colors`}
            >
              📎 Add Files ({acceptedTypes.join(', ')})
            </button>
          ),
          
          submitButton: ({ onClick, disabled, isSubmitting, text, className }) => (
            <button
              onClick={onClick}
              disabled={disabled}
              className={`${className} bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105`}
            >
              {isSubmitting ? '⏳ Processing...' : `🚀 ${text}`}
            </button>
          ),
          
          clearButton: ({ onClick, disabled, className }) => (
            <button
              onClick={onClick}
              disabled={disabled}
              className={`${className} bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors`}
            >
              🗑️ Clear
            </button>
          ),
          
          fileDisplay: ({ files, onRemove, disabled, className }) => (
            <div className={`${className} space-y-2`}>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600">📄</span>
                    <span className="font-medium">{file.name}</span>
                    <span className="text-sm text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    onClick={() => onRemove(index)}
                    disabled={disabled}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          ),
          
          errorDisplay: ({ error, className }) => (
            <div className={`${className} bg-red-100 border border-red-300 text-red-800 rounded-lg p-3 flex items-center space-x-2`}>
              <span className="text-red-600">⚠️</span>
              <span>{error}</span>
            </div>
          )
        }}
      />
      
      <div className="mt-4 text-sm text-gray-500">
        <p>✅ Custom voice button with recording state</p>
        <p>✅ Custom file button with accepted types</p>
        <p>✅ Custom submit button with loading state</p>
        <p>✅ Custom clear button styling</p>
        <p>✅ Enhanced file display with file info</p>
        <p>✅ Custom error display with icon</p>
      </div>
    </div>
  );
};

export default RenderProps;
