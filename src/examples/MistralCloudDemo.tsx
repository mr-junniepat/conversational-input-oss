import React, { useState } from 'react';
import { ConversationalInput } from '../components/ConversationalInput';
import { AIProviderConfig } from '../components/AIProviderConfig';
import { MessageSquare, Mic, Upload, Zap, Shield, Users, FileText, Bot, Sparkles, User, Settings, Key, Server, CheckCircle, AlertCircle, Star, Code, Play } from 'lucide-react';

/**
 * Live Demo showcasing ConversationalInput with Mistral Cloud
 * This demo allows users to test the component before downloading
 */
export const MistralCloudDemo: React.FC = () => {
  const [aiConfig, setAiConfig] = useState<any>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [activeDemo, setActiveDemo] = useState<'basic' | 'custom' | 'advanced'>('basic');

  // Demo configurations
  const demos = {
    basic: {
      title: "Basic AI Processing",
      description: "Simple text processing with Mistral Cloud",
      config: {
        provider: 'mistral',
        model: 'mistral-large-latest',
        extractStructuredData: false,
        clarificationMode: false,
        onAIResponse: (response: any) => {
          setAiResult(response);
          setAiError(null);
        },
        onAIError: (error: string) => {
          setAiError(error);
          setAiResult(null);
        }
      }
    },
    custom: {
      title: "Custom System Prompt",
      description: "HR Assistant with custom role definition",
      config: {
        provider: 'mistral',
        model: 'mistral-large-latest',
        systemPrompt: `You are a professional HR assistant specializing in candidate evaluation and recruitment.

Your expertise includes:
- Analyzing job applications and resumes
- Identifying key skills and qualifications
- Providing structured feedback
- Making hiring recommendations
- Ensuring fair and unbiased evaluation

Guidelines:
- Be professional and objective in your analysis
- Focus on relevant skills and experience
- Identify both strengths and areas for improvement
- Provide actionable insights for hiring decisions
- Always maintain confidentiality and respect`,
        extractStructuredData: true,
        schema: {
          "candidate_name": "Full name of the candidate",
          "relevant_experience": "Years of relevant work experience",
          "key_skills": "List of key technical and soft skills mentioned",
          "education": "Educational background and qualifications",
          "strengths": "Notable strengths and positive attributes",
          "concerns": "Any potential concerns or gaps",
          "overall_rating": "Overall rating from 1-10",
          "recommendation": "Hire/No Hire/Interview recommendation with reasoning"
        },
        onAIResponse: (response: any) => {
          setAiResult(response);
          setAiError(null);
        },
        onAIError: (error: string) => {
          setAiError(error);
          setAiResult(null);
        }
      }
    },
    advanced: {
      title: "Advanced Custom Prompts",
      description: "Dynamic prompt generation based on input content",
      config: {
        provider: 'mistral',
        model: 'mistral-large-latest',
        customPromptBuilder: (text: string, files?: File[], options?: any) => {
          const hasResume = files?.some(f => 
            f.name.toLowerCase().includes('resume') || 
            f.name.toLowerCase().includes('cv')
          );
          const hasCoverLetter = files?.some(f => 
            f.name.toLowerCase().includes('cover')
          );
          
          const systemPrompt = `You are an expert HR recruiter with 15+ years of experience in talent acquisition and candidate evaluation.

Your expertise includes:
- Technical skill assessment across various industries
- Cultural fit evaluation and team dynamics
- Salary negotiation insights and market analysis
- Interview preparation guidance and best practices
- Candidate experience optimization and employer branding

Current Analysis Context:
${hasResume ? '✅ Resume/CV has been provided for detailed analysis' : '❌ No resume/CV was provided - analysis will be based on text input only'}
${hasCoverLetter ? '✅ Cover letter has been provided for additional context' : '❌ No cover letter was provided'}

Provide detailed, actionable insights that will help the hiring team make informed decisions. Focus on both technical qualifications and cultural fit indicators.`;

          const userPrompt = `🎯 CANDIDATE APPLICATION ANALYSIS REQUEST

📋 Application Details:
${text}

${files && files.length > 0 ? `📎 Supporting Documents:
${files.map(f => `- ${f.name} (${(f.size / 1024).toFixed(1)}KB)`).join('\n')}` : '📎 No supporting documents provided'}

🔍 ANALYSIS REQUIREMENTS:

1. 👤 CANDIDATE OVERVIEW
   - Professional summary and background
   - Key qualifications and achievements
   - Career progression and growth trajectory

2. 🛠️ TECHNICAL ASSESSMENT
   - Required skills match analysis
   - Technical depth and expertise evaluation
   - Learning potential and adaptability

3. 💼 EXPERIENCE EVALUATION
   - Relevant work history and accomplishments
   - Industry experience and domain knowledge
   - Leadership and collaboration indicators

4. 🤝 CULTURAL FIT
   - Communication style and clarity
   - Team collaboration indicators
   - Company values alignment assessment

5. ⚠️ RISK ASSESSMENT
   - Potential concerns or red flags
   - Gaps in experience or skills
   - Mitigation strategies and recommendations

6. 🎯 RECOMMENDATION
   - Overall rating (1-10) with detailed justification
   - Next steps and interview focus areas
   - Specific questions to ask during interviews

Format your response as structured JSON with clear sections, actionable insights, and specific examples from the application.`;

          return { systemPrompt, userPrompt };
        },
        extractStructuredData: true,
        onAIResponse: (response: any) => {
          setAiResult(response);
          setAiError(null);
        },
        onAIError: (error: string) => {
          setAiError(error);
          setAiResult(null);
        }
      }
    }
  };

  const handleSubmit = async (text: string, files?: File[]) => {
    console.log('Form submitted:', text, files);
    // This onSubmit will be called AFTER AI processing if aiProcessing is configured
  };

  const currentDemo = demos[activeDemo];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-purple-600" />
              ConversationalInput Live Demo
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Test the power of conversational AI input with Mistral Cloud
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Bot className="w-4 h-4" />
              Powered by Mistral Cloud AI
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose a Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key as any)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                  activeDemo === key
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{demo.title}</h3>
                <p className="text-sm text-gray-600">{demo.description}</p>
                {activeDemo === key && (
                  <div className="mt-3 flex items-center text-purple-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Active</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* AI Configuration */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-600" />
              AI Configuration
            </h2>
            <p className="text-gray-600 mb-4">
              Configure your Mistral Cloud API key to test the component. 
              <a href="https://console.mistral.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                Get your API key here
              </a>
            </p>
            <AIProviderConfig onConfigure={setAiConfig} />
          </div>
        </div>

        {/* Demo Content */}
        {aiConfig && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-green-600" />
                {currentDemo.title}
              </h2>
              <p className="text-gray-600 mb-4">{currentDemo.description}</p>

              <ConversationalInput
                onSubmit={handleSubmit}
                placeholder="Try typing something like: 'I'm a software engineer with 5 years of experience in React and Node.js, looking for a senior developer position...'"
                aiProcessing={{
                  ...aiConfig,
                  ...currentDemo.config
                }}
                value={inputText}
                onTextChange={setInputText}
                showClearButton={true}
                enableFileUpload={true}
                acceptedFileTypes={['.pdf', '.doc', '.docx', '.txt']}
                maxFileSize={10 * 1024 * 1024} // 10MB
                classNames={{
                  container: "border border-gray-300 rounded-lg shadow-sm",
                  textarea: "min-h-[150px] p-4 text-base",
                  actionBar: "bg-gray-100 p-3 flex justify-between items-center border-t border-gray-200",
                  voiceButton: "bg-blue-600 text-white hover:bg-blue-700",
                  fileButton: "bg-green-600 text-white hover:bg-green-700",
                  submitButton: "bg-purple-600 text-white hover:bg-purple-700",
                  clearButton: "bg-red-500 text-white hover:bg-red-600",
                  fileDisplay: "p-2 bg-white border-t border-gray-200",
                  errorDisplay: "p-3 bg-red-100 text-red-800 rounded-b-lg"
                }}
              />

              {/* Sample Inputs */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Try these sample inputs:</h3>
                <div className="space-y-2">
                  {[
                    "I'm a marketing manager with 8 years of experience in digital marketing, SEO, and social media management.",
                    "Software developer specializing in Python, Django, and machine learning. I have a Master's in Computer Science.",
                    "Customer service representative with excellent communication skills and 3 years of experience in retail."
                  ].map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(sample)}
                      className="block w-full text-left p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded border border-gray-200"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* AI Response */}
              {aiResult && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    AI Response
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <pre className="text-sm text-green-900 whitespace-pre-wrap overflow-auto max-h-96">
                      {typeof aiResult === 'string' ? aiResult : JSON.stringify(aiResult, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {aiError && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Error
                  </h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">{aiError}</p>
                  </div>
                </div>
              )}

              {/* Features Showcase */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Component Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mic className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Voice Input</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">File Upload</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">AI Processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-gray-700">Input Validation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm text-gray-700">Custom Prompts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-gray-700">Structured Output</span>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-gray-600" />
                  Code Example
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                  <pre className="text-sm text-green-400">
{`import { ConversationalInput } from '@junniepat/conversational-ai-input';

<ConversationalInput
  onSubmit={handleSubmit}
  aiProcessing={{
    provider: 'mistral',
    apiKey: 'your-mistral-api-key',
    model: 'mistral-large-latest',
    systemPrompt: 'You are a professional HR assistant...',
    extractStructuredData: true,
    schema: {
      "candidate_name": "Full name",
      "experience": "Years of experience"
    }
  }}
  placeholder="Tell me about yourself..."
  enableFileUpload={true}
  enableVoice={true}
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Installation Instructions */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Ready to Use in Your Project?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Installation</h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-sm text-green-400">
{`npm install @junniepat/conversational-ai-input

# or

yarn add @junniepat/conversational-ai-input

# or

pnpm add @junniepat/conversational-ai-input`}
                </pre>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-green-400">
{`import { ConversationalInput } from '@junniepat/conversational-ai-input';

function App() {
  return (
    <ConversationalInput
      onSubmit={(text, files) => console.log(text, files)}
      placeholder="Start typing..."
    />
  );
}`}
                </pre>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="https://github.com/mr-junniepat/conversational-input-oss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
