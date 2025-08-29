
export type Language = 'ko' | 'en';

export type CategoryId = 
  | 'photorealistic' 
  | 'illustration' 
  | 'text_logo' 
  | 'product' 
  | 'minimalist' 
  | 'comic' 
  | 'edit_add_remove' 
  | 'edit_inpaint' 
  | 'edit_style_transfer' 
  | 'edit_composite';

export type FieldType = 'text' | 'select' | 'file';

export interface FieldOption {
  ko: string;
  en: string;
}

export interface Field {
  type: FieldType;
  ko: string;
  en: string;
  placeholder_ko?: string;
  placeholder_en?: string;
  ai?: boolean;
  options?: Record<string, FieldOption>;
  multiple?: boolean;
}

export interface Category {
  id: CategoryId;
  name_ko: string;
  name_en: string;
  type: 'creation' | 'editing';
  fields: string[];
}

export interface Purpose {
  id: string;
  ko: string;
  en: string;
}

export interface FormState {
    [key: string]: string | string[];
}
