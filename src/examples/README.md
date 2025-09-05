# 🎯 **ConversationalInput Examples**

This directory contains comprehensive examples showing how to use the `@promptforms/conversational-input` package in various scenarios.

## 📚 **Available Examples**

### **1. Basic Usage** (`BasicUsage.tsx`)
**File**: `src/examples/BasicUsage.tsx`

The simplest way to use ConversationalInput with default settings.

```tsx
import { BasicUsage } from '@promptforms/conversational-input/examples';

function App() {
  return <BasicUsage />;
}
```

**Features Demonstrated:**
- ✅ Default voice input
- ✅ Default file upload
- ✅ Default submit button
- ✅ Default clear button
- ✅ Basic placeholder text

### **2. Form Integration** (`FormIntegration.tsx`)
**File**: `src/examples/FormIntegration.tsx`

Shows how to embed ConversationalInput in a larger form without using its submit functionality.

```tsx
import { FormIntegration } from '@promptforms/conversational-input/examples';

function App() {
  return <FormIntegration />;
}
```

**Features Demonstrated:**
- ✅ Embedded in larger form
- ✅ No submit button (form handles submission)
- ✅ Controlled text and files
- ✅ Form validation integration
- ✅ Custom styling integration

### **3. Custom Styling** (`CustomStyling.tsx`)
**File**: `src/examples/CustomStyling.tsx`

Demonstrates how to customize the appearance using the `classNames` prop.

```tsx
import { CustomStyling } from '@promptforms/conversational-input/examples';

function App() {
  return <CustomStyling />;
}
```

**Features Demonstrated:**
- ✅ Custom container styling
- ✅ Gradient backgrounds
- ✅ Custom button colors
- ✅ Enhanced textarea appearance
- ✅ Custom file display styling

### **4. Render Props** (`RenderProps.tsx`)
**File**: `src/examples/RenderProps.tsx`

Shows complete customization using render props for maximum flexibility.

```tsx
import { RenderProps } from '@promptforms/conversational-input/examples';

function App() {
  return <RenderProps />;
}
```

**Features Demonstrated:**
- ✅ Custom voice button with recording state
- ✅ Custom file button with accepted types
- ✅ Custom submit button with loading state
- ✅ Custom clear button styling
- ✅ Enhanced file display with file info
- ✅ Custom error display with icon

### **5. Custom Prompts** (`CustomPrompts.tsx`)
**File**: `src/examples/CustomPrompts.tsx`

Demonstrates how to customize AI prompts for specific use cases and domains.

```tsx
import { CustomPrompts } from '@promptforms/conversational-input/examples';

function App() {
  return <CustomPrompts />;
}
```

**Features Demonstrated:**
- ✅ Custom system prompts for role definition
- ✅ Custom user prompt templates with placeholders
- ✅ Advanced custom prompt builder functions
- ✅ Dynamic prompt generation based on input
- ✅ Domain-specific AI behavior customization
- ✅ Structured data extraction with custom schemas

### **6. Mistral Cloud Demo** (`MistralCloudDemo.tsx`)
**File**: `src/examples/MistralCloudDemo.tsx`

Live demo showcasing the component with Mistral Cloud AI integration for testing before download.

```tsx
import { MistralCloudDemo } from '@promptforms/conversational-input/examples';

function App() {
  return <MistralCloudDemo />;
}
```

**Features Demonstrated:**
- ✅ Live Mistral Cloud AI integration
- ✅ Multiple demo modes (Basic, Custom, Advanced)
- ✅ Interactive AI configuration
- ✅ Real-time AI processing and responses
- ✅ Sample inputs for testing
- ✅ Code examples and installation instructions
- ✅ Feature showcase and documentation

## 🚀 **Quick Start with Examples**

### **Install the Package**
```bash
npm install @promptforms/conversational-input
```

### **Import and Use**
```tsx
import { ConversationalInput } from '@promptforms/conversational-input';

function MyComponent() {
  const handleSubmit = async (text: string, files?: File[]) => {
    console.log('Text:', text);
    console.log('Files:', files);
  };

  return (
    <ConversationalInput
      onSubmit={handleSubmit}
      placeholder="Tell me about your experience..."
    />
  );
}
```

