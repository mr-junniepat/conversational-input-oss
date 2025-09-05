export interface AIProvider {
  name: string;
  apiKey?: string;
  endpoint?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ProcessingOptions {
  extractStructuredData?: boolean;
  schema?: Record<string, any>;
  clarificationMode?: boolean;
  language?: string;
  systemPrompt?: string;
  userPromptTemplate?: string;
  customPromptBuilder?: (text: string, files?: File[], options?: ProcessingOptions) => {
    systemPrompt: string;
    userPrompt: string;
  };
}

export class AIServiceManager {
  private providers: Map<string, AIProvider> = new Map();

  constructor() {
    // Initialize with default providers
    this.initializeDefaultProviders();
  }

  private initializeDefaultProviders() {
    // OpenAI
    this.providers.set('openai', {
      name: 'OpenAI',
      model: 'gpt-3.5-turbo',
      maxTokens: 1000,
      temperature: 0.1
    });

    // Anthropic
    this.providers.set('anthropic', {
      name: 'Anthropic',
      model: 'claude-3-haiku-20240307',
      maxTokens: 1000,
      temperature: 0.1
    });

    // Mistral Cloud
    this.providers.set('mistral', {
      name: 'Mistral Cloud',
      model: 'mistral-large-latest',
      maxTokens: 1000,
      temperature: 0.1
    });

    // LM Studio
    this.providers.set('lmstudio', {
      name: 'LM Studio',
      endpoint: 'http://localhost:1234/v1/chat/completions',
      model: 'openai/gpt-oss-20b',
      maxTokens: 1000,
      temperature: 0.1
    });

    // Ollama
    this.providers.set('ollama', {
      name: 'Ollama',
      endpoint: 'http://localhost:11434/api/generate',
      model: 'mixtral',
      maxTokens: 1000,
      temperature: 0.1
    });

    // Google Gemini
    this.providers.set('gemini', {
      name: 'Google Gemini',
      model: 'gemini-pro',
      maxTokens: 1000,
      temperature: 0.1
    });
  }

  /**
   * Configure a provider with API key or endpoint
   */
  configureProvider(providerId: string, config: Partial<AIProvider>): void {
    const existing = this.providers.get(providerId);
    if (existing) {
      this.providers.set(providerId, { ...existing, ...config });
    } else {
      this.providers.set(providerId, {
        name: providerId,
        ...config
      });
    }
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Check if a provider is properly configured
   */
  isProviderConfigured(providerId: string): boolean {
    const provider = this.providers.get(providerId);
    if (!provider) return false;

    // Check if provider has required configuration
    switch (providerId) {
      case 'openai':
      case 'anthropic':
      case 'mistral':
      case 'gemini':
        return !!provider.apiKey;
      case 'lmstudio':
      case 'ollama':
        return !!provider.endpoint;
      default:
        return false;
    }
  }

  /**
   * Process text with the specified AI provider
   */
  async processText(
    providerId: string,
    text: string,
    files?: File[],
    options: ProcessingOptions = {}
  ): Promise<AIResponse> {
    const provider = this.providers.get(providerId);
    if (!provider) {
      return {
        success: false,
        error: `Provider '${providerId}' not found`
      };
    }

    if (!this.isProviderConfigured(providerId)) {
      return {
        success: false,
        error: `Provider '${providerId}' is not properly configured. Please provide API key or endpoint.`
      };
    }

    try {
      switch (providerId) {
        case 'openai':
          return await this.processWithOpenAI(provider, text, files, options);
        case 'anthropic':
          return await this.processWithAnthropic(provider, text, files, options);
        case 'mistral':
          return await this.processWithMistral(provider, text, files, options);
        case 'lmstudio':
          return await this.processWithLMStudio(provider, text, files, options);
        case 'ollama':
          return await this.processWithOllama(provider, text, files, options);
        case 'gemini':
          return await this.processWithGemini(provider, text, files, options);
        default:
          return {
            success: false,
            error: `Provider '${providerId}' is not supported`
          };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async processWithOpenAI(
    provider: AIProvider,
    text: string,
    files?: File[],
    options: ProcessingOptions = {}
  ): Promise<AIResponse> {
    const prompt = this.buildPrompt(text, files, options);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: provider.model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(options)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: provider.maxTokens || 1000,
        temperature: provider.temperature || 0.1,
        response_format: options.extractStructuredData ? { type: 'json_object' } : undefined
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data: this.parseAIResponse(data, options),
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
  }

  private async processWithAnthropic(
    provider: AIProvider,
    text: string,
    files?: File[],
    options: ProcessingOptions = {}
  ): Promise<AIResponse> {
    const prompt = this.buildPrompt(text, files, options);
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': provider.apiKey!,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: provider.model || 'claude-3-haiku-20240307',
        max_tokens: provider.maxTokens || 1000,
        temperature: provider.temperature || 0.1,
        system: this.getSystemPrompt(options),
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data: this.parseAIResponse(data, options),
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0)
      }
    };
  }

  private async processWithMistral(
    provider: AIProvider,
    text: string,
    files?: File[],
    options: ProcessingOptions = {}
  ): Promise<AIResponse> {
    const prompt = this.buildPrompt(text, files, options);

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: provider.model || 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(options)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: provider.maxTokens || 1000,
        temperature: provider.temperature || 0.1,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data: this.parseAIResponse(data, options),
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
  }

  private async processWithLMStudio(
    provider: AIProvider,
    text: string,
    files?: File[],
    options: ProcessingOptions = {}
  ): Promise<AIResponse> {
    const prompt = this.buildPrompt(text, files, options);
    
    const response = await fetch(provider.endpoint!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: provider.model || 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(options)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: provider.maxTokens || 1000,
        temperature: provider.temperature || 0.1,
        stream: false
        // Note: Local models don't support response_format, so we omit it
      })
    });

    if (!response.ok) {
      throw new Error(`LM Studio API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data: this.parseAIResponse(data, options),
      usage: {
        promptTokens: 0, // LM Studio doesn't provide usage stats
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }

  private async processWithOllama(
    provider: AIProvider,
    text: string,
    files?: File[],
    options: ProcessingOptions = {}
  ): Promise<AIResponse> {
    const prompt = this.buildPrompt(text, files, options);
    
    const response = await fetch(provider.endpoint!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: provider.model || 'mixtral',
        prompt: `${this.getSystemPrompt(options)}\n\nUser: ${prompt}`,
        stream: false,
        options: {
          temperature: provider.temperature || 0.1,
          num_predict: provider.maxTokens || 1000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data: this.parseAIResponse(data, options),
      usage: {
        promptTokens: 0, // Ollama doesn't provide usage stats
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }

  private async processWithGemini(
    provider: AIProvider,
    text: string,
    files?: File[],
    options: ProcessingOptions = {}
  ): Promise<AIResponse> {
    const prompt = this.buildPrompt(text, files, options);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${provider.model || 'gemini-pro'}:generateContent?key=${provider.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${this.getSystemPrompt(options)}\n\nUser: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: provider.temperature || 0.1,
          maxOutputTokens: provider.maxTokens || 1000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data: this.parseAIResponse(data, options),
      usage: {
        promptTokens: 0, // Gemini doesn't provide detailed usage stats
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }

  private buildPrompt(text: string, files?: File[], options: ProcessingOptions = {}): string {
    // Use custom prompt builder if provided
    if (options.customPromptBuilder) {
      const customPrompts = options.customPromptBuilder(text, files, options);
      return customPrompts.userPrompt;
    }

    // Use custom user prompt template if provided
    if (options.userPromptTemplate) {
      let prompt = options.userPromptTemplate;
      
      // Replace placeholders
      prompt = prompt.replace(/{text}/g, text);
      prompt = prompt.replace(/{files}/g, files && files.length > 0 
        ? files.map(f => f.name).join(', ') 
        : 'No files attached');
      
      return prompt;
    }

    // Default prompt building
    let prompt = `User Input: ${text}`;
    
    if (files && files.length > 0) {
      prompt += `\n\nAttached Files: ${files.map(f => f.name).join(', ')}`;
      // Note: In a real implementation, you'd process the file contents here
    }
    
    if (options.extractStructuredData && options.schema) {
      prompt += `\n\nPlease extract the following information and return it as JSON:`;
      Object.entries(options.schema).forEach(([key, value]) => {
        prompt += `\n- ${key}: ${value}`;
      });
    }
    
    return prompt;
  }

  private getSystemPrompt(options: ProcessingOptions = {}): string {
    // Use custom prompt builder if provided
    if (options.customPromptBuilder) {
      const customPrompts = options.customPromptBuilder('', [], options);
      return customPrompts.systemPrompt;
    }

    // Use custom system prompt if provided
    if (options.systemPrompt) {
      return options.systemPrompt;
    }

    // Default system prompt building
    let systemPrompt = "You are a helpful AI assistant that processes user input and extracts relevant information.";
    
    if (options.extractStructuredData) {
      systemPrompt += " Extract the requested information and return it as structured JSON data.";
    }
    
    if (options.clarificationMode) {
      systemPrompt += " If information is missing or unclear, ask clarifying questions to help the user provide better input.";
    }
    
    if (options.language) {
      systemPrompt += ` Respond in ${options.language}.`;
    }
    
    return systemPrompt;
  }

  private parseAIResponse(data: any, options: ProcessingOptions = {}): any {
    if (options.extractStructuredData) {
      try {
        // Try to parse JSON response
        const content = data.choices?.[0]?.message?.content || 
                       data.content?.[0]?.parts?.[0]?.text || 
                       data.response;
        
        if (content) {
          return JSON.parse(content);
        }
      } catch (error) {
        // If JSON parsing fails, return the raw content
        return data.choices?.[0]?.message?.content || 
               data.content?.[0]?.parts?.[0]?.text || 
               data.response || 
               data;
      }
    }
    
    return data.choices?.[0]?.message?.content || 
           data.content?.[0]?.parts?.[0]?.text || 
           data.response || 
           data;
  }
}

// Export a singleton instance
export const aiServiceManager = new AIServiceManager();
