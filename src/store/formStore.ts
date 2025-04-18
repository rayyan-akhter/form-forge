import { create } from 'zustand';
import { FormComponent, FormComponentType, FormData, ThemeSettings } from '@/types/form';
import { nanoid } from 'nanoid';

interface FormState {
  form: FormData;
  mode: 'edit' | 'preview';
  selectedComponentId: string | null;
  isDragging: boolean;
  isComponentSettingsOpen: boolean;
  isThemeSettingsOpen: boolean;
  
  // Actions
  setMode: (mode: 'edit' | 'preview') => void;
  addComponent: (type: FormComponentType) => void;
  updateComponent: (id: string, updates: Partial<FormComponent>) => void;
  removeComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  selectComponent: (id: string | null) => void;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  updateFormSettings: (title: string, description?: string) => void;
  setIsDragging: (isDragging: boolean) => void;
  toggleComponentSettings: () => void;
  toggleThemeSettings: () => void;
  resetForm: () => void;
}

const defaultTheme: ThemeSettings = {
  primaryColor: '#6366f1', // Indigo
  secondaryColor: '#a855f7', // Purple
  accentColor: '#ec4899', // Pink
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: {
    base: '1rem',
    heading: '1.5rem',
    label: '0.875rem',
  },
  borderRadius: '0.5rem',
  spacing: '1rem',
};

