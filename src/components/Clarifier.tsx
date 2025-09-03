import React from 'react';
import { HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';

export interface ClarifierProps {
  /** The question or clarification needed */
  question: string;
  
  /** Type of clarification */
  type?: 'info' | 'warning' | 'error' | 'success';
  
  /** Whether to show the clarifier */
  show?: boolean;
  
  /** Callback when user provides clarification */
  onClarify?: (response: string) => void;
  
  /** Suggested responses or options */
  suggestions?: string[];
  
  /** Whether to show input field */
  showInput?: boolean;
  
  /** Placeholder for input field */
  inputPlaceholder?: string;
  
  /** Custom styling */
  className?: string;
  
  /** Whether the clarifier is dismissible */
  dismissible?: boolean;
  
  /** Callback when dismissed */
  onDismiss?: () => void;
}

export const Clarifier: React.FC<ClarifierProps> = ({
  question,
  type = 'info',
  show = true,
  onClarify,
  suggestions = [],
  showInput = true,
  inputPlaceholder = "Please provide more details...",
  className = "",
  dismissible = false,
  onDismiss,
}) => {
  const [response, setResponse] = React.useState('');
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim() && onClarify) {
      onClarify(response.trim());
      setResponse('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onClarify) {
      onClarify(suggestion);
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <HelpCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getTypeStyles()} ${className}`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium leading-relaxed">
              {question}
            </p>
            
            {dismissible && onDismiss && (
              <button
                onClick={onDismiss}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium mb-2 opacity-75">
                Suggested responses:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 text-xs bg-white/50 hover:bg-white/70 rounded-full border border-current/20 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Field */}
          {showInput && (
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder={inputPlaceholder}
                  className="flex-1 px-3 py-2 text-sm bg-white/70 border border-current/20 rounded-md focus:outline-none focus:ring-2 focus:ring-current/40 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!response.trim()}
                  className="px-4 py-2 text-sm bg-current text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  Submit
                </button>
              </div>
            </form>
          )}

          {/* Expandable Details */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-current/20">
              <p className="text-xs opacity-75">
                This clarification helps us better understand your needs and provide more accurate assistance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clarifier;
