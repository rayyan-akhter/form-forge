
"use client";

import { useFormStore } from "@/store/formStore";
import { Button } from "@/components/ui/button";
import { Eye, PenSquare, Share2, DownloadIcon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function FormBuilderHeader() {
  const { mode, setMode } = useFormStore();
  
  const togglePreview = () => {
    if (mode === 'edit') {
      setMode('preview');
    } else {
      setMode('edit');
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Form Builder</h1>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={mode === 'edit' ? "default" : "outline"}
              size="sm"
              className="rounded-none"
              onClick={() => {
                if (mode !== 'edit') {
                  setMode('edit');
                }
              }}
              as={Link}
              to="/"
            >
              <PenSquare className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant={mode === 'preview' ? "default" : "outline"}
              size="sm"
              className="rounded-none"
              onClick={() => {
                if (mode !== 'preview') {
                  setMode('preview');
                }
              }}
              as={Link}
              to="/preview"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            as={Link}
            to="/"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Exit
          </Button>
        </div>
      </div>
    </header>
  );
}
