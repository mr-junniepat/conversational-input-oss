# @junniepat/conversational-ai-input

> **Transform rigid forms into engaging conversations with AI-powered intelligence**

[![npm version](https://badge.fury.io/js/@junniepat/conversational-ai-input.svg)](https://badge.fury.io/js/@junniepat/conversational-ai-input)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/mr-junniepat/conversational-input-oss)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Try_Now-purple?logo=vercel)](https://promptforms-hr.vercel.app/ai-demo)





## 🚀 **[Try Live Demo →](https://promptforms-hr.vercel.app/ai-demo)**

**Experience the future of form interactions!** Our live demo showcases real AI processing with Mistral Cloud - no setup required.


<img width="871" height="454" alt="Screenshot 2025-09-03 at 2 50 14 AM" src="https://github.com/user-attachments/assets/7690e1d8-067c-45cb-860e-3e6d16c13973" />


### 🎯 **What You'll See:**
- ✅ **Real AI Processing** - Watch natural language transform into structured data
- ✅ **Voice Input** - Speak naturally and see instant transcription
- ✅ **File Uploads** - Drag & drop documents for AI analysis
- ✅ **Multiple AI Providers** - Test with OpenAI, Anthropic, Mistral, and more
- ✅ **Interactive Configuration** - Try different models and settings

### 🚀 **Quick Start**
```bash
npm install @junniepat/conversational-ai-input
```

```tsx
import { ConversationalInput } from '@junniepat/conversational-ai-input';

function App() {
  return (
    <ConversationalInput
      aiProvider="mistral"
      apiKey="your-api-key"
      onSubmit={(data) => console.log('Extracted:', data)}
    />
  );
}
```

**Ready to transform your forms?** [Try the live demo →](https://promptforms-hr.vercel.app/ai-demo)




A powerful, flexible React component that transforms any form input into a conversational, AI-ready interface. Perfect for job applications, customer support, surveys, and any scenario where you want to gather information naturally.

## 🎯 **Try the Live Demo**

Experience the component in action with our interactive demo powered by Mistral Cloud AI:

```tsx
import { MistralCloudDemo } from '@junniepat/conversational-ai-input/examples';

function App() {
  return <MistralCloudDemo />;
}
```

The demo includes:
- ✅ **Live AI Processing** with Mistral Cloud
- ✅ **Multiple Demo Modes** (Basic, Custom Prompts, Advanced)
- ✅ **Interactive Configuration** for testing different setups
- ✅ **Sample Inputs** to try various scenarios
- ✅ **Code Examples** and installation instructions

## ✨ **Features**

- 🎤 **Voice Input**: Built-in speech-to-text with Web Speech API
- 📎 **File Upload**: Drag & drop file support with validation
- 🤖 **AI Ready**: Designed for AI processing and clarification
- 🎨 **Highly Customizable**: Render props, custom styling, and flexible configuration
- 📱 **Responsive**: Works perfectly on all devices
- ♿ **Accessible**: WCAG compliant with proper ARIA labels
- 🔒 **Privacy First**: Works offline and with local LLMs
- ⚡ **Lightweight**: Only ~15KB gzipped

## 🚀 **Quick Start**

### **Installation**

```bash
npm install @junniepat/conversational-ai-input
# or
yarn add @junniepat/conversational-ai-input
# or
pnpm add @junniepat/conversational-ai-input
```

### **Basic Usage**

```tsx
import { ConversationalInput } from '@junniepat/conversational-ai-input';

function MyComponent() {
  const handleSubmit = async (text: string, files?: File[]) => {
    console.log('Text:', text);
    console.log('Files:', files);
    
    // Process with your AI service
    const result = await processWithAI(text, files);
    console.log('AI Result:', result);
  };

  return (
    <ConversationalInput
      onSubmit={handleSubmit}
      placeholder="Tell me about your experience..."
    />
  );
}
```

## 🎯 **Use Cases**

### **Job Applications**
```tsx
<ConversationalInput
  onSubmit={handleJobApplication}
  placeholder="Describe your experience and why you'd be great for this role..."
  requireFiles={true}
  acceptedFileTypes={['.pdf', '.doc', '.docx']}
  labels={{
    addAttachments: "Upload Resume",
    submit: "Submit Application"
  }}
/>
```

### **Customer Support**
```tsx
<ConversationalInput
  onSubmit={handleSupportRequest}
  placeholder="How can we help you today? Describe your issue..."
  enableFileUpload={true}
  acceptedFileTypes={['.png', '.jpg', '.pdf']}
  labels={{
    addAttachments: "Add Screenshots",
    submit: "Send Message"
  }}
/>
```

### **Surveys & Research**
```tsx
<ConversationalInput
  onSubmit={handleSurveyResponse}
  placeholder="Share your thoughts and experiences..."
  enableVoice={true}
  enableFileUpload={false}
  labels={{
    submit: "Submit Response"
  }}
/>
```

## 🎨 **Customization**

### **Custom Styling**

```tsx
<ConversationalInput
  onSubmit={handleSubmit}
  classNames={{
    container: "max-w-4xl mx-auto",
    textarea: "h-32 text-lg font-serif bg-gradient-to-r from-purple-50 to-blue-50",
    submitButton: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
    voiceButton: "bg-purple-600 text-white border-0",
  }}
/>
```

### **Render Props for Complete Control**

```tsx
<ConversationalInput
  onSubmit={handleSubmit}
  render={{
    submitButton: ({ onClick, disabled, isSubmitting, text }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className="custom-submit-button"
      >
        {isSubmitting ? 'Processing...' : text}
      </button>
    ),
    
    voiceButton: ({ isListening, onClick, disabled }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`voice-btn ${isListening ? 'recording' : ''}`}
      >
        {isListening ? '🔴 Recording...' : '🎤 Start Voice'}
      </button>
    ),
  }}
/>
```

### **Form Integration**

```tsx
<ConversationalInput
  onSubmit={() => {}} // Form handles submission
  showSubmitButton={false}
  submitTrigger="none"
  onTextChange={(text) => setFormData(prev => ({ ...prev, description: text }))}
  onFilesChange={(files) => setFormData(prev => ({ ...prev, attachments: files }))}
/>
```

## 🤖 **AI Integration**

### **OpenAI Integration**

```tsx
import { ConversationalInput } from '@junniepat/conversational-ai-input';

const processWithOpenAI = async (text: string, files?: File[]) => {
  const response = await fetch('/api/openai/process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, files })
  });
  
  const result = await response.json();
  return result.extractedData;
};

<ConversationalInput
  onSubmit={processWithOpenAI}
  placeholder="Describe your needs..."
/>
```

### **Local LLM Integration (Ollama)**

```tsx
const processWithLocalLLM = async (text: string) => {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mixtral',
      prompt: `Extract structured information: ${text}`,
      stream: false
    })
  });
  
  const result = await response.json();
  return JSON.parse(result.response);
};
```

### **Clarification System**

```tsx
import { Clarifier } from '@junniepat/conversational-ai-input';

function MyComponent() {
  const [clarification, setClarification] = useState<string | null>(null);

  const handleSubmit = async (text: string, files?: File[]) => {
    const result = await processWithAI(text, files);
    
    if (result.needsClarification) {
      setClarification(result.clarificationQuestion);
    }
  };

  return (
    <div>
      <ConversationalInput onSubmit={handleSubmit} />
      
      {clarification && (
        <Clarifier
          question={clarification}
          onClarify={handleClarify}
          type="info"
          suggestions={["Yes", "No", "I'll provide more details"]}
        />
      )}
    </div>
  );
}
```

## 📚 **Examples**

Check out our comprehensive examples:

```tsx
import { 
  BasicUsage, 
  FormIntegration, 
  CustomStyling, 
  RenderProps 
} from '@junniepat/conversational-ai-input/examples';

// See examples in action
<BasicUsage />
<FormIntegration />
<CustomStyling />
<RenderProps />
```

## 🔧 **API Reference**

### **ConversationalInput Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(text: string, files?: File[]) => Promise<void> \| void` | **Required** | Callback when form is submitted |
| `placeholder` | `string` | `"Type your message..."` | Placeholder text |
| `requireFiles` | `boolean` | `false` | Whether files are required |
| `acceptedFileTypes` | `string[]` | `['*']` | Accepted file types |
| `maxFileSize` | `number` | `10MB` | Maximum file size in bytes |
| `className` | `string` | `""` | Custom CSS class |
| `showClearButton` | `boolean` | `true` | Show clear text button |
| `enableVoice` | `boolean` | `true` | Enable voice input |
| `enableFileUpload` | `boolean` | `true` | Enable file upload |
| `showSubmitButton` | `boolean` | `true` | Show submit button |
| `submitTrigger` | `'button' \| 'enter' \| 'both' \| 'none'` | `'both'` | Submit trigger behavior |
| `clearAfterSubmit` | `boolean` | `true` | Clear text after submission |
| `initialValue` | `string` | `""` | Initial text value |
| `value` | `string` | `undefined` | Controlled text value |
| `onTextChange` | `(text: string) => void` | `undefined` | Text change callback |
| `onFilesChange` | `(files: File[]) => void` | `undefined` | Files change callback |
| `autoSubmitOnEnter` | `boolean` | `false` | Auto-submit on Enter key |
| `classNames` | `ClassNamesObject` | `{}` | Custom CSS classes |
| `render` | `RenderObject` | `{}` | Custom render functions |
| `validateInput` | `(text: string) => string \| null` | `undefined` | Custom validation |
| `isSubmitting` | `boolean` | `false` | Loading state |
| `disabled` | `boolean` | `false` | Disable component |

### **Labels Customization**

```tsx
labels={{
  submit: "Send Message",
  clear: "Clear Text",
  addAttachments: "Add Files",
  useVoice: "Use Voice",
  listening: "Listening...",
  cvReady: "CV Ready"
}}
```

### **Custom CSS Classes**

```tsx
classNames={{
  container: "max-w-4xl mx-auto",
  textarea: "h-32 text-lg font-serif",
  actionBar: "bg-gray-100 p-3",
  voiceButton: "bg-blue-500 text-white",
  fileButton: "bg-green-500 text-white",
  submitButton: "bg-purple-600 text-white",
  clearButton: "bg-red-500 text-white",
  fileDisplay: "bg-white border rounded",
  errorDisplay: "bg-red-100 border-red-300"
}}
```

## 🎭 **Render Props**

### **Available Render Props**

- `voiceButton`: Custom voice button rendering
- `fileButton`: Custom file upload button
- `submitButton`: Custom submit button
- `clearButton`: Custom clear button
- `fileDisplay`: Custom file display
- `errorDisplay`: Custom error display

### **Render Props Interface**

```tsx
interface VoiceButtonRenderProps {
  isListening: boolean;
  isSupported: boolean;
  onClick: () => void;
  disabled: boolean;
  className: string;
}

interface FileButtonRenderProps {
  onClick: () => void;
  disabled: boolean;
  className: string;
  acceptedTypes: string[];
}

interface SubmitButtonRenderProps {
  onClick: () => void;
  disabled: boolean;
  className: string;
  isSubmitting: boolean;
  text: string;
}
```

## 🎯 **Advanced Patterns**

### **Multi-Step Form Integration**

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStepSubmit = async (text: string, files?: File[]) => {
    setFormData(prev => ({ ...prev, [`step${step}`]: { text, files } }));
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      await submitFinalForm(formData);
    }
  };

  return (
    <div>
      <h2>Step {step} of 3</h2>
      <ConversationalInput
        onSubmit={handleStepSubmit}
        placeholder={`Tell us about step ${step}...`}
        showSubmitButton={true}
        submitTrigger="button"
      />
    </div>
  );
}
```

### **Real-time Validation**

```tsx
<ConversationalInput
  onSubmit={handleSubmit}
  validateInput={(text) => {
    if (text.length < 10) return "Please provide at least 10 characters";
    if (text.length > 1000) return "Please keep it under 1000 characters";
    return null; // No error
  }}
  onTextChange={(text) => {
    // Real-time validation feedback
    const error = validateInput(text);
    setValidationError(error);
  }}
/>
```

### **File Processing Pipeline**

```tsx
const processFiles = async (files: File[]) => {
  const results = [];
  
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      const processed = await processImage(file);
      results.push(processed);
    } else if (file.type === 'application/pdf') {
      const processed = await processPDF(file);
      results.push(processed);
    }
  }
  
  return results;
};

