
import React, { useState } from 'react';
import { promptConfig } from '../constants';
import type { Language } from '../types';

interface CopyButtonProps {
    lang: Language;
    textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ lang, textToCopy }) => {
    const [isCopied, setIsCopied] = useState(false);
    const i18n = promptConfig.i18n[lang];

    const copyToClipboard = () => {
        if (!textToCopy || isCopied) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };
    
    const Tooltip = ({text}: {text: string}) => (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {text}
        </div>
    );

    return (
        <div className="relative group">
            <button
                onClick={copyToClipboard}
                className="bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white rounded-lg p-2.5 transition-colors"
                aria-label={isCopied ? i18n.copy_success : i18n.copy_tooltip}
            >
                {isCopied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm0 13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1v1a2 2 0 0 0 2 2h5a1 1 0 0 1 1 1v7Z"/>
                        <path d="M2 2a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H4a1 1 0 0 1-1-1V2Z"/>
                    </svg>
                )}
            </button>
            <Tooltip text={isCopied ? i18n.copy_success : i18n.copy_tooltip} />
        </div>
    );
};

export default CopyButton;
