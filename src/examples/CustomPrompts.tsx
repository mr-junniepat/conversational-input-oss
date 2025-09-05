import React, { useState } from 'react';
import { ConversationalInput } from '../components/ConversationalInput';

/**
 * Example demonstrating custom prompt customization
 */
export const CustomPromptsExample: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Example 1: Custom System Prompt
  const customSystemPromptExample = {
    provider: 'openai',
    apiKey: 'your-openai-api-key',
    model: 'gpt-3.5-turbo',
    systemPrompt: `You are a professional HR assistant specializing in candidate evaluation. 
    Your role is to analyze job applications and provide structured feedback.
    
    Guidelines:
    - Be professional and objective
    - Focus on relevant skills and experience
    - Identify potential red flags
    - Provide constructive feedback
    - Always maintain confidentiality`,
    extractStructuredData: true,
    schema: {
      "candidate_name": "Full name of the candidate",
      "relevant_experience": "Years of relevant work experience",
      "key_skills": "List of key technical and soft skills mentioned",
      "education": "Educational background and qualifications",
      "strengths": "Notable strengths and positive attributes",
      "concerns": "Any potential concerns or gaps",
      "overall_rating": "Overall rating from 1-10",
      "recommendation": "Hire/No Hire/Interview recommendation"
    },
    onAIResponse: (response: any) => {
      setResult(response);
      setError(null);
    },
    onAIError: (error: string) => {
      setError(error);
      setResult(null);
    }
  };

  // Example 2: Custom User Prompt Template
  const customUserPromptExample = {
    provider: 'anthropic',
    apiKey: 'your-anthropic-api-key',
    model: 'claude-3-haiku-20240307',
    userPromptTemplate: `Please analyze this job application:

Application Details:
{text}

Attached Documents:
{files}

Please provide a comprehensive evaluation focusing on:
1. Technical qualifications
2. Relevant experience
3. Cultural fit indicators
4. Potential concerns
5. Interview recommendations

Format your response as structured JSON data.`,
    extractStructuredData: true,
    onAIResponse: (response: any) => {
      setResult(response);
      setError(null);
    },
    onAIError: (error: string) => {
      setError(error);
      setResult(null);
    }
  };

  // Example 3: Advanced Custom Prompt Builder
  const advancedCustomPromptExample = {
    provider: 'openai',
    apiKey: 'your-openai-api-key',
    model: 'gpt-4',
    customPromptBuilder: (text: string, files?: File[], options?: any) => {
      const hasResume = files?.some(f => f.name.toLowerCase().includes('resume') || f.name.toLowerCase().includes('cv'));
      const hasCoverLetter = files?.some(f => f.name.toLowerCase().includes('cover'));
      
      const systemPrompt = `You are an expert HR recruiter with 15+ years of experience in talent acquisition.
      
Your expertise includes:
- Technical skill assessment
- Cultural fit evaluation  
- Salary negotiation insights
- Interview preparation guidance
- Candidate experience optimization

${hasResume ? 'A resume/CV has been provided for analysis.' : 'No resume/CV was provided.'}
${hasCoverLetter ? 'A cover letter has been provided for analysis.' : 'No cover letter was provided.'}

Provide detailed, actionable insights that will help the hiring team make informed decisions.`;

      const userPrompt = `CANDIDATE APPLICATION ANALYSIS REQUEST

Application Text:
${text}

${files && files.length > 0 ? `Supporting Documents:
${files.map(f => `- ${f.name} (${(f.size / 1024).toFixed(1)}KB)`).join('\n')}` : 'No supporting documents provided.'}

ANALYSIS REQUIREMENTS:
Please provide a comprehensive analysis including:

1. CANDIDATE OVERVIEW
   - Professional summary
   - Key qualifications
   - Career progression

2. TECHNICAL ASSESSMENT
   - Required skills match
   - Technical depth evaluation
   - Learning potential

3. EXPERIENCE EVALUATION
   - Relevant work history
   - Achievement highlights
   - Industry experience

4. CULTURAL FIT
   - Communication style
   - Team collaboration indicators
   - Company values alignment

5. RISK ASSESSMENT
   - Potential concerns
   - Red flags
   - Mitigation strategies

6. RECOMMENDATION
   - Overall rating (1-10)
   - Next steps
   - Interview focus areas

Format your response as structured JSON with clear sections and actionable insights.`;

      return { systemPrompt, userPrompt };
    },
    extractStructuredData: true,
    onAIResponse: (response: any) => {
      setResult(response);
      setError(null);
    },
    onAIError: (error: string) => {
      setError(error);
      setResult(null);
    }
  };

  const handleSubmit = async (text: string, files?: File[]) => {
    console.log('Form submitted:', text, files);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Custom Prompts Examples
        </h1>
        <p className="text-lg text-gray-600">
          Learn how to customize AI prompts for your specific use cases
        </p>
      </div>

      {/* Example 1: Custom System Prompt */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Example 1: Custom System Prompt</h2>
        <p className="text-gray-600 mb-4">
          This example shows how to provide a custom system prompt that defines the AI's role and behavior.
        </p>
        
        <ConversationalInput
          onSubmit={handleSubmit}
          aiProcessing={customSystemPromptExample}
          placeholder="Paste a job application here to analyze..."
          enableFileUpload={true}
          acceptedFileTypes={['.pdf', '.doc', '.docx', '.txt']}
          classNames={{
            container: "border border-gray-300 rounded-lg",
            textarea: "min-h-[120px] p-4",
            actionBar: "bg-gray-50 p-3 border-t border-gray-200"
          }}
        />
      </div>

      {/* Example 2: Custom User Prompt Template */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Example 2: Custom User Prompt Template</h2>
        <p className="text-gray-600 mb-4">
          This example demonstrates using a custom user prompt template with placeholders for dynamic content.
        </p>
        
        <ConversationalInput
          onSubmit={handleSubmit}
          aiProcessing={customUserPromptExample}
          placeholder="Enter job application details..."
          enableFileUpload={true}
          acceptedFileTypes={['.pdf', '.doc', '.docx', '.txt']}
          classNames={{
            container: "border border-gray-300 rounded-lg",
            textarea: "min-h-[120px] p-4",
            actionBar: "bg-gray-50 p-3 border-t border-gray-200"
          }}
        />
      </div>

      {/* Example 3: Advanced Custom Prompt Builder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Example 3: Advanced Custom Prompt Builder</h2>
        <p className="text-gray-600 mb-4">
          This example shows the most flexible approach using a custom prompt builder function that can adapt based on input content and files.
        </p>
        
        <ConversationalInput
          onSubmit={handleSubmit}
          aiProcessing={advancedCustomPromptExample}
          placeholder="Enter candidate information or paste application text..."
          enableFileUpload={true}
          acceptedFileTypes={['.pdf', '.doc', '.docx', '.txt']}
          classNames={{
            container: "border border-gray-300 rounded-lg",
            textarea: "min-h-[120px] p-4",
            actionBar: "bg-gray-50 p-3 border-t border-gray-200"
          }}
        />
      </div>

      {/* Results Display */}
      {(result || error) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">AI Response</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 className="text-red-800 font-medium">Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-green-800 font-medium mb-2">Analysis Result:</h3>
              <pre className="bg-white p-3 rounded text-sm text-gray-800 overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Code Examples */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Code Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">1. Custom System Prompt:</h3>
            <pre className="bg-white p-3 rounded text-sm overflow-auto">
{`<ConversationalInput
  aiProcessing={{
    provider: 'openai',
    apiKey: 'your-api-key',
    systemPrompt: \`You are a professional HR assistant specializing in candidate evaluation.
    Your role is to analyze job applications and provide structured feedback.\`,
    extractStructuredData: true,
    schema: {
      "candidate_name": "Full name of the candidate",
      "relevant_experience": "Years of relevant work experience",
      // ... more schema fields
    }
  }}
/>`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">2. Custom User Prompt Template:</h3>
            <pre className="bg-white p-3 rounded text-sm overflow-auto">
{`<ConversationalInput
  aiProcessing={{
    provider: 'anthropic',
    apiKey: 'your-api-key',
    userPromptTemplate: \`Please analyze this job application:

Application Details:
{text}

Attached Documents:
{files}

Please provide a comprehensive evaluation...\`,
    extractStructuredData: true
  }}
/>`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">3. Advanced Custom Prompt Builder:</h3>
            <pre className="bg-white p-3 rounded text-sm overflow-auto">
{`<ConversationalInput
  aiProcessing={{
    provider: 'openai',
    apiKey: 'your-api-key',
    customPromptBuilder: (text, files, options) => {
      const hasResume = files?.some(f => f.name.includes('resume'));
      
      return {
        systemPrompt: \`You are an expert HR recruiter...\`,
        userPrompt: \`CANDIDATE APPLICATION ANALYSIS REQUEST
Application Text: \${text}
\${hasResume ? 'Resume provided' : 'No resume'}\`
      };
    },
    extractStructuredData: true
  }}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