<ConversationalInput
  onSubmit={handleSubmit}
  onFilesChange={processFiles}
  acceptedFileTypes={['.pdf', '.png', '.jpg', '.jpeg']}
/>
```

## 🌐 **Browser Support**

- ✅ **Chrome** 66+
- ✅ **Firefox** 60+
- ✅ **Safari** 11.1+
- ✅ **Edge** 79+
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

**Note**: Voice input requires HTTPS in production (Web Speech API requirement).

## 📦 **Installation Requirements**

### **Peer Dependencies**

```json
{
  "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
  "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
}
```

### **Optional Dependencies**

```json
{
  "lucide-react": "^0.300.0" // For icons (included in bundle)
}
```

## 🚀 **Performance**

- **Bundle Size**: ~15KB gzipped
- **Tree Shaking**: Full ES module support
- **Lazy Loading**: Voice recognition only loads when needed
- **Memory Efficient**: Proper cleanup of event listeners

## 🔒 **Security & Privacy**

- **No External Dependencies**: Works completely offline
- **Local Processing**: Voice and file processing happen in browser
- **No Data Collection**: Zero telemetry or analytics
- **Privacy First**: Perfect for sensitive applications

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Setup**

```bash
git clone https://github.com/mr-junniepat/conversational-input-oss.git
cd conversational-input-oss
npm install
npm run dev
npm run build
npm run test
```

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 **Support & Contact**

### **📞 Get Help**
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/mr-junniepat/conversational-input-oss/issues)
- **💬 Questions**: [GitHub Discussions](https://github.com/mr-junniepat/conversational-input-oss/discussions)
- **📖 Documentation**: [Full API Reference](https://github.com/mr-junniepat/conversational-input-oss)
- **🎯 Examples**: [Live Examples](https://github.com/mr-junniepat/conversational-input-oss/tree/main/src/examples)
- **🤖 AI Integration**: [AI Integration Guide](https://github.com/mr-junniepat/conversational-input-oss/tree/main/src/ai-integrations)

### **👨‍💻 Author & Creator**
**Patrick Igwe** - Full-Stack Developer & AI Enthusiast

- 🔗 **LinkedIn**: [Patrick Igwe](https://www.linkedin.com/in/patrick-igwe/)
- 📧 **Email**: [junniepat@gmail.com](mailto:junniepat@gmail.com)
- 🐙 **GitHub**: [@mr-junniepat](https://github.com/mr-junniepat)
- 🌐 **Portfolio**: [PromptForms](https://promptforms-hr.vercel.app/)

### **💼 Professional Services**
Need help implementing conversational AI in your project? I offer:
- 🎯 **Custom Implementation** - Tailored solutions for your use case
- 🏢 **Enterprise Integration** - Large-scale deployments and consulting
- 🎓 **Training & Workshops** - Team training on conversational UI best practices
- 🚀 **Technical Consulting** - Architecture and AI strategy guidance

**Let's connect on LinkedIn to discuss your project!** [Connect with Patrick →](https://www.linkedin.com/in/patrick-igwe/)

## 🌟 **Why Conversational Input?**

Traditional forms are rigid and frustrating. Our conversational approach makes data collection feel natural and engaging:

- **🎯 Better Completion Rates**: Users are more likely to complete conversational forms
- **📊 Higher Quality Data**: Natural language often contains richer information
- **🤖 AI Ready**: Designed from the ground up for AI processing
- **📱 Mobile First**: Perfect for mobile and voice-first interfaces
- **♿ Inclusive**: Works for users with disabilities and different input preferences

## 📚 **Repository & Resources**

- **GitHub Repository**: [https://github.com/mr-junniepat/conversational-input-oss](https://github.com/mr-junniepat/conversational-input-oss)
- **NPM Package**: [https://www.npmjs.com/package/@junniepat/conversational-ai-input](https://www.npmjs.com/package/@junniepat/conversational-ai-input)
- **Issues & Support**: [GitHub Issues](https://github.com/mr-junniepat/conversational-input-oss/issues)
- **Documentation**: See the `/src/examples` and `/src/ai-integrations` directories for usage examples

## 🚀 **Get Started Today**

```bash
npm install @junniepat/conversational-ai-input
```

Transform your forms from frustrating to fascinating! 🎉

---

**Built with ❤️ by the PromptForms team**

[GitHub](https://github.com/mr-junniepat/conversational-input-oss) • [NPM](https://www.npmjs.com/package/@junniepat/conversational-ai-input) • [Issues](https://github.com/mr-junniepat/conversational-input-oss/issues)
