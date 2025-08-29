
import React, { useMemo } from 'react';
import type { Language, CategoryId, FormState } from '../types';
import { promptConfig } from '../constants';
import FormField from './FormField';

interface FormPanelProps {
    currentLang: Language;
    selectedCategory: CategoryId;
    formState: FormState;
    onCategoryChange: (newCategory: CategoryId) => void;
    onFormChange: (id: string, value: string | File[]) => void;
    onGenerate: () => void;
    onLoadExample: () => void;
}

const FormPanel: React.FC<FormPanelProps> = ({
    currentLang,
    selectedCategory,
    formState,
    onCategoryChange,
    onFormChange,
    onGenerate,
    onLoadExample
}) => {
    const i18n = promptConfig.i18n[currentLang];

    const currentCategoryConfig = useMemo(() => {
        return promptConfig.categories.find(c => c.id === selectedCategory);
    }, [selectedCategory]);
    
    const purposesForCategory = promptConfig.purposes[selectedCategory];

    return (
        <div className="card p-8 lg:p-10 flex flex-col space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="category-select" className="block text-base font-medium text-gray-200 mb-2">
                        {i18n.category_label}
                    </label>
                    <select
                        id="category-select"
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value as CategoryId)}
                    >
                        {promptConfig.categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat[`name_${currentLang}`]}</option>
                        ))}
                    </select>
                </div>
                {purposesForCategory && (
                    <div>
                        <label htmlFor="purpose-select" className="block text-base font-medium text-gray-200 mb-2">
                            {i18n.purpose_label}
                        </label>
                        <select
                            id="purpose-select"
                            className="form-select"
                            value={(formState['purpose'] as string) || ''}
                            onChange={(e) => onFormChange('purpose', e.target.value)}
                        >
                            {purposesForCategory.map(p => (
                                <option key={p.id} value={p.id}>{p[currentLang]}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {currentCategoryConfig?.fields.map(fieldId => (
                    <FormField
                        key={fieldId}
                        fieldId={fieldId}
                        fieldConfig={promptConfig.fields[fieldId]}
                        currentLang={currentLang}
                        value={formState[fieldId] as string}
                        onChange={onFormChange}
                    />
                ))}
            </div>

            {currentCategoryConfig?.type === 'editing' && (
                 <div className="text-sm text-yellow-200 p-4 bg-yellow-900/30 rounded-xl border border-yellow-700/40">
                    {i18n.image_upload_notice}
                 </div>
            )}

            <div className="pt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                <button
                    onClick={onGenerate}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-md hover:shadow-indigo-500/30 focus:ring-indigo-400 w-full sm:w-auto flex-grow"
                >
                    {i18n.generate_btn}
                </button>
                <button
                    onClick={onLoadExample}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 transform hover:scale-105 bg-gray-800/80 text-gray-100 hover:bg-gray-700 focus:ring-gray-400 w-full sm:w-auto"
                >
                    {i18n.load_example_btn}
                </button>
            </div>
        </div>
    );
};

export default FormPanel;
