import React, { useState } from 'react';
import { ConversationalInput } from '../components/ConversationalInput';

/**
 * Form Integration Example
 * 
 * This example shows how to integrate ConversationalInput
 * into a larger form without using its submit functionality.
 */
export const FormIntegration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    files: [] as File[]
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(`Form submitted with: ${formData.description} and ${formData.files.length} files`);
  };

  const handleTextChange = (text: string) => {
    setFormData(prev => ({ ...prev, description: text }));
  };

  const handleFilesChange = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Form Integration</h2>
      <p className="text-gray-600 mb-6">
        ConversationalInput embedded in a larger form, letting the form handle submission.
      </p>
      
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Conversational Input)
          </label>
          <ConversationalInput
            onSubmit={() => {}} // Form handles submission
            showSubmitButton={false} // No submit button needed
            submitTrigger="none" // Disable auto-submit
            onTextChange={handleTextChange}
            onFilesChange={handleFilesChange}
            placeholder="Describe your needs naturally..."
            className="border border-gray-300 rounded-md"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Form
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>✅ Embedded in larger form</p>
        <p>✅ No submit button (form handles submission)</p>
        <p>✅ Controlled text and files</p>
        <p>✅ Form validation works</p>
      </div>
    </div>
  );
};

export default FormIntegration;
