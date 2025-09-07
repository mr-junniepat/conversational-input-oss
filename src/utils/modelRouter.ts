/**
 * Smart model routing system
 * Routes requests to appropriate models based on latency, cost, PII sensitivity, and other factors
 */

export interface ModelConfig {
  name: string;
  provider: 'openai' | 'anthropic' | 'mistral' | 'ollama' | 'local';
  model: string;
  endpoint?: string;
  apiKey?: string;
  maxTokens: number;
  costPerToken: number; // in USD
  avgLatency: number; // in milliseconds
  supportsPii: boolean;
  supportsStreaming: boolean;
  maxContextLength: number;
  capabilities: string[];
}

export interface RoutingCriteria {
  hasPii: boolean;
  latencyRequirement?: number; // max acceptable latency in ms
  costSensitivity?: 'low' | 'medium' | 'high';
  contextLength: number;
  requiredCapabilities?: string[];
  preferredProvider?: string;
  maxCost?: number; // max cost in USD
}

export interface RoutingDecision {
  selectedModel: ModelConfig;
  reason: string;
  estimatedCost: number;
  estimatedLatency: number;
  fallbackModels: ModelConfig[];
}

export interface RetryConfig {
  maxRetries: number;
  backoffMultiplier: number;
  maxBackoffDelay: number;
  retryableErrors: string[];
}

export class ModelRouter {
  private models: ModelConfig[] = [];
  private retryConfig: RetryConfig;

  constructor(retryConfig: Partial<RetryConfig> = {}) {
    this.retryConfig = {
      maxRetries: 3,
      backoffMultiplier: 2,
      maxBackoffDelay: 10000,
      retryableErrors: ['timeout', 'rate_limit', 'server_error', 'network_error'],
      ...retryConfig
    };

    this.initializeDefaultModels();
  }

  /**
   * Add a model configuration
   */
  addModel(model: ModelConfig): void {
    this.models.push(model);
  }

  /**
   * Route request to appropriate model
   */
  routeRequest(criteria: RoutingCriteria): RoutingDecision {
    const availableModels = this.models.filter(model => 
      this.isModelAvailable(model, criteria)
    );

    if (availableModels.length === 0) {
      throw new Error('No available models match the criteria');
    }

    // Score models based on criteria
    const scoredModels = availableModels.map(model => ({
      model,
      score: this.calculateModelScore(model, criteria)
    }));

    // Sort by score (higher is better)
    scoredModels.sort((a, b) => b.score - a.score);

    const selectedModel = scoredModels[0].model;
    const fallbackModels = scoredModels.slice(1, 4).map(s => s.model);

    return {
      selectedModel,
      reason: this.getRoutingReason(selectedModel, criteria),
      estimatedCost: this.calculateCost(selectedModel, criteria.contextLength),
      estimatedLatency: selectedModel.avgLatency,
      fallbackModels
    };
  }

  /**
   * Execute request with automatic retry and fallback
   */
  async executeRequest(
    criteria: RoutingCriteria,
    requestData: any,
    onRetry?: (attempt: number, error: Error) => void
  ): Promise<any> {
    let lastError: Error | null = null;
    let attempt = 0;

    while (attempt <= this.retryConfig.maxRetries) {
      try {
        const decision = this.routeRequest(criteria);
        const result = await this.callModel(decision.selectedModel, requestData);
        
        // Log successful request
        console.log(`Request successful with ${decision.selectedModel.name} (attempt ${attempt + 1})`);
        
        return {
          result,
          model: decision.selectedModel,
          attempt: attempt + 1,
          cost: decision.estimatedCost,
          latency: Date.now() - Date.now() // This would be actual timing in real implementation
        };
      } catch (error) {
        lastError = error as Error;
        attempt++;

        if (attempt <= this.retryConfig.maxRetries) {
          const delay = this.calculateBackoffDelay(attempt);
          console.log(`Request failed (attempt ${attempt}), retrying in ${delay}ms:`, error);
          
          if (onRetry) {
            onRetry(attempt, lastError);
          }

          await this.sleep(delay);
        }
      }
    }

    throw new Error(`Request failed after ${this.retryConfig.maxRetries} attempts: ${lastError?.message}`);
  }

  /**
   * Check if model is available for criteria
   */
  private isModelAvailable(model: ModelConfig, criteria: RoutingCriteria): boolean {
    // Check context length
    if (criteria.contextLength > model.maxContextLength) {
      return false;
    }

    // Check PII requirements
    if (criteria.hasPii && !model.supportsPii) {
      return false;
    }

    // Check latency requirements
    if (criteria.latencyRequirement && model.avgLatency > criteria.latencyRequirement) {
      return false;
    }

    // Check cost requirements
    if (criteria.maxCost) {
      const estimatedCost = this.calculateCost(model, criteria.contextLength);
      if (estimatedCost > criteria.maxCost) {
        return false;
      }
    }

    // Check required capabilities
    if (criteria.requiredCapabilities) {
      const hasAllCapabilities = criteria.requiredCapabilities.every(capability =>
        model.capabilities.includes(capability)
      );
      if (!hasAllCapabilities) {
        return false;
      }
    }

    // Check preferred provider
    if (criteria.preferredProvider && model.provider !== criteria.preferredProvider) {
      return false;
    }

    return true;
  }

