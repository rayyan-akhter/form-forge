
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";
import { Settings, Eye, Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function FormBuilderHeader() {
  const { mode, setMode, form, toggleThemeSettings } = useFormStore();
  const { toast } = useToast();

  const handleModeToggle = () => {
    setMode(mode === 'edit' ? 'preview' : 'edit');
    
    if (mode === 'edit') {
      toast({
        title: "Preview Mode",
        description: "You are now in preview mode. Form validation is active.",
      });
    } else {
      toast({
        title: "Edit Mode",
        description: "You are now in edit mode. Drag and drop components to build your form.",
      });
    }
  };

  const copyToClipboard = () => {
    // In a real app, this would generate a shareable URL or export JSON
    navigator.clipboard.writeText(JSON.stringify(form, null, 2));
    toast({
      title: "Form data copied",
      description: "Form data has been copied to clipboard as JSON.",
    });
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-foreground font-poppins">
            {form.title || "Untitled Form"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(form.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={toggleThemeSettings}>
            <Settings size={16} className="mr-2" />
            Theme
          </Button>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            Export
          </Button>
          <Button 
            variant={mode === 'edit' ? 'outline' : 'default'} 
            size="sm" 
            onClick={handleModeToggle}
          >
            {mode === 'edit' ? (
              <>
                <Eye size={16} className="mr-2" />
                Preview
              </>
            ) : (
              <>
                <Pencil size={16} className="mr-2" />
                Edit
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
