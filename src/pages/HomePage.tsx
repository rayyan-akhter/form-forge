
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilePlus, ArrowRight } from "lucide-react";

interface FormItem {
  id: string;
  title: string;
  lastEdited: string;
}

const HomePage = () => {
  const [savedForms, setSavedForms] = useState<FormItem[]>([]);

  // In a real app, we would fetch saved forms from a backend
  // For now, we'll mock some data from localStorage
  useEffect(() => {
    // This is just a mock implementation
    const mockForms = localStorage.getItem('savedForms') 
      ? JSON.parse(localStorage.getItem('savedForms') || '[]')
      : [];
    
    setSavedForms(mockForms);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold">Form Builder Dashboard</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Create a New Form</h2>
          <p className="text-gray-600 mb-4">
            Start with a blank form and add your own questions and components.
          </p>
          <Link to="/form-builder">
            <Button className="mt-2">
              <FilePlus className="w-4 h-4 mr-2" />
              Create New Form
            </Button>
          </Link>
        </div>
        
        {savedForms.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedForms.map((form) => (
                <div 
                  key={form.id} 
                  className="p-4 border rounded-md hover:border-gray-300 transition-colors"
                >
                  <h3 className="font-medium mb-2">{form.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Last edited: {new Date(form.lastEdited).toLocaleDateString()}
                  </p>
                  <Link to={`/form-builder?id=${form.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Edit
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <h2 className="text-xl font-semibold mb-2">No Saved Forms</h2>
            <p className="text-gray-600">
              Create your first form to see it listed here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
