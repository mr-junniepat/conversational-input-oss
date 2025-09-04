import React from 'react';
export interface AIProviderConfigProps {
    onConfigure: (config: {
        provider: string;
        apiKey?: string;
        endpoint?: string;
        model?: string;
    }) => void;
    currentConfig?: {
        provider: string;
        apiKey?: string;
        endpoint?: string;
        model?: string;
    };
}
export declare const AIProviderConfig: React.FC<AIProviderConfigProps>;
export default AIProviderConfig;
//# sourceMappingURL=AIProviderConfig.d.ts.map