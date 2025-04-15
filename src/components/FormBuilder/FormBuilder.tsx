
import FormBuilderHeader from "./FormBuilderHeader";
import FormBuilderCanvas from "./FormBuilderCanvas";
import FormComponentsPanel from "./FormComponentsPanel";
import ThemeSettings from "./ThemeSettings";
import ComponentSettings from "./ComponentSettings";
import { useFormStore } from "@/store/formStore";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function FormBuilder() {
  const { mode } = useFormStore();
  
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
