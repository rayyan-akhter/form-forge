
import { useFormStore } from "@/store/formStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ThemeSettings() {
  const { form, updateTheme, isThemeSettingsOpen, toggleThemeSettings } = useFormStore();
  const [localTheme, setLocalTheme] = useState({ ...form.theme });
  
  // Update local state when theme changes
  useEffect(() => {
    setLocalTheme({ ...form.theme });
  }, [form.theme]);
  
  const handleColorChange = (colorKey: 'primaryColor' | 'secondaryColor' | 'accentColor' | 'backgroundColor') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTheme(prev => ({ ...prev, [colorKey]: e.target.value }));
    // Update global theme immediately to see changes
    updateTheme({ [colorKey]: e.target.value });
  };
  
  const handleFontFamilyChange = (value: string) => {
    setLocalTheme(prev => ({ ...prev, fontFamily: value }));
    updateTheme({ fontFamily: value });
  };
  
  const handleFontSizeChange = (key: 'base' | 'heading' | 'label') => (value: number[]) => {
    const sizeValue = `${value[0] / 16}rem`;
    setLocalTheme(prev => ({
      ...prev,
      fontSize: {
        ...prev.fontSize,
        [key]: sizeValue,
      }
    }));
    
    updateTheme({
      fontSize: {
        ...localTheme.fontSize,
        [key]: sizeValue,
      }
    });
  };
  
  const handleBorderRadiusChange = (value: number[]) => {
    const radiusValue = `${value[0] / 16}rem`;
    setLocalTheme(prev => ({ ...prev, borderRadius: radiusValue }));
    updateTheme({ borderRadius: radiusValue });
  };
  
  const handleSpacingChange = (value: number[]) => {
    const spacingValue = `${value[0] / 16}rem`;
    setLocalTheme(prev => ({ ...prev, spacing: spacingValue }));
    updateTheme({ spacing: spacingValue });
  };

  if (!isThemeSettingsOpen) return null;

  const parseRemValue = (remValue: string) => {
    return parseFloat(remValue.replace('rem', '')) * 16;
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-border shadow-lg z-20 flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-semibold">Theme Settings</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleThemeSettings}
          className="h-8 w-8"
        >
          <X size={16} />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Colors</h4>
            
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border" 
                  style={{ backgroundColor: localTheme.primaryColor }}
                />
                <Input 
                  id="primaryColor"
                  type="color"
                  value={localTheme.primaryColor}
                  onChange={handleColorChange('primaryColor')}
                  className="w-12 h-8 p-0"
                />
                <Input 
                  value={localTheme.primaryColor}
                  onChange={handleColorChange('primaryColor')}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border" 
                  style={{ backgroundColor: localTheme.secondaryColor }}
                />
                <Input 
                  id="secondaryColor"
                  type="color"
                  value={localTheme.secondaryColor}
                  onChange={handleColorChange('secondaryColor')}
                  className="w-12 h-8 p-0"
                />
                <Input 
                  value={localTheme.secondaryColor}
                  onChange={handleColorChange('secondaryColor')}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border" 
                  style={{ backgroundColor: localTheme.accentColor }}
                />
                <Input 
                  id="accentColor"
                  type="color"
                  value={localTheme.accentColor}
                  onChange={handleColorChange('accentColor')}
                  className="w-12 h-8 p-0"
                />
                <Input 
                  value={localTheme.accentColor}
                  onChange={handleColorChange('accentColor')}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border" 
                  style={{ backgroundColor: localTheme.backgroundColor }}
                />
                <Input 
                  id="backgroundColor"
                  type="color"
                  value={localTheme.backgroundColor}
                  onChange={handleColorChange('backgroundColor')}
                  className="w-12 h-8 p-0"
                />
                <Input 
                  value={localTheme.backgroundColor}
                  onChange={handleColorChange('backgroundColor')}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Typography</h4>
            
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select 
                value={localTheme.fontFamily} 
                onValueChange={handleFontFamilyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                  <SelectItem value="Poppins, sans-serif">Poppins</SelectItem>
                  <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                  <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                  <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Base Font Size: {localTheme.fontSize.base}</Label>
              <Slider 
                min={12} 
                max={24} 
                step={1} 
                defaultValue={[parseRemValue(localTheme.fontSize.base)]}
                onValueChange={handleFontSizeChange('base')}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Heading Font Size: {localTheme.fontSize.heading}</Label>
              <Slider 
                min={16} 
                max={48} 
                step={1} 
                defaultValue={[parseRemValue(localTheme.fontSize.heading)]}
                onValueChange={handleFontSizeChange('heading')}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Label Font Size: {localTheme.fontSize.label}</Label>
              <Slider 
                min={10} 
                max={18} 
                step={1} 
                defaultValue={[parseRemValue(localTheme.fontSize.label)]}
                onValueChange={handleFontSizeChange('label')}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Layout</h4>
            
            <div className="space-y-2">
              <Label>Border Radius: {localTheme.borderRadius}</Label>
              <Slider 
                min={0} 
                max={24} 
                step={1} 
                defaultValue={[parseRemValue(localTheme.borderRadius)]}
                onValueChange={handleBorderRadiusChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Spacing: {localTheme.spacing}</Label>
              <Slider 
                min={8} 
                max={32} 
                step={1} 
                defaultValue={[parseRemValue(localTheme.spacing)]}
                onValueChange={handleSpacingChange}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
