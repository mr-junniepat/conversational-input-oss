import React, { useState } from 'react';
import { ConversationalInput } from '../components/ConversationalInput';
import { Clarifier } from '../components/Clarifier';

/**
 * OpenAI Integration Example
 * 
 * This example shows how to integrate ConversationalInput
 * with OpenAI's GPT models for intelligent data extraction and processing.
 */
export const OpenAI: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [clarification, setClarification] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);

  const processWithOpenAI = async (text: string, files?: File[]) => {
    try {
      setIsProcessing(true);
      
      // Simulate OpenAI API call
      const response = await fetch('/api/openai/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          files: files?.map(f => ({ name: f.name, size: f.size, type: f.type })),
          model: 'gpt-4',
          temperature: 0.1
        })
      });

      if (!response.ok) throw new Error('API call failed');
      
      const result = await response.json();
      
      if (result.needsClarification) {
        setClarification(result.clarificationQuestion);
      } else {
        setExtractedData(result.extractedData);
        setClarification(null);
      }
      
    } catch (error) {
      console.error('OpenAI processing error:', error);
      alert('Error processing with OpenAI');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClarify = async (response: string) => {
    try {
      setIsProcessing(true);
      
      // Send clarification response
      const result = await fetch('/api/openai/clarify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response, context: extractedData })
      });
      
      if (!result.ok) throw new Error('Clarification failed');
      
      const clarifiedResult = await result.json();
      setExtractedData(clarifiedResult.extractedData);
      setClarification(null);
      
    } catch (error) {
      console.error('Clarification error:', error);
      alert('Error processing clarification');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">OpenAI Integration</h2>
      <p className="text-gray-600 mb-6">
        Process conversational input with OpenAI GPT models for intelligent data extraction.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ConversationalInput
            onSubmit={processWithOpenAI}
            isSubmitting={isProcessing}
            placeholder="Describe your job experience, skills, and availability..."
            requireFiles={true}
            acceptedFileTypes={['.pdf', '.doc', '.docx']}
            labels={{
              addAttachments: "Upload Resume",
              submit: "Process with AI"
            }}
          />
          
          {clarification && (
            <div className="mt-4">
              <Clarifier
                question={clarification}
                onClarify={handleClarify}
                type="info"
                suggestions={["Yes", "No", "Maybe", "I'll provide more details"]}
                showInput={true}
                inputPlaceholder="Please clarify..."
                dismissible={true}
                onDismiss={() => setClarification(null)}
              />
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Extracted Data</h3>
          {extractedData ? (
            <pre className="bg-white p-3 rounded border text-sm overflow-auto">
              {JSON.stringify(extractedData, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">
              Submit text and files to see AI-extracted data here...
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Features:</h4>
        <ul className="space-y-1">
          <li>✅ OpenAI GPT-4 integration</li>
          <li>✅ Intelligent data extraction</li>
          <li>✅ Clarification system</li>
          <li>✅ File processing</li>
          <li>✅ Structured output</li>
        </ul>
      </div>
    </div>
  );
};

export default OpenAI;
