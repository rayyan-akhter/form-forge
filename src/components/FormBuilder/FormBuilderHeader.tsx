
"use client";

import { useFormStore } from "@/store/formStore";
import { Button } from "@/components/ui/button";
import { Eye, PenSquare, Palette, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function FormBuilderHeader() {
  const { mode, setMode, toggleThemeSettings, form } = useFormStore();
  const navigate = useNavigate();
  
  const handleSave = () => {
    // Get existing forms from localStorage or initialize empty array
    const existingForms = JSON.parse(localStorage.getItem('savedForms') || '[]');
    
    // Check if the form already exists (to update it)
    const formIndex = existingForms.findIndex((savedForm) => savedForm.id === form.id);
    
    if (formIndex !== -1) {
      // Update existing form
      existingForms[formIndex] = {
        ...form,
        lastEdited: new Date().toISOString()
      };
    } else {
      // Add new form
      existingForms.push({
        ...form,
        lastEdited: new Date().toISOString()
      });
    }
    
    // Save updated forms to localStorage
    localStorage.setItem('savedForms', JSON.stringify(existingForms));
    
    toast.success("Form saved successfully!");
    navigate("/");
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Form Builder</h1>
          <div className="flex border rounded-md overflow-hidden">
            <Link to="/form-builder">
              <Button
                variant={mode === 'edit' ? "default" : "outline"}
                size="sm"
                className="rounded-none"
                onClick={() => {
                  if (mode !== 'edit') {
                    setMode('edit');
                  }
                }}
              >
                <PenSquare className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Link to="/preview">
              <Button
                variant={mode === 'preview' ? "default" : "outline"}
                size="sm"
                className="rounded-none"
                onClick={() => {
                  if (mode !== 'preview') {
                    setMode('preview');
                  }
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleThemeSettings}>
            <Palette className="w-4 h-4 mr-2" />
            Theme
          </Button>
          <Button variant="default" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </header>
  );
}
