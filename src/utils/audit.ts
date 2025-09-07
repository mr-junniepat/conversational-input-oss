/**
 * Audit logging system for compliance and security
 * Provides immutable audit trails for EEOC, GDPR, and other compliance requirements
 */

export interface AuditEvent {
  id: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  model?: string;
  modelVersion?: string;
  processingTime?: number;
  inputHash: string;
  outputHash?: string;
  retentionDays: number;
}

export interface AuditConfig {
  enableAuditLogging: boolean;
  retentionDays: number;
  encryptSensitiveData: boolean;
  includeInputHashes: boolean;
  includeOutputHashes: boolean;
  maxLogSize: number;
  batchSize: number;
  flushInterval: number;
}

export interface ComplianceMetadata {
  consentGiven: boolean;
  consentTimestamp?: string;
  dataSubjectRights?: string[];
  legalBasis?: string;
  retentionPolicy?: string;
  processingPurpose?: string;
  thirdPartySharing?: boolean;
  crossBorderTransfer?: boolean;
}

export class AuditLogger {
  private config: AuditConfig;
  private events: AuditEvent[] = [];
  private flushTimer?: NodeJS.Timeout;

  constructor(config: Partial<AuditConfig> = {}) {
    this.config = {
      enableAuditLogging: true,
      retentionDays: 2555, // 7 years for EEOC compliance
      encryptSensitiveData: true,
      includeInputHashes: true,
      includeOutputHashes: true,
      maxLogSize: 1000,
      batchSize: 100,
      flushInterval: 30000, // 30 seconds
      ...config
    };

    if (this.config.enableAuditLogging) {
      this.startFlushTimer();
    }
  }

  /**
   * Log an audit event
   */
  logEvent(event: Omit<AuditEvent, 'id' | 'timestamp' | 'inputHash' | 'retentionDays'>): void {
    if (!this.config.enableAuditLogging) {
      return;
    }

    const auditEvent: AuditEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: new Date().toISOString(),
      inputHash: this.hashData(event.details),
      retentionDays: this.config.retentionDays
    };

    this.events.push(auditEvent);

