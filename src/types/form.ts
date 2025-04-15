
export type ThemeSettings = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: {
    base: string;
    heading: string;
    label: string;
  };
  borderRadius: string;
  spacing: string;
};

export type ValidationRule = {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: string | number | RegExp;
  message: string;
};

export type FormComponentType = 
  | 'shortText' 
  | 'longText' 
  | 'email' 
  | 'number' 
  | 'checkbox' 
  | 'radio' 
  | 'select' 
  | 'date' 
  | 'phone'
  | 'name'
  | 'address'
  | 'heading'
  | 'paragraph'
  | 'divider'
  | 'file'
  | 'payment'
  | 'rating'
  | 'switch'
  | 'slider'
  | 'image'
  | 'link'
  | 'fileDisplay';

export type FormComponentOption = {
  id: string;
  label: string;
  value: string;
};

export type FormComponent = {
  id: string;
  type: FormComponentType;
  label: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  options?: FormComponentOption[];
  defaultValue?: string | string[] | boolean | number;
  validation?: ValidationRule[];
  width?: 'full' | 'half' | 'third';
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  min?: number;
  max?: number;
  step?: number;
  acceptedFileTypes?: string;
  maxFileSize?: number;
};

export type FormData = {
  id: string;
  title: string;
  description?: string;
  components: FormComponent[];
  theme: ThemeSettings;
  createdAt: string;
  updatedAt: string;
};
