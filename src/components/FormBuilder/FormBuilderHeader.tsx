
"use client";

import { useFormStore } from "@/store/formStore";
import { Button } from "@/components/ui/button";
import { Eye, PenSquare, Palette, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function FormBuilderHeader() {
  const { mode, setMode, toggleThemeSettings } = useFormStore();
  const navigate = useNavigate();
  
  const handleSave = () => {
    // Here we would typically save the form to a backend
    // For now, we'll just show a toast and redirect to home
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
