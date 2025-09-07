/**
 * Next.js API Route for Ollama Processing
 * This file should be placed in pages/api/ollama/process.ts or app/api/ollama/process/route.ts
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { SecurityManager } from '../../utils/security';
import { logAIProcessing } from '../../utils/audit';

// Security manager for server-side validation
const securityManager = new SecurityManager({
  enablePiiDetection: true,
  enableProfanityFilter: true,
  enablePromptInjectionDefense: true,
  minLength: 10,
  maxLength: 5000
});

interface OllamaRequest {
  text: string;
  files?: Array<{
    name: string;
    size: number;
    type: string;
  }>;
  config: {
    model: string;
    endpoint: string;
    maxTokens?: number;
    temperature?: number;
  };
}

interface OllamaResponse {
  extractedData: any;
  model: string;
  processingTime: number;
  hasPii: boolean;
  confidence: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();
  let userId = 'anonymous';
  let sessionId = 'unknown';

  try {
    // Extract request data
    const { text, files, config }: OllamaRequest = req.body;

    // Validate required fields
    if (!text || !config?.model || !config?.endpoint) {
      return res.status(400).json({
        error: 'Missing required fields: text, config.model, config.endpoint'
      });
    }

    // Server-side security validation
    const validation = securityManager.validateInput(text);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Input validation failed',
        details: validation.errors
      });
    }

    // Detect PII
    const piiResult = securityManager.detectPii(text);
    
    // Sanitize input
    const sanitizedText = securityManager.sanitizeInput(text);

    // Prepare Ollama request
    const ollamaRequest = {
      model: config.model,
      prompt: `Extract structured information from the following text and return it as JSON. Focus on key details like names, dates, locations, and important facts:\n\n${sanitizedText}`,
      stream: false,
      options: {
        temperature: config.temperature || 0.1,
        max_tokens: config.maxTokens || 1000
      }
    };

    // Call Ollama API
    const ollamaResponse = await fetch(`${config.endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ollamaRequest),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.status}`);
    }

    const ollamaData = await ollamaResponse.json();
    
    // Parse the response
    let extractedData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = ollamaData.response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: create structured data from the response
        extractedData = {
          content: ollamaData.response,
          summary: ollamaData.response.substring(0, 200) + '...'
        };
      }
    } catch (parseError) {
      // If JSON parsing fails, return the raw response
      extractedData = {
        content: ollamaData.response,
        raw_response: true
      };
    }

    const processingTime = Date.now() - startTime;

    // Log the AI processing event
    logAIProcessing(
      userId,
      sessionId,
      text,
      extractedData,
      config.model,
      'ollama',
      processingTime,
      0.8 // Confidence score
    );

    // Prepare response
    const response: OllamaResponse = {
      extractedData,
      model: config.model,
      processingTime,
      hasPii: piiResult.hasPii,
      confidence: piiResult.confidence
    };

    // Add security warnings if needed
    if (piiResult.hasPii) {
      response.extractedData._security_warnings = {
        pii_detected: piiResult.detectedTypes,
        confidence: piiResult.confidence
      };
    }

    return res.status(200).json(response);

  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    console.error('Ollama processing error:', error);
    
    // Log the error
    logAIProcessing(
      userId,
      sessionId,
      req.body?.text || '',
      { error: error instanceof Error ? error.message : 'Unknown error' },
      req.body?.config?.model || 'unknown',
      'ollama',
      processingTime,
      0
    );

    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// For App Router (app/api/ollama/process/route.ts)
export async function POST(request: Request) {
  const startTime = Date.now();
  let userId = 'anonymous';
  let sessionId = 'unknown';

  try {
    const body = await request.json();
    const { text, files, config }: OllamaRequest = body;

    // Validate required fields
    if (!text || !config?.model || !config?.endpoint) {
      return Response.json({
        error: 'Missing required fields: text, config.model, config.endpoint'
      }, { status: 400 });
    }

    // Server-side security validation
    const validation = securityManager.validateInput(text);
    if (!validation.isValid) {
      return Response.json({
        error: 'Input validation failed',
        details: validation.errors
      }, { status: 400 });
    }

    // Detect PII
    const piiResult = securityManager.detectPii(text);
    
    // Sanitize input
    const sanitizedText = securityManager.sanitizeInput(text);

    // Prepare Ollama request
    const ollamaRequest = {
      model: config.model,
      prompt: `Extract structured information from the following text and return it as JSON. Focus on key details like names, dates, locations, and important facts:\n\n${sanitizedText}`,
      stream: false,
      options: {
        temperature: config.temperature || 0.1,
        max_tokens: config.maxTokens || 1000
      }
    };

    // Call Ollama API
    const ollamaResponse = await fetch(`${config.endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ollamaRequest),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.status}`);
    }

    const ollamaData = await ollamaResponse.json();
    
    // Parse the response
    let extractedData;
    try {
      const jsonMatch = ollamaData.response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0]);
      } else {
        extractedData = {
          content: ollamaData.response,
          summary: ollamaData.response.substring(0, 200) + '...'
        };
      }
    } catch (parseError) {
      extractedData = {
        content: ollamaData.response,
        raw_response: true
      };
    }

    const processingTime = Date.now() - startTime;

    // Log the AI processing event
    logAIProcessing(
      userId,
      sessionId,
      text,
      extractedData,
      config.model,
      'ollama',
      processingTime,
      0.8
    );

    // Prepare response
    const response: OllamaResponse = {
      extractedData,
      model: config.model,
      processingTime,
      hasPii: piiResult.hasPii,
      confidence: piiResult.confidence
    };

    if (piiResult.hasPii) {
      response.extractedData._security_warnings = {
        pii_detected: piiResult.detectedTypes,
        confidence: piiResult.confidence
      };
    }

    return Response.json(response);

  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    console.error('Ollama processing error:', error);
    
    logAIProcessing(
      userId,
      sessionId,
      body?.text || '',
      { error: error instanceof Error ? error.message : 'Unknown error' },
      body?.config?.model || 'unknown',
      'ollama',
      processingTime,
      0
    );

    return Response.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
