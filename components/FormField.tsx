
import React from 'react';
import type { Field, Language } from '../types';
import AiSuggestButton from './AiSuggestButton';

interface FormFieldProps {
    fieldId: string;
    fieldConfig: Field;
    currentLang: Language;
    value: string;
    onChange: (id: string, value: string | File[]) => void;
}

const FormField: React.FC<FormFieldProps> = ({ fieldId, fieldConfig, currentLang, value, onChange }) => {
    if (!fieldConfig) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange(fieldId, e.target.value);
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onChange(fieldId, Array.from(e.target.files));
        }
    };
    
    const renderInput = () => {
        switch (fieldConfig.type) {
            case 'select':
                return (
                    <select
                        id={fieldId}
                        className="form-select"
                        value={value || ''}
                        onChange={handleChange}
                    >
                        {fieldConfig.options && Object.entries(fieldConfig.options).map(([val, labels]) => (
                            <option key={val} value={val}>{labels[currentLang]}</option>
                        ))}
                    </select>
                );
            case 'file':
                 return (
                    <input
                        type="file"
                        id={fieldId}
                        className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        multiple={fieldConfig.multiple}
                        onChange={handleFileChange}
                    />
                );
            case 'text':
            default:
                const inputElement = (
                     <input
                        type="text"
                        id={fieldId}
                        className="form-input"
                        placeholder={fieldConfig[`placeholder_${currentLang}`] || ''}
                        value={value || ''}
                        onChange={handleChange}
                    />
                );
                if (fieldConfig.ai) {
                    return (
                        <div className="relative">
                            {inputElement}
                            <AiSuggestButton
                                currentLang={currentLang}
                                keyword={value}
                                onSuggestionReceived={(suggestion) => onChange(fieldId, suggestion)}
                            />
                        </div>
                    );
                }
                return inputElement;
        }
    };

    return (
        <div className="fade-in">
            <label htmlFor={fieldId} className="block text-base font-medium text-gray-200 mb-2">
                {fieldConfig[currentLang]}
            </label>
            {renderInput()}
        </div>
    );
};

export default FormField;