  /**
   * Calculate model score based on criteria
   */
  private calculateModelScore(model: ModelConfig, criteria: RoutingCriteria): number {
    let score = 100; // Base score

    // Cost sensitivity
    const cost = this.calculateCost(model, criteria.contextLength);
    switch (criteria.costSensitivity) {
      case 'high':
        score -= cost * 1000; // Heavily penalize cost
        break;
      case 'medium':
        score -= cost * 100;
        break;
      case 'low':
        score -= cost * 10;
        break;
    }

    // Latency preference
    if (criteria.latencyRequirement) {
      const latencyRatio = model.avgLatency / criteria.latencyRequirement;
      score -= latencyRatio * 20;
    }

    // PII handling bonus
    if (criteria.hasPii && model.supportsPii) {
      score += 50;
    }

    // Local model preference for sensitive data
    if (criteria.hasPii && model.provider === 'local') {
      score += 100;
    }

    // Provider preference
    if (criteria.preferredProvider && model.provider === criteria.preferredProvider) {
      score += 30;
    }

    return Math.max(0, score);
  }

  /**
   * Calculate estimated cost
   */
  private calculateCost(model: ModelConfig, contextLength: number): number {
    // Simple cost calculation based on context length
    const tokens = Math.ceil(contextLength / 4); // Rough token estimation
    return tokens * model.costPerToken;
  }

  /**
   * Get routing reason
   */
  private getRoutingReason(model: ModelConfig, criteria: RoutingCriteria): string {
    const reasons: string[] = [];

    if (criteria.hasPii && model.supportsPii) {
      reasons.push('PII-safe model');
    }

    if (criteria.costSensitivity === 'high' && model.costPerToken < 0.001) {
      reasons.push('low-cost option');
    }

    if (criteria.latencyRequirement && model.avgLatency < criteria.latencyRequirement) {
      reasons.push('meets latency requirements');
    }

    if (model.provider === 'local') {
      reasons.push('local processing');
    }

    return reasons.join(', ') || 'best available option';
  }

  /**
   * Call model API
   */
  private async callModel(model: ModelConfig, requestData: any): Promise<any> {
    // This would be the actual API call implementation
    // For now, we'll simulate it
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.1) { // 10% failure rate for simulation
          reject(new Error('Simulated API error'));
        } else {
          resolve({
            model: model.name,
            response: 'Simulated response',
            usage: {
              prompt_tokens: 100,
              completion_tokens: 50,
              total_tokens: 150
            }
          });
        }
      }, model.avgLatency);
    });
  }

  /**
   * Calculate backoff delay
   */
  private calculateBackoffDelay(attempt: number): number {
    const delay = Math.pow(this.retryConfig.backoffMultiplier, attempt) * 1000;
    return Math.min(delay, this.retryConfig.maxBackoffDelay);
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Initialize default models
   */
  private initializeDefaultModels(): void {
    this.models = [
      {
        name: 'GPT-4o',
        provider: 'openai',
        model: 'gpt-4o',
        maxTokens: 128000,
        costPerToken: 0.00003,
        avgLatency: 2000,
        supportsPii: false,
        supportsStreaming: true,
        maxContextLength: 128000,
        capabilities: ['reasoning', 'code', 'analysis']
      },
      {
        name: 'Claude-3.5-Sonnet',
        provider: 'anthropic',
        model: 'claude-3-5-sonnet-20241022',
        maxTokens: 200000,
        costPerToken: 0.000015,
        avgLatency: 1500,
        supportsPii: false,
        supportsStreaming: true,
        maxContextLength: 200000,
        capabilities: ['reasoning', 'analysis', 'safety']
      },
      {
        name: 'Mistral-Small',
        provider: 'mistral',
        model: 'mistral-small-latest',
        maxTokens: 32000,
        costPerToken: 0.000001,
        avgLatency: 1000,
        supportsPii: false,
        supportsStreaming: true,
        maxContextLength: 32000,
        capabilities: ['reasoning', 'analysis']
      },
      {
        name: 'Ollama-Mixtral',
        provider: 'ollama',
        model: 'mixtral',
        endpoint: 'http://localhost:11434',
        maxTokens: 32000,
        costPerToken: 0,
        avgLatency: 500,
        supportsPii: true,
        supportsStreaming: true,
        maxContextLength: 32000,
        capabilities: ['reasoning', 'local', 'private']
      }
    ];
  }
}

// Default model router instance
export const defaultModelRouter = new ModelRouter();

// Utility functions
export const routeRequest = (criteria: RoutingCriteria): RoutingDecision => {
  return defaultModelRouter.routeRequest(criteria);
};

export const executeRequest = async (
  criteria: RoutingCriteria,
  requestData: any,
  onRetry?: (attempt: number, error: Error) => void
): Promise<any> => {
  return defaultModelRouter.executeRequest(criteria, requestData, onRetry);
};
