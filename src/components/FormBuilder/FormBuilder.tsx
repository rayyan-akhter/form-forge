"use client";

import FormBuilderHeader from "./FormBuilderHeader";
import FormBuilderCanvas from "./FormBuilderCanvas";
import FormComponentsPanel from "./FormComponentsPanel";
import ThemeSettings from "./ThemeSettings";
import ComponentSettings from "./ComponentSettings";
import { useFormStore } from "@/store/formStore";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen } from "lucide-react";

export default function FormBuilder() {
  const { mode } = useFormStore();
  const isMobile = useIsMobile();
  
  // For desktop view
  if (!isMobile) {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <FormBuilderHeader />
        
        <div className="flex flex-1 overflow-hidden">
          {mode === 'edit' && <FormComponentsPanel />}
          <FormBuilderCanvas />
          <ThemeSettings />
          <ComponentSettings />
        </div>
      </div>
    );
  }
  
  // For mobile view
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <FormBuilderHeader />
      
      <div className="flex flex-1 overflow-hidden relative">
        {mode === 'edit' && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-2 top-2 z-10"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh]">
              <div className="h-full overflow-auto p-0">
                <FormComponentsPanel />
              </div>
            </DrawerContent>
          </Drawer>
        )}
        <FormBuilderCanvas />
        <ThemeSettings />
        <ComponentSettings />
      </div>
    </div>
  );
}