"use client";

import { useFormStore } from "@/store/formStore";
import { FormComponentType } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Type, TextCursor, Mail, Hash, Check, Circle, List, Calendar, Phone, 
  User, MapPin, Heading, AlignLeft, Minus, PanelLeftOpen, ChevronLeft,
  Upload, CreditCard, Star, ToggleLeft, SlidersHorizontal, Link, ImageIcon,
  FileText
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ComponentCategoryItem {
  type: FormComponentType;
  icon: React.ReactNode;
  label: string;
}

const basicComponents: ComponentCategoryItem[] = [
  { type: 'shortText', icon: <TextCursor size={18} />, label: 'Short Text' },
  { type: 'longText', icon: <AlignLeft size={18} />, label: 'Long Text' },
  { type: 'email', icon: <Mail size={18} />, label: 'Email' },
  { type: 'number', icon: <Hash size={18} />, label: 'Number' },
  { type: 'checkbox', icon: <Check size={18} />, label: 'Checkbox' },
  { type: 'radio', icon: <Circle size={18} />, label: 'Radio' },
  { type: 'select', icon: <List size={18} />, label: 'Dropdown' },
  { type: 'date', icon: <Calendar size={18} />, label: 'Date' },
];

const advancedComponents: ComponentCategoryItem[] = [
  { type: 'phone', icon: <Phone size={18} />, label: 'Phone' },
  { type: 'name', icon: <User size={18} />, label: 'Name' },
  { type: 'address', icon: <MapPin size={18} />, label: 'Address' },
  { type: 'file', icon: <Upload size={18} />, label: 'File Upload' },
  { type: 'payment', icon: <CreditCard size={18} />, label: 'Payment' },
  { type: 'rating', icon: <Star size={18} />, label: 'Rating' },
  { type: 'switch', icon: <ToggleLeft size={18} />, label: 'Switch' },
  { type: 'slider', icon: <SlidersHorizontal size={18} />, label: 'Slider' },
];

const layoutComponents: ComponentCategoryItem[] = [
  { type: 'heading', icon: <Heading size={18} />, label: 'Heading' },
  { type: 'paragraph', icon: <Type size={18} />, label: 'Paragraph' },
  { type: 'divider', icon: <Minus size={18} />, label: 'Divider' },
  { type: 'image', icon: <ImageIcon size={18} />, label: 'Image' },
  { type: 'link', icon: <Link size={18} />, label: 'Link' },
  { type: 'fileDisplay', icon: <FileText size={18} />, label: 'File Display' },
];

export default function FormComponentsPanel() {
  const { addComponent, mode } = useFormStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleAddComponent = (type: FormComponentType) => {
    if (mode === 'edit') {
      addComponent(type);
      toast({
        title: "Component added",
        description: `Added a new ${type} component to your form.`,
      });
    }
  };

  return (
    <div 
      className={cn(
        "border-r bg-sidebar border-border h-[calc(100vh-4rem)] flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-12" : "w-72"
      )}
    >
      <div className="p-4 border-b border-border flex justify-between items-center">
        {!collapsed && (
          <h2 className="font-medium text-lg flex items-center">
            <PanelLeftOpen size={18} className="mr-2" />
            Components
          </h2>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("p-0 h-8 w-8", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("transition-transform", collapsed && "rotate-180")} size={18} />
        </Button>
      </div>
      
      {!collapsed && (
        <ScrollArea className="flex-1">
          <Tabs defaultValue="basic" className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="w-full">
                <TabsTrigger value="basic" className="flex-1">Basic</TabsTrigger>
                <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
                <TabsTrigger value="layout" className="flex-1">Layout</TabsTrigger>
              </TabsList>
            </div>
            <div className="p-4">
              <TabsContent value="basic" className="mt-0">
                <div className="grid grid-cols-1 gap-2">
                  {basicComponents.map((item) => (
                    <ComponentButton 
                      key={item.type}
                      icon={item.icon}
                      label={item.label}
                      onClick={() => handleAddComponent(item.type)}
                      disabled={mode !== 'edit'}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="mt-0">
                <div className="grid grid-cols-1 gap-2">
                  {advancedComponents.map((item) => (
                    <ComponentButton 
                      key={item.type}
                      icon={item.icon}
                      label={item.label}
                      onClick={() => handleAddComponent(item.type)}
                      disabled={mode !== 'edit'}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="layout" className="mt-0">
                <div className="grid grid-cols-1 gap-2">
                  {layoutComponents.map((item) => (
                    <ComponentButton 
                      key={item.type}
                      icon={item.icon}
                      label={item.label}
                      onClick={() => handleAddComponent(item.type)}
                      disabled={mode !== 'edit'}
                    />
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </ScrollArea>
      )}
      
      {collapsed && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            title="Basic components"
            onClick={() => setCollapsed(false)}
          >
            <TextCursor size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            title="Advanced components"
            onClick={() => setCollapsed(false)}
          >
            <Star size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            title="Layout components"
            onClick={() => setCollapsed(false)}
          >
            <Heading size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}

interface ComponentButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function ComponentButton({ icon, label, onClick, disabled }: ComponentButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex items-center justify-start py-6 px-4 w-full"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </Button>
  );
}
