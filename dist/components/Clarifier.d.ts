import React from 'react';
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
export declare const Clarifier: React.FC<ClarifierProps>;
export default Clarifier;
//# sourceMappingURL=Clarifier.d.ts.map