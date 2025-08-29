
import React from 'react';
import type { Language, Category, Purpose } from '../types';
import { promptConfig } from '../constants';
import CopyButton from './CopyButton';

interface OutputPanelProps {
    currentLang: Language;
    generatedPrompts: { ko: string; en: string };
    metaData: {
        category?: Category;
        purpose?: Purpose;
    };
    uploadedFileCount: number;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ currentLang, generatedPrompts, metaData, uploadedFileCount }) => {
    const i18n = promptConfig.i18n[currentLang];
    const { category, purpose } = metaData;

    return (
        <div className="card p-8 lg:p-10 flex flex-col space-y-6">
            <div>
                <h2 className="text-3xl font-semibold mb-3">{i18n.output_title}</h2>
                <div className="text-base text-gray-300 flex flex-wrap gap-x-5 gap-y-2">
                    {category && (
                        <span>
                            <strong className="font-semibold text-gray-200">{i18n.output_meta_category}:</strong> {category[`name_${currentLang}`]}
                        </span>
                    )}
                    {purpose && (
                        <span>
                            <strong className="font-semibold text-gray-200">{i18n.output_meta_purpose}:</strong> {purpose[currentLang]}
                        </span>
                    )}
                    {uploadedFileCount > 0 && (
                         <span>
                             <strong className="font-semibold text-gray-200">{i18n.output_meta_images}:</strong> {uploadedFileCount}
                         </span>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label htmlFor="ko-output" className="block text-base font-medium text-gray-200 mb-2">한국어 프롬프트</label>
                    <CopyButton lang="ko" textToCopy={generatedPrompts.ko} />
                </div>
                <textarea id="ko-output" rows={7} className="form-input" readOnly value={generatedPrompts.ko}></textarea>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label htmlFor="en-output" className="block text-base font-medium text-gray-200 mb-2">English Prompt</label>
                    <CopyButton lang="en" textToCopy={generatedPrompts.en} />
                </div>
                <textarea id="en-output" rows={7} className="form-input" readOnly value={generatedPrompts.en}></textarea>
            </div>

            <div className="pt-6 text-sm text-gray-400 border-t border-gray-700/40">
                <h3 className="font-semibold text-gray-300 mb-3 mt-5">{i18n.usage_title}</h3>
                <ul className="list-disc list-inside space-y-2">
                    {i18n.usage_list.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <p className="mt-5">
                    <em>{i18n.source_text}</em>
                    <a href="https://developers.google.com/machine-learning/gan/prompting" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline hover:text-blue-200 transition-colors">
                        Google Developers Blog Post
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default OutputPanel;
