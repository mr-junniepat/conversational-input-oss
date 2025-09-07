/**
 * Security utilities for conversational input component
 * Handles PII detection, prompt injection defense, and input sanitization
 */

export interface SecurityConfig {
  enablePiiDetection: boolean;
  enableProfanityFilter: boolean;
  enablePromptInjectionDefense: boolean;
  minLength: number;
  maxLength: number;
  allowedFileTypes: string[];
  maxFileSize: number;
  retentionDays: number;
}

export interface PiiDetectionResult {
  hasPii: boolean;
  detectedTypes: string[];
  redactedText: string;
  confidence: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// PII detection patterns
const PII_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g,
  ssn: /\b\d{3}-?\d{2}-?\d{4}\b/g,
  creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
  address: /\b\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b/gi
};

// Common profanity words (basic list - in production, use a comprehensive library)
const PROFANITY_WORDS = new Set([
  'damn', 'hell', 'crap', 'stupid', 'idiot', 'moron'
  // Add more as needed
]);

// Prompt injection patterns
const INJECTION_PATTERNS = [
  /ignore\s+(?:previous\s+)?instructions?/gi,
  /forget\s+(?:previous\s+)?instructions?/gi,
  /system\s*:\s*/gi,
  /assistant\s*:\s*/gi,
  /user\s*:\s*/gi,
  /<\|.*?\|>/g, // Special tokens
  /\[INST\].*?\[\/INST\]/g, // Llama format
  /###\s*(?:system|assistant|user)\s*:/gi // Chat format
];

export class SecurityManager {
  private config: SecurityConfig;

  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = {
      enablePiiDetection: true,
      enableProfanityFilter: true,
      enablePromptInjectionDefense: true,
      minLength: 10,
      maxLength: 5000,
      allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
      maxFileSize: 10 * 1024 * 1024, // 10MB
      retentionDays: 30,
      ...config
    };
  }

  /**
   * Detect PII in text
   */
  detectPii(text: string): PiiDetectionResult {
    if (!this.config.enablePiiDetection) {
      return {
        hasPii: false,
        detectedTypes: [],
        redactedText: text,
        confidence: 0
      };
    }

    const detectedTypes: string[] = [];
    let redactedText = text;
    let totalMatches = 0;

    Object.entries(PII_PATTERNS).forEach(([type, pattern]) => {
      const matches = text.match(pattern);
      if (matches) {
        detectedTypes.push(type);
        totalMatches += matches.length;
        
        // Redact PII
        redactedText = redactedText.replace(pattern, `[${type.toUpperCase()}_REDACTED]`);
      }
    });

    const confidence = Math.min(totalMatches / 10, 1); // Simple confidence scoring

    return {
      hasPii: detectedTypes.length > 0,
      detectedTypes,
      redactedText,
      confidence
    };
  }

  /**
   * Check for profanity
   */
  checkProfanity(text: string): boolean {
    if (!this.config.enableProfanityFilter) {
      return false;
    }

    const words = text.toLowerCase().split(/\s+/);
    return words.some(word => PROFANITY_WORDS.has(word));
  }

  /**
   * Detect prompt injection attempts
   */
  detectPromptInjection(text: string): boolean {
    if (!this.config.enablePromptInjectionDefense) {
      return false;
    }

    return INJECTION_PATTERNS.some(pattern => pattern.test(text));
  }

  /**
   * Sanitize text input
   */
  sanitizeInput(text: string): string {
    let sanitized = text;

    // Remove prompt injection patterns
    if (this.config.enablePromptInjectionDefense) {
      INJECTION_PATTERNS.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
      });
    }

    // Remove excessive whitespace
    sanitized = sanitized.replace(/\s+/g, ' ').trim();

    // Remove potential HTML/script tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');

    return sanitized;
  }

  /**
   * Validate input text
   */
  validateInput(text: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Length validation
    if (text.length < this.config.minLength) {
      errors.push(`Input must be at least ${this.config.minLength} characters`);
    }

    if (text.length > this.config.maxLength) {
      errors.push(`Input must be less than ${this.config.maxLength} characters`);
    }

    // PII detection
    const piiResult = this.detectPii(text);
    if (piiResult.hasPii) {
      warnings.push(`PII detected: ${piiResult.detectedTypes.join(', ')}`);
    }

    // Profanity check
    if (this.checkProfanity(text)) {
      warnings.push('Content may contain inappropriate language');
    }

    // Prompt injection check
    if (this.detectPromptInjection(text)) {
      errors.push('Potential prompt injection detected');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate file upload
   */
  validateFile(file: File): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // File size check
    if (file.size > this.config.maxFileSize) {
      errors.push(`File size exceeds ${this.config.maxFileSize / (1024 * 1024)}MB limit`);
    }

    // File type check
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!this.config.allowedFileTypes.includes(extension)) {
      errors.push(`File type ${extension} not allowed`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Check if voice input is safe for current origin
   */
  isVoiceInputSafe(): boolean {
    if (typeof window === 'undefined') {
      return false; // SSR
    }

    // Check if HTTPS or localhost
    const isSecure = window.location.protocol === 'https:' || 
                    window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1';

    return isSecure;
  }

  /**
   * Get security recommendations
   */
  getSecurityRecommendations(): string[] {
    const recommendations: string[] = [];

    if (!this.isVoiceInputSafe()) {
      recommendations.push('Voice input requires HTTPS in production');
    }

    if (this.config.enablePiiDetection) {
      recommendations.push('PII detection is enabled - review detected data');
    }

    if (this.config.enablePromptInjectionDefense) {
      recommendations.push('Prompt injection defense is active');
    }

    return recommendations;
  }
}

// Default security manager instance
export const defaultSecurityManager = new SecurityManager();

// Utility functions
export const sanitizeText = (text: string): string => {
  return defaultSecurityManager.sanitizeInput(text);
};

export const validateText = (text: string): ValidationResult => {
  return defaultSecurityManager.validateInput(text);
};

export const detectPii = (text: string): PiiDetectionResult => {
  return defaultSecurityManager.detectPii(text);
};

export const isVoiceSafe = (): boolean => {
  return defaultSecurityManager.isVoiceInputSafe();
};
