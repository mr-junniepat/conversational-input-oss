import React from 'react';
import { ConversationalInput } from '../components/ConversationalInput';

/**
 * Basic Usage Example
 * 
 * This example shows the simplest way to use ConversationalInput
 * with default settings and basic functionality.
 */
export const BasicUsage: React.FC = () => {
  const handleSubmit = async (text: string, files?: File[]) => {
    console.log('Basic submission:', { text, files });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert(`Received: "${text}" and ${files?.length || 0} files`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
      <p className="text-gray-600 mb-6">
        Simple conversational input with voice, file upload, and submit functionality.
      </p>
      
      <ConversationalInput
        onSubmit={handleSubmit}
        placeholder="Tell me about your experience..."
      />
      
      <div className="mt-4 text-sm text-gray-500">
        <p>✅ Voice input enabled</p>
        <p>✅ File upload enabled</p>
        <p>✅ Submit button enabled</p>
        <p>✅ Clear text button enabled</p>
      </div>
    </div>
  );
};

export default BasicUsage;