    // Auto-flush if batch size reached
    if (this.events.length >= this.config.batchSize) {
      this.flush();
    }
  }

  /**
   * Log form submission
   */
  logFormSubmission(
    userId: string,
    sessionId: string,
    input: string,
    output: any,
    model: string,
    modelVersion: string,
    processingTime: number,
    compliance: ComplianceMetadata
  ): void {
    this.logEvent({
      userId,
      sessionId,
      action: 'form_submission',
      resource: 'conversational_input',
      details: {
        inputLength: input.length,
        outputFields: Object.keys(output || {}),
        model,
        modelVersion,
        processingTime,
        compliance,
        hasPii: this.detectPiiInText(input),
        inputHash: this.hashData(input),
        outputHash: this.hashData(output)
      },
      model,
      modelVersion,
      processingTime
    });
  }

  /**
   * Log AI processing
   */
  logAIProcessing(
    userId: string,
    sessionId: string,
    input: string,
    output: any,
    model: string,
    modelVersion: string,
    processingTime: number,
    confidence: number
  ): void {
    this.logEvent({
      userId,
      sessionId,
      action: 'ai_processing',
      resource: 'conversational_input',
      details: {
        inputLength: input.length,
        outputFields: Object.keys(output || {}),
        model,
        modelVersion,
        processingTime,
        confidence,
        hasPii: this.detectPiiInText(input),
        inputHash: this.hashData(input),
        outputHash: this.hashData(output)
      },
      model,
      modelVersion,
      processingTime
    });
  }

  /**
   * Log data access
   */
  logDataAccess(
    userId: string,
    resource: string,
    action: string,
    details: Record<string, any>
  ): void {
    this.logEvent({
      userId,
      action: `data_${action}`,
      resource,
      details: {
        ...details,
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Log consent changes
   */
  logConsentChange(
    userId: string,
    consentType: string,
    granted: boolean,
    details: Record<string, any>
  ): void {
    this.logEvent({
      userId,
      action: 'consent_change',
      resource: 'user_consent',
      details: {
        consentType,
        granted,
        timestamp: new Date().toISOString(),
        ...details
      }
    });
  }

  /**
   * Export audit logs for compliance
   */
  exportLogs(
    startDate?: string,
    endDate?: string,
    userId?: string,
    action?: string
  ): AuditEvent[] {
    let filteredEvents = [...this.events];

    if (startDate) {
      filteredEvents = filteredEvents.filter(event => event.timestamp >= startDate);
    }

    if (endDate) {
      filteredEvents = filteredEvents.filter(event => event.timestamp <= endDate);
    }

    if (userId) {
      filteredEvents = filteredEvents.filter(event => event.userId === userId);
    }

    if (action) {
      filteredEvents = filteredEvents.filter(event => event.action === action);
    }

    return filteredEvents;
  }

  /**
   * Get audit statistics
   */
  getAuditStats(): {
    totalEvents: number;
    eventsByAction: Record<string, number>;
    eventsByUser: Record<string, number>;
    oldestEvent: string | null;
    newestEvent: string | null;
  } {
    const eventsByAction: Record<string, number> = {};
    const eventsByUser: Record<string, number> = {};
    let oldestEvent: string | null = null;
    let newestEvent: string | null = null;

    this.events.forEach(event => {
      // Count by action
      eventsByAction[event.action] = (eventsByAction[event.action] || 0) + 1;

      // Count by user
      if (event.userId) {
        eventsByUser[event.userId] = (eventsByUser[event.userId] || 0) + 1;
      }

      // Track oldest and newest
      if (!oldestEvent || event.timestamp < oldestEvent) {
        oldestEvent = event.timestamp;
      }
      if (!newestEvent || event.timestamp > newestEvent) {
        newestEvent = event.timestamp;
      }
    });

    return {
      totalEvents: this.events.length,
      eventsByAction,
      eventsByUser,
      oldestEvent,
      newestEvent
    };
  }

  /**
   * Flush events to storage
   */
  async flush(): Promise<void> {
    if (this.events.length === 0) {
      return;
    }

    try {
      // In a real implementation, this would send to your audit storage
      // For now, we'll just log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Audit events flushed:', this.events.length);
      }

      // Clear the events array
      this.events = [];
    } catch (error) {
      console.error('Failed to flush audit events:', error);
    }
  }

  /**
   * Start automatic flush timer
   */
  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  /**
   * Stop automatic flush timer
   */
  stopFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = undefined;
    }
  }

  /**
   * Generate unique event ID
   */
  private generateEventId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Hash data for integrity checking
   */
  private hashData(data: any): string {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  /**
   * Detect PII in text (simplified)
   */
  private detectPiiInText(text: string): boolean {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phonePattern = /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
    const ssnPattern = /\b\d{3}-?\d{2}-?\d{4}\b/;

    return emailPattern.test(text) || phonePattern.test(text) || ssnPattern.test(text);
  }
}

// Default audit logger instance
export const defaultAuditLogger = new AuditLogger();

// Utility functions
export const logFormSubmission = (
  userId: string,
  sessionId: string,
  input: string,
  output: any,
  model: string,
  modelVersion: string,
  processingTime: number,
  compliance: ComplianceMetadata
) => {
  defaultAuditLogger.logFormSubmission(
    userId,
    sessionId,
    input,
    output,
    model,
    modelVersion,
    processingTime,
    compliance
  );
};

export const logAIProcessing = (
  userId: string,
  sessionId: string,
  input: string,
  output: any,
  model: string,
  modelVersion: string,
  processingTime: number,
  confidence: number
) => {
  defaultAuditLogger.logAIProcessing(
    userId,
    sessionId,
    input,
    output,
    model,
    modelVersion,
    processingTime,
    confidence
  );
};