### **Use Examples Directly**
```tsx
import { BasicUsage, FormIntegration, CustomStyling, RenderProps } from '@promptforms/conversational-input/examples';

function App() {
  return (
    <div>
      <BasicUsage />
      <FormIntegration />
      <CustomStyling />
      <RenderProps />
    </div>
  );
}
```

## 🎨 **Customization Patterns**

### **Basic Customization**
```tsx
<ConversationalInput
  onSubmit={handleSubmit}
  placeholder="Custom placeholder..."
  className="my-custom-class"
  showClearButton={false}
  enableVoice={false}
/>
```

### **Advanced Customization**
```tsx
<ConversationalInput
  onSubmit={handleSubmit}
  classNames={{
    container: "max-w-4xl mx-auto",
    textarea: "h-48 text-xl font-serif",
    submitButton: "bg-gradient-to-r from-pink-500 to-purple-500",
    voiceButton: "bg-blue-500 text-white border-0",
  }}
  render={{
    submitButton: ({ onClick, disabled, isSubmitting }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className="custom-submit-button"
      >
        {isSubmitting ? 'Processing...' : 'Submit'}
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

### **Custom AI Prompts**
```tsx
<ConversationalInput
  onSubmit={handleSubmit}
  aiProcessing={{
    provider: 'openai',
    apiKey: 'your-api-key',
    systemPrompt: 'You are a professional HR assistant specializing in candidate evaluation.',
    userPromptTemplate: 'Please analyze this job application:\n\n{text}\n\nAttached files: {files}',
    extractStructuredData: true,
    schema: {
      "candidate_name": "Full name of the candidate",
      "relevant_experience": "Years of relevant work experience"
    }
  }}
/>
```

### **Advanced Custom Prompt Builder**
```tsx
<ConversationalInput
  onSubmit={handleSubmit}
  aiProcessing={{
    provider: 'openai',
    apiKey: 'your-api-key',
    customPromptBuilder: (text, files, options) => {
      const hasResume = files?.some(f => f.name.includes('resume'));
      
      return {
        systemPrompt: `You are an expert HR recruiter with 15+ years of experience.
        ${hasResume ? 'A resume has been provided for analysis.' : 'No resume was provided.'}`,
        userPrompt: `CANDIDATE APPLICATION ANALYSIS REQUEST\n\nApplication Text: ${text}\n\nPlease provide a comprehensive evaluation...`
      };
    },
    extractStructuredData: true
  }}
/>
```

## 🔧 **Example Features**

### **Voice Input**
- Real-time speech recognition
- Visual feedback during recording
- Error handling for unsupported browsers

### **File Upload**
- Drag & drop support
- File type validation
- File size limits
- Multiple file support

### **AI Integration Ready**
- Designed for AI processing
- Structured data output
- Clarification system support

### **Accessibility**
- WCAG compliant
- Proper ARIA labels
- Keyboard navigation
- Screen reader support

## 📱 **Responsive Design**

All examples are fully responsive and work on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ Touch devices

## 🎯 **Use Cases**

### **Job Applications**
```tsx
<ConversationalInput
  onSubmit={handleJobApplication}
  placeholder="Tell us about your experience and why you'd be great for this role..."
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

## 🚀 **Next Steps**

1. **Explore Examples**: Try each example to understand the capabilities
2. **Customize**: Modify examples to match your design requirements
3. **Integrate**: Use examples as starting points for your own implementations
4. **Extend**: Build upon examples to create new use cases

## 📖 **Additional Resources**

- **Main README**: See the root README.md for comprehensive documentation
- **AI Integration**: Check `src/ai-integrations/` for AI processing examples
- **Types**: Explore `src/types/` for TypeScript interfaces
- **Hooks**: Use `src/hooks/` for standalone voice and file functionality

---

**Ready to build amazing conversational interfaces? Start with these examples! 🚀**
