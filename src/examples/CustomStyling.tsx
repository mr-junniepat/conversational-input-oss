import React from 'react';
import { ConversationalInput } from '../components/ConversationalInput';

/**
 * Custom Styling Example
 * 
 * This example shows how to customize the appearance
 * using the classNames prop and custom CSS.
 */
export const CustomStyling: React.FC = () => {
  const handleSubmit = async (text: string, files?: File[]) => {
    console.log('Custom styled submission:', { text, files });
    alert(`Received: "${text}" and ${files?.length || 0} files`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Custom Styling</h2>
      <p className="text-gray-600 mb-6">
        Customize the appearance using classNames and custom CSS classes.
      </p>
      
      <ConversationalInput
        onSubmit={handleSubmit}
        placeholder="Try our custom styled input..."
        classNames={{
          container: "max-w-full",
          textarea: "h-32 text-lg font-serif bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-200",
          actionBar: "bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-b-lg",
          voiceButton: "bg-purple-600 text-white border-0 hover:bg-purple-700 px-6 py-2 rounded-full",
          fileButton: "bg-blue-600 text-white border-0 hover:bg-blue-700 px-6 py-2 rounded-full",
          submitButton: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 hover:from-green-600 hover:to-emerald-700 px-8 py-2 rounded-full font-semibold",
          clearButton: "bg-red-500 text-white border-0 hover:bg-red-600 px-4 py-2 rounded-full",
          fileDisplay: "bg-white/80 backdrop-blur-sm border border-purple-200 rounded-lg p-2",
          errorDisplay: "bg-red-100 border border-red-300 text-red-800 rounded-lg p-3"
        }}
      />
      
      <div className="mt-4 text-sm text-gray-500">
        <p>✅ Custom container styling</p>
        <p>✅ Gradient backgrounds</p>
        <p>✅ Custom button colors</p>
        <p>✅ Enhanced textarea appearance</p>
        <p>✅ Custom file display styling</p>
      </div>
    </div>
  );
};

export default CustomStyling;
