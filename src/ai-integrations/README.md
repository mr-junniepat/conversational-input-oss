# 🤖 **AI Integration Examples**

This directory contains comprehensive examples showing how to integrate the `@promptforms/conversational-input` package with various AI providers and processing patterns.

## 🚀 **Available AI Integrations**

### **1. OpenAI Integration** (`OpenAI.tsx`)
**File**: `src/ai-integrations/OpenAI.tsx`

Complete integration with OpenAI's GPT models for intelligent data extraction and processing.

```tsx
import { OpenAI } from '@promptforms/conversational-input/ai-integrations';

function App() {
  return <OpenAI />;
}
```

**Features Demonstrated:**
- ✅ OpenAI GPT-4 integration
- ✅ Intelligent data extraction
- ✅ Clarification system
- ✅ File processing
- ✅ Structured output
- ✅ Error handling

**API Endpoints Used:**
- `/api/openai/process` - Process text and files
- `/api/openai/clarify` - Handle clarification responses

### **2. Local LLM Integration** (`LocalLLM.tsx`)
**File**: `src/ai-integrations/LocalLLM.tsx`

Integration with local LLMs like Ollama or LM Studio for privacy-focused, offline processing.

```tsx
import { LocalLLM } from '@promptforms/conversational-input/ai-integrations';

function App() {
  return <LocalLLM />;
}
```

**Features Demonstrated:**
- ✅ Local LLM integration (Ollama, LM Studio)
- ✅ Privacy-focused processing
- ✅ Offline capability
- ✅ Model status monitoring
- ✅ Structured data extraction
- ✅ Connection health checks

**Local Endpoints:**
- `http://localhost:11434/api/tags` - Check available models
- `http://localhost:11434/api/generate` - Process with local model

## 🔧 **Integration Patterns**

### **Basic AI Processing**
```tsx
const handleSubmit = async (text: string, files?: File[]) => {
  try {
    const response = await fetch('/api/ai/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, files })
    });
    
    const result = await response.json();
    
    if (result.needsClarification) {
      setClarification(result.clarificationQuestion);
    } else {
      setExtractedData(result.extractedData);
    }
  } catch (error) {
    console.error('AI processing error:', error);
  }
};
```

### **Clarification Handling**
```tsx
const handleClarify = async (response: string) => {
  try {
    const result = await fetch('/api/ai/clarify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response, context: extractedData })
    });
    
    const clarifiedResult = await result.json();
    setExtractedData(clarifiedResult.extractedData);
    setClarification(null);
  } catch (error) {
    console.error('Clarification error:', error);
  }
};
```

### **File Processing**
```tsx
const processFiles = async (files: File[]) => {
  const fileData = await Promise.all(
    files.map(async (file) => {
      const base64 = await fileToBase64(file);
      return {
        name: file.name,
        type: file.type,
        size: file.size,
        content: base64
      };
    })
  );
  
  return fileData;
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
```

## 🎯 **Use Cases**

### **Job Application Processing**
```tsx
const processJobApplication = async (text: string, files?: File[]) => {
  const prompt = `Extract structured information from this job application:
  
Text: ${text}
Resume: ${files?.map(f => f.name).join(', ') || 'None'}

Return JSON with:
{
  "experience": "years of experience",
  "skills": ["skill1", "skill2"],
  "availability": "availability details",
  "location": "preferred location",
  "salary": "salary expectations",
  "confidence": 0.95
}`;

  // Send to AI provider...
};
```

### **Customer Support Classification**
```tsx
const classifySupportRequest = async (text: string, files?: File[]) => {
  const prompt = `Classify this customer support request:
  
Text: ${text}
Attachments: ${files?.map(f => f.name).join(', ') || 'None'}

Return JSON with:
{
  "category": "technical|billing|account|feature_request",
  "urgency": "low|medium|high|critical",
  "department": "frontend|backend|billing|general",
  "estimated_resolution_time": "hours",
  "requires_escalation": false
}`;

  // Send to AI provider...
};
```

### **Survey Analysis**
```tsx
const analyzeSurveyResponse = async (text: string) => {
  const prompt = `Analyze this survey response:
  
