
import React, { useState, useCallback } from 'react';
import { getAiSuggestion } from '../services/geminiService';
import { promptConfig } from '../constants';
import type { Language } from '../types';

interface AiSuggestButtonProps {
    currentLang: Language;
    keyword: string;
    onSuggestionReceived: (suggestion: string) => void;
}

const AiSuggestButton: React.FC<AiSuggestButtonProps> = ({ currentLang, keyword, onSuggestionReceived }) => {
    const [isLoading, setIsLoading] = useState(false);
    const i18n = promptConfig.i18n[currentLang];

    const handleSuggest = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!keyword || isLoading) return;

        setIsLoading(true);
        try {
            const suggestion = await getAiSuggestion(keyword);
            if (suggestion) {
                onSuggestionReceived(suggestion);
            }
        } catch (error) {
            console.error("AI Suggestion failed", error);
        } finally {
            setIsLoading(false);
        }
    }, [keyword, isLoading, onSuggestionReceived]);

    return (
        <button
            onClick={handleSuggest}
            disabled={isLoading || !keyword}
            className="bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white rounded-lg p-2.5 absolute right-2 top-1/2 -translate-y-1/2 transform transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={i18n.ai_suggest_label}
            data-tooltip-id="app-tooltip"
            data-tooltip-content={isLoading ? i18n.ai_suggest_loading : i18n.ai_suggest_label}
        >
            {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707a.5.5 0 0 0 0-.707ZM7.293 4L8 3.293a.5.5 0 1 0-.707-.707L6.586 3.5a.5.5 0 0 0 0 .707.5.5 0 0 0 .707 0Zm-.195-2.435a.5.5 0 1 0-1 0v1.829a.5.5 0 0 0 1 0V1.565Z M4.293 6L5 5.293a.5.5 0 1 0-.707-.707L3.586 5.5a.5.5 0 0 0 0 .707.5.5 0 0 0 .707 0Zm-.195-2.435a.5.5 0 1 0-1 0v1.829a.5.5 0 0 0 1 0V3.565Z"/>
                    <path d="M10 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9.08-4.043a.5.5 0 0 1 .707 0l1.293 1.293a.5.5 0 1 1-.707.707L.92 9.25a.5.5 0 0 1 0-.707Zm12.364-.001a.5.5 0 0 1 0 .707l-1.293 1.293a.5.5 0 1 1-.707-.707l1.293-1.293a.5.5 0 0 1 .707 0Z"/>
                </svg>
            )}
        </button>
    );
};

export default AiSuggestButton;