const createDefaultForm = (): FormData => ({
  id: nanoid(),
  title: 'Untitled Form',
  description: 'Form description',
  components: [],
  theme: defaultTheme,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const defaultForm = createDefaultForm();

// Create form component templates
const createComponentTemplate = (type: FormComponentType): Omit<FormComponent, 'id'> => {
  const baseTemplate = {
    type,
    label: getDefaultLabel(type),
    required: false,
    width: 'full' as const,
  };

  switch (type) {
    case 'shortText':
      return {
        ...baseTemplate,
        placeholder: 'Enter your answer',
        validation: [{ type: 'maxLength', value: 100, message: 'Maximum 100 characters allowed' }],
      };
    case 'longText':
      return {
        ...baseTemplate,
        placeholder: 'Enter your answer',
      };
    case 'email':
      return {
        ...baseTemplate,
        placeholder: 'Enter your email',
        validation: [{ type: 'email', message: 'Please enter a valid email address' }],
      };
    case 'number':
      return {
        ...baseTemplate,
        placeholder: 'Enter a number',
      };
    case 'checkbox':
      return {
        ...baseTemplate,
        options: [
          { id: nanoid(), label: 'Option 1', value: 'option1' },
          { id: nanoid(), label: 'Option 2', value: 'option2' },
          { id: nanoid(), label: 'Option 3', value: 'option3' },
        ],
      };
    case 'radio':
      return {
        ...baseTemplate,
        options: [
          { id: nanoid(), label: 'Option 1', value: 'option1' },
          { id: nanoid(), label: 'Option 2', value: 'option2' },
          { id: nanoid(), label: 'Option 3', value: 'option3' },
        ],
      };
    case 'select':
      return {
        ...baseTemplate,
        placeholder: 'Select an option',
        options: [
          { id: nanoid(), label: 'Option 1', value: 'option1' },
          { id: nanoid(), label: 'Option 2', value: 'option2' },
          { id: nanoid(), label: 'Option 3', value: 'option3' },
        ],
      };
    case 'date':
      return {
        ...baseTemplate,
        placeholder: 'Select a date',
      };
    case 'phone':
      return {
        ...baseTemplate,
        placeholder: 'Enter phone number',
      };
    case 'name':
      return {
        ...baseTemplate,
        placeholder: 'Enter your name',
      };
    case 'address':
      return {
        ...baseTemplate,
        placeholder: 'Enter your address',
      };
    case 'file':
      return {
        ...baseTemplate,
        label: 'File Upload',
        acceptedFileTypes: '.pdf,.docx,.jpg,.png',
        maxFileSize: 5, // in MB
      };
    case 'payment':
      return {
        ...baseTemplate,
        label: 'Payment',
      };
    case 'rating':
      return {
        ...baseTemplate,
        label: 'Rate your experience',
        max: 5,
      };
    case 'switch':
      return {
        ...baseTemplate,
        label: 'Toggle Option',
        defaultValue: false,
      };
    case 'slider':
      return {
        ...baseTemplate,
        label: 'Slider',
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
      };
    case 'image':
      return {
        ...baseTemplate,
        label: 'Image',
        imageUrl: 'https://via.placeholder.com/400x200',
      };
    case 'link':
      return {
        ...baseTemplate,
        label: 'Link',
        linkText: 'Click here',
        linkUrl: 'https://example.com',
      };
    case 'fileDisplay':
      return {
        ...baseTemplate,
        label: 'File Display',
      };
    case 'heading':
      return {
        ...baseTemplate,
        label: 'Heading Text',
      };
    case 'paragraph':
      return {
        ...baseTemplate,
        label: 'Paragraph Text',
      };
    case 'divider':
      return {
        ...baseTemplate,
        label: '',
      };
    default:
      return baseTemplate;
  }
};

function getDefaultLabel(type: FormComponentType): string {
  switch (type) {
    case 'shortText': return 'Short Text';
    case 'longText': return 'Long Text';
    case 'email': return 'Email';
    case 'number': return 'Number';
    case 'checkbox': return 'Checkbox Group';
    case 'radio': return 'Radio Group';
    case 'select': return 'Dropdown';
    case 'date': return 'Date';
    case 'phone': return 'Phone Number';
    case 'name': return 'Name';
    case 'address': return 'Address';
    case 'file': return 'File Upload';
    case 'payment': return 'Payment';
    case 'rating': return 'Rating';
    case 'switch': return 'Switch';
    case 'slider': return 'Slider';
    case 'image': return 'Image';
    case 'link': return 'Link';
    case 'fileDisplay': return 'File Display';
    case 'heading': return 'Heading';
    case 'paragraph': return 'Paragraph';
    case 'divider': return 'Divider';
    default: return 'Question';
  }
}

export const useFormStore = create<FormState>((set) => ({
  form: defaultForm,
  mode: 'edit',
  selectedComponentId: null,
  isDragging: false,
  isComponentSettingsOpen: false,
  isThemeSettingsOpen: false,

  setMode: (mode) => set({ mode }),

  addComponent: (type) => set((state) => {
    const newComponent: FormComponent = {
      id: nanoid(),
      ...createComponentTemplate(type),
    };

    return {
      form: {
        ...state.form,
        components: [...state.form.components, newComponent],
        updatedAt: new Date().toISOString(),
      },
      selectedComponentId: newComponent.id,
    };
  }),

  updateComponent: (id, updates) => set((state) => ({
    form: {
      ...state.form,
      components: state.form.components.map((component) =>
        component.id === id ? { ...component, ...updates } : component
      ),
      updatedAt: new Date().toISOString(),
    },
  })),

  removeComponent: (id) => set((state) => ({
    form: {
      ...state.form,
      components: state.form.components.filter((component) => component.id !== id),
      updatedAt: new Date().toISOString(),
    },
    selectedComponentId: null,
  })),

  duplicateComponent: (id) => set((state) => {
    const componentToDuplicate = state.form.components.find((c) => c.id === id);
    if (!componentToDuplicate) return state;

    const index = state.form.components.findIndex((c) => c.id === id);
    const duplicatedComponent = {
      ...componentToDuplicate,
      id: nanoid(),
      label: `${componentToDuplicate.label} (Copy)`,
    };

    const updatedComponents = [...state.form.components];
    updatedComponents.splice(index + 1, 0, duplicatedComponent);

    return {
      form: {
        ...state.form,
        components: updatedComponents,
        updatedAt: new Date().toISOString(),
      },
      selectedComponentId: duplicatedComponent.id,
    };
  }),

  moveComponent: (fromIndex, toIndex) => set((state) => {
    const components = [...state.form.components];
    const [removed] = components.splice(fromIndex, 1);
    components.splice(toIndex, 0, removed);

    return {
      form: {
        ...state.form,
        components,
        updatedAt: new Date().toISOString(),
      },
    };
  }),

  selectComponent: (id) => set({ selectedComponentId: id }),

  updateTheme: (theme) => set((state) => ({
    form: {
      ...state.form,
      theme: { ...state.form.theme, ...theme },
      updatedAt: new Date().toISOString(),
    },
  })),

  updateFormSettings: (title, description) => set((state) => ({
    form: {
      ...state.form,
      title,
      description,
      updatedAt: new Date().toISOString(),
    },
  })),

  setIsDragging: (isDragging) => set({ isDragging }),

  toggleComponentSettings: () => set((state) => ({ 
    isComponentSettingsOpen: !state.isComponentSettingsOpen,
    isThemeSettingsOpen: false
  })),
  
  toggleThemeSettings: () => set((state) => ({ 
    isThemeSettingsOpen: !state.isThemeSettingsOpen,
    isComponentSettingsOpen: false
  })),

  resetForm: () => set({
    form: createDefaultForm(),
    selectedComponentId: null,
    isComponentSettingsOpen: false,
    isThemeSettingsOpen: false,
    mode: 'edit'
  })
}));