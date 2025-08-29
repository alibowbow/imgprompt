
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { promptConfig } from './constants';
import type { Language, CategoryId, FormState } from './types';
import FormPanel from './components/FormPanel';
import OutputPanel from './components/OutputPanel';
import Header from './components/Header';

const App: React.FC = () => {
    const [currentLang, setCurrentLang] = useState<Language>('ko');
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>('photorealistic');
    const [formState, setFormState] = useState<FormState>({});
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [generatedPrompts, setGeneratedPrompts] = useState<{ ko: string; en: string }>({ ko: '', en: '' });

    const toggleLanguage = useCallback(() => {
        setCurrentLang(prevLang => (prevLang === 'ko' ? 'en' : 'ko'));
    }, []);

    const handleFormChange = useCallback((id: string, value: string | File[]) => {
        if (id.startsWith('image_upload')) {
            setUploadedFiles(value as File[]);
        } else {
            setFormState(prevState => ({ ...prevState, [id]: value }));
        }
    }, []);

    const handleCategoryChange = useCallback((newCategory: CategoryId) => {
        setSelectedCategory(newCategory);
        setFormState({});
        setUploadedFiles([]);
        setGeneratedPrompts({ ko: '', en: '' });
    }, []);

    const processTemplate = useCallback((categoryId: CategoryId, lang: Language, state: FormState): string => {
        let template = promptConfig.templates[categoryId]?.[lang] ?? '';
        
        template = template.replace(/\[([^\]]+)\]/g, (match, key) => {
            const cleanKey = key.toLowerCase().replace(/ /g, '_').replace(':', '');

            // FIX: Handle 'purpose' separately, as it is not in `promptConfig.fields`.
            // The original logic was flawed and would not replace the `[purpose]` tag.
            if (cleanKey === 'purpose') {
                const value = state['purpose'] || '';
                if (typeof value === 'string') {
                    const purposes = promptConfig.purposes[categoryId];
                    return purposes?.find(p => p.id === value)?.[lang] || '';
                }
                return '';
            }
            
            const valueId = Object.keys(promptConfig.fields).find(id => id.replace(/_/g, '') === cleanKey.replace(/_/g, ''));
            if (!valueId) return '';
            
            let value = state[valueId] || '';
            
            // FIX: Type 'string[]' cannot be used as an index type.
            // Check for string type before indexing and use optional chaining for `.options`.
            if (promptConfig.fields[valueId]?.type === 'select' && typeof value === 'string') {
                return promptConfig.fields[valueId].options?.[value]?.[lang] || value;
            }
            
            // For all other cases (text fields, non-string select values), convert to string.
            return Array.isArray(value) ? value.join(', ') : String(value);
        });
        
        const semanticNegative = state.semantic_negative as string | undefined;
        if (semanticNegative && semanticNegative.trim() !== '') {
            const semanticConfig = promptConfig.semanticNegatives[lang];
            const replacement = semanticConfig.prefix + semanticNegative;
            template = template.replace(/\[의미적_네거티브\]/g, replacement).replace(/\[semantic_negative\]/g, replacement);
        } else {
            template = template.replace(/\[의미적_네거티브\]/g, '').replace(/\[semantic_negative\]/g, '');
        }

        return template.replace(/\(\)/g, '').replace(/\[.*?\]/g, '').trim().replace(/ +/g, ' ');
    }, []);

    const generatePrompts = useCallback(() => {
        const koPrompt = processTemplate(selectedCategory, 'ko', formState);
        const enPrompt = processTemplate(selectedCategory, 'en', formState);
        setGeneratedPrompts({ ko: koPrompt, en: enPrompt });
    }, [selectedCategory, formState, processTemplate]);

    const loadRandomExample = useCallback(() => {
        const examples = {
            photorealistic: { subject: '고양이', action: '책상 위에서 잠자기', environment: '햇살 좋은 오후의 서재', shot_type: 'medium_shot', camera_lens: '50mm', lighting: 'natural_window', mood: '평화롭고 아늑한', key_detail: '고양이 털의 질감', aspect_ratio: '16:9', semantic_negative: '', purpose: 'stock' },
            illustration: { subject: '웃는 햄버거 캐릭터', style_illustration: 'flat', features: '크고 동그란 눈', color_palette: '밝고 선명한 원색', line_shading: '굵고 검은 외곽선', background_simple: 'white', purpose: 'sticker' },
            comic: { art_style_comic: '일본 망가 흑백 스타일', character_action: '소녀가 결심한 듯 주먹을 꽉 쥔다', setting_comic: '비가 내리는 학교 옥상', dialogue_caption: '...이제 망설이지 않아!', lighting_mood_comic: '번개가 치는 순간의 극적인 조명', aspect_ratio: '9:16', purpose: 'webtoon_panel' }
        };
        const exampleKeys = Object.keys(examples) as CategoryId[];
        const randomCategory = exampleKeys[Math.floor(Math.random() * exampleKeys.length)];
        const exampleData = examples[randomCategory];
        
        handleCategoryChange(randomCategory);

        // Defer state update to allow category change to propagate
        setTimeout(() => {
            setFormState(exampleData);
            const koPrompt = processTemplate(randomCategory, 'ko', exampleData);
            const enPrompt = processTemplate(randomCategory, 'en', exampleData);
            setGeneratedPrompts({ ko: koPrompt, en: enPrompt });
        }, 100);
    }, [handleCategoryChange, processTemplate]);
    
    useEffect(() => {
        loadRandomExample();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const outputMeta = useMemo(() => {
        const category = promptConfig.categories.find(c => c.id === selectedCategory);
        const purposeId = formState['purpose'] as string;
        const purposes = promptConfig.purposes[selectedCategory];
        const purpose = purposes?.find(p => p.id === purposeId);
        return { category, purpose };
    }, [selectedCategory, formState]);


    return (
        <div className="min-h-screen p-8 lg:p-12">
            <Header
                currentLang={currentLang}
                toggleLanguage={toggleLanguage}
                i18n={promptConfig.i18n[currentLang]}
            />

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <FormPanel
                    currentLang={currentLang}
                    selectedCategory={selectedCategory}
                    formState={formState}
                    onCategoryChange={handleCategoryChange}
                    onFormChange={handleFormChange}
                    onGenerate={generatePrompts}
                    onLoadExample={loadRandomExample}
                />

                <OutputPanel
                    currentLang={currentLang}
                    generatedPrompts={generatedPrompts}
                    metaData={outputMeta}
                    uploadedFileCount={uploadedFiles.length}
                />
            </main>
        </div>
    );
};

export default App;
