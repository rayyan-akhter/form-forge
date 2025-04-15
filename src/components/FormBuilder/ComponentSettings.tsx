
import { useFormStore } from "@/store/formStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FormComponent, FormComponentOption, ValidationRule } from "@/types/form";

export default function ComponentSettings() {
  const { form, selectedComponentId, updateComponent, isComponentSettingsOpen, toggleComponentSettings } = useFormStore();
  
  const selectedComponent = form.components.find(c => c.id === selectedComponentId);
  
  if (!selectedComponent || !isComponentSettingsOpen) return null;
  
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-border shadow-lg z-20 flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-semibold">Component Settings</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleComponentSettings}
          className="h-8 w-8"
        >
          <X size={16} />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <ComponentSettingsForm 
          component={selectedComponent}
          onUpdate={(updates) => updateComponent(selectedComponent.id, updates)}
        />
      </ScrollArea>
    </div>
  );
}

interface ComponentSettingsFormProps {
  component: FormComponent;
  onUpdate: (updates: Partial<FormComponent>) => void;
}

function ComponentSettingsForm({ component, onUpdate }: ComponentSettingsFormProps) {
  const [localComponent, setLocalComponent] = useState<FormComponent>(component);
  
  // Update local state when selected component changes
  useEffect(() => {
    setLocalComponent(component);
  }, [component]);
  
  const handleInputChange = (key: keyof FormComponent) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setLocalComponent(prev => ({ ...prev, [key]: value }));
    onUpdate({ [key]: value });
  };
  
  const handleRequiredChange = (checked: boolean) => {
    setLocalComponent(prev => ({ ...prev, required: checked }));
    onUpdate({ required: checked });
  };
  
  const handleWidthChange = (width: 'full' | 'half' | 'third') => {
    setLocalComponent(prev => ({ ...prev, width }));
    onUpdate({ width });
  };
  
  const handleAddOption = () => {
    const newOption: FormComponentOption = {
      id: nanoid(),
      label: `Option ${(localComponent.options?.length || 0) + 1}`,
      value: `option${(localComponent.options?.length || 0) + 1}`,
    };
    
    const updatedOptions = [...(localComponent.options || []), newOption];
    setLocalComponent(prev => ({ ...prev, options: updatedOptions }));
    onUpdate({ options: updatedOptions });
  };
  
  const handleOptionChange = (optionId: string, field: 'label' | 'value') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedOptions = localComponent.options?.map(option => 
      option.id === optionId ? { ...option, [field]: e.target.value } : option
    );
    
    setLocalComponent(prev => ({ ...prev, options: updatedOptions }));
    onUpdate({ options: updatedOptions });
  };
  
  const handleRemoveOption = (optionId: string) => {
    const updatedOptions = localComponent.options?.filter(option => option.id !== optionId);
    setLocalComponent(prev => ({ ...prev, options: updatedOptions }));
    onUpdate({ options: updatedOptions });
  };
  
  const handleAddValidation = (type: ValidationRule['type']) => {
    let newRule: ValidationRule;
    
    switch (type) {
      case 'required':
        newRule = { type: 'required', message: 'This field is required' };
        break;
      case 'email':
        newRule = { type: 'email', message: 'Please enter a valid email address' };
        break;
      case 'minLength':
        newRule = { type: 'minLength', value: 1, message: 'Please enter at least 1 character' };
        break;
      case 'maxLength':
        newRule = { type: 'maxLength', value: 100, message: 'Please enter no more than 100 characters' };
        break;
      case 'pattern':
        newRule = { type: 'pattern', value: '.*', message: 'Please enter a valid value' };
        break;
      default:
        newRule = { type: 'custom', message: 'Invalid input' };
    }
    
    const updatedValidation = [...(localComponent.validation || []), newRule];
    setLocalComponent(prev => ({ ...prev, validation: updatedValidation }));
    onUpdate({ validation: updatedValidation });
  };

  return (
    <div className="space-y-6">
      {/* General settings */}
      <div className="space-y-4">
        <h4 className="font-medium">General</h4>
        
        <div className="space-y-2">
          <Label htmlFor="label">Label</Label>
          <Input 
            id="label"
            value={localComponent.label} 
            onChange={handleInputChange('label')}
          />
        </div>
        
        {(['shortText', 'longText', 'email', 'number', 'select', 'date', 'phone', 'name', 'address'].includes(localComponent.type)) && (
          <div className="space-y-2">
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input 
              id="placeholder"
              value={localComponent.placeholder || ''} 
              onChange={handleInputChange('placeholder')}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="helpText">Help Text</Label>
          <Textarea 
            id="helpText"
            value={localComponent.helpText || ''} 
            onChange={handleInputChange('helpText')}
            rows={2}
          />
        </div>
        
        {component.type !== 'heading' && component.type !== 'paragraph' && component.type !== 'divider' && (
          <div className="flex items-center justify-between">
            <Label htmlFor="required">Required</Label>
            <Switch 
              id="required"
              checked={localComponent.required || false}
              onCheckedChange={handleRequiredChange}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Select 
            value={localComponent.width || 'full'} 
            onValueChange={(value) => handleWidthChange(value as 'full' | 'half' | 'third')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Width</SelectItem>
              <SelectItem value="half">Half Width</SelectItem>
              <SelectItem value="third">Third Width</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Options settings */}
      {(['checkbox', 'radio', 'select'].includes(localComponent.type)) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Options</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddOption}
              className="h-8"
            >
              <Plus size={14} className="mr-1" /> Add
            </Button>
          </div>
          
          {localComponent.options?.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
              <Input 
                value={option.label} 
                onChange={handleOptionChange(option.id, 'label')}
                placeholder="Option label"
                className="flex-1"
              />
              <Input 
                value={option.value} 
                onChange={handleOptionChange(option.id, 'value')}
                placeholder="Value"
                className="w-24"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveOption(option.id)}
                className="h-8 w-8"
              >
                <Trash size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {/* Validation settings */}
      {(['shortText', 'longText', 'email', 'number', 'phone', 'name', 'address'].includes(localComponent.type)) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Validation</h4>
            <Select onValueChange={handleAddValidation}>
              <SelectTrigger className="w-28 h-8">
                <SelectValue placeholder="Add Rule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="required">Required</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="minLength">Min Length</SelectItem>
                <SelectItem value="maxLength">Max Length</SelectItem>
                <SelectItem value="pattern">Pattern</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Display existing validation rules */}
          {localComponent.validation?.map((rule, index) => (
            <div key={index} className="border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium capitalize">{rule.type}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    const updatedValidation = localComponent.validation?.filter((_, i) => i !== index);
                    setLocalComponent(prev => ({ ...prev, validation: updatedValidation }));
                    onUpdate({ validation: updatedValidation });
                  }}
                  className="h-6 w-6"
                >
                  <X size={14} />
                </Button>
              </div>
              
              {['minLength', 'maxLength'].includes(rule.type) && (
                <div className="mb-2">
                  <Label className="text-xs mb-1 block">Value</Label>
                  <Input 
                    type="number"
                    value={rule.value as number} 
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      const updatedValidation = localComponent.validation?.map((r, i) => 
                        i === index ? { ...r, value } : r
                      );
                      setLocalComponent(prev => ({ ...prev, validation: updatedValidation }));
                      onUpdate({ validation: updatedValidation });
                    }}
                    min={0}
                  />
                </div>
              )}
              
              {rule.type === 'pattern' && (
                <div className="mb-2">
                  <Label className="text-xs mb-1 block">Pattern</Label>
                  <Input 
                    value={rule.value as string} 
                    onChange={(e) => {
                      const value = e.target.value;
                      const updatedValidation = localComponent.validation?.map((r, i) => 
                        i === index ? { ...r, value } : r
                      );
                      setLocalComponent(prev => ({ ...prev, validation: updatedValidation }));
                      onUpdate({ validation: updatedValidation });
                    }}
                  />
                </div>
              )}
              
              <div>
                <Label className="text-xs mb-1 block">Error Message</Label>
                <Input 
                  value={rule.message} 
                  onChange={(e) => {
                    const message = e.target.value;
                    const updatedValidation = localComponent.validation?.map((r, i) => 
                      i === index ? { ...r, message } : r
                    );
                    setLocalComponent(prev => ({ ...prev, validation: updatedValidation }));
                    onUpdate({ validation: updatedValidation });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