Text: ${text}

Return JSON with:
{
  "sentiment": "positive|neutral|negative",
  "satisfaction_score": 1-10,
  "key_themes": ["theme1", "theme2"],
  "action_items": ["action1", "action2"],
  "follow_up_needed": false
}`;

  // Send to AI provider...
};
```

## 🔒 **Security Best Practices**

### **API Key Management**
```tsx
// Use environment variables
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;

// Never expose keys in client-side code
if (!OPENAI_API_KEY) {
  throw new Error('OpenAI API key not configured');
}
```

### **Input Validation**
```tsx
const validateInput = (text: string, files?: File[]) => {
  if (!text || text.trim().length < 10) {
    throw new Error('Text must be at least 10 characters');
  }
  
  if (files && files.length > 5) {
    throw new Error('Maximum 5 files allowed');
  }
  
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  if (files?.some(f => f.size > maxFileSize)) {
    throw new Error('Files must be under 10MB');
  }
};
```

### **Rate Limiting**
```tsx
class RateLimiter {
  private requests: number[] = [];
  private maxRequests = 10;
  private windowMs = 60000; // 1 minute

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}
```

## 🚀 **Performance Optimization**

### **Streaming Responses**
```tsx
const processWithStreaming = async (text: string) => {
  const response = await fetch('/api/ai/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    // Process chunk...
  }
};
```

### **Caching**
```tsx
const cache = new Map();

const getCachedResponse = async (text: string) => {
  const hash = await hashText(text);
  
  if (cache.has(hash)) {
    return cache.get(hash);
  }
  
  const response = await processWithAI(text);
  cache.set(hash, response);
  
  return response;
};
```

## 📱 **Mobile Optimization**

### **Touch-Friendly Interface**
```tsx
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const mobileOptimizations = {
  textarea: isMobile ? "h-32 text-lg" : "h-24 text-base",
  buttons: isMobile ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm",
  spacing: isMobile ? "space-y-4" : "space-y-2"
};
```

### **Voice Input Optimization**
```tsx
const optimizeForMobile = () => {
  if (isMobile) {
    // Enable voice by default on mobile
    return { enableVoice: true, enableFileUpload: false };
  }
  return { enableVoice: true, enableFileUpload: true };
};
```

## 🔄 **Error Handling**

### **Graceful Degradation**
```tsx
const handleAIError = (error: Error) => {
  if (error.message.includes('rate limit')) {
    return { fallback: 'rate_limited', retryAfter: 60 };
  }
  
  if (error.message.includes('quota exceeded')) {
    return { fallback: 'quota_exceeded', message: 'AI processing temporarily unavailable' };
  }
  
  return { fallback: 'error', message: 'Processing failed, please try again' };
};
```

### **Retry Logic**
```tsx
const retryWithBackoff = async (fn: Function, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
```

## 📊 **Monitoring & Analytics**

### **Performance Tracking**
```tsx
const trackPerformance = (startTime: number, endTime: number, success: boolean) => {
  const duration = endTime - startTime;
  
  // Send to analytics service
  analytics.track('ai_processing', {
    duration,
    success,
    timestamp: new Date().toISOString()
  });
};
```

### **Error Tracking**
```tsx
const trackError = (error: Error, context: any) => {
  // Send to error tracking service
  errorTracker.captureException(error, {
    extra: context,
    tags: { component: 'conversational_input', integration: 'ai' }
  });
};
```

## 🚀 **Next Steps**

1. **Explore Integrations**: Try each AI integration example
2. **Customize Prompts**: Modify prompts for your specific use case
3. **Add Providers**: Implement additional AI providers (Anthropic, Cohere, etc.)
4. **Optimize**: Add caching, streaming, and performance improvements
5. **Deploy**: Integrate into your production application

## 📖 **Additional Resources**

- **Main README**: See the root README.md for comprehensive documentation
- **Examples**: Check `src/examples/` for usage examples
- **AI Integration Guide**: See `AI_INTEGRATION.md` for detailed setup instructions
- **Types**: Explore `src/types/` for TypeScript interfaces

---

**Ready to build intelligent conversational AI interfaces? Start with these integrations! 🚀**
