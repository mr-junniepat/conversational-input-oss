import { VoiceRecognitionHook } from '../types';
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
export declare function useVoiceRecognition(): VoiceRecognitionHook;
//# sourceMappingURL=useVoiceRecognition.d.ts.map