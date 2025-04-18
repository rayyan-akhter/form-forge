import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilePlus, ArrowRight, Trash2 } from "lucide-react";
import { useFormStore } from "@/store/formStore";
import { toast } from "sonner";

interface FormItem {
  id: string;
  title: string;
  lastEdited: string;
  description?: string;
}

const HomePage = () => {
  const [savedForms, setSavedForms] = useState<FormItem[]>([]);
  const { updateFormSettings, resetForm } = useFormStore();
  const navigate = useNavigate();

  // Fetch saved forms from localStorage
  const fetchSavedForms = () => {
    try {
      const storedForms = localStorage.getItem('savedForms');
      const parsedForms = storedForms ? JSON.parse(storedForms) : [];
      setSavedForms(parsedForms);
    } catch (error) {
      console.error("Error loading saved forms:", error);
      toast.error("Failed to load saved forms");
    }
  };

  // Load saved forms when component mounts
  useEffect(() => {
    fetchSavedForms();
  }, []);

  // Delete a form
  const handleDeleteForm = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const forms = JSON.parse(localStorage.getItem('savedForms') || '[]');
      const updatedForms = forms.filter((form: FormItem) => form.id !== id);
      localStorage.setItem('savedForms', JSON.stringify(updatedForms));
      
      setSavedForms(updatedForms);
      toast.success("Form deleted successfully");
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Failed to delete form");
    }
  };

  // Handle creating a new form
  const handleCreateNewForm = () => {
    resetForm();
    navigate("/form-builder");
  };

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
          <Button className="mt-2" onClick={handleCreateNewForm}>
            <FilePlus className="w-4 h-4 mr-2" />
            Create New Form
          </Button>
        </div>
        
        {savedForms && savedForms.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedForms.map((form) => (
                <div 
                  key={form.id} 
                  className="p-4 border rounded-md hover:border-gray-300 transition-colors relative"
                >
                  <h3 className="font-medium mb-2">{form.title}</h3>
                  {form.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{form.description}</p>
                  )}
                  <p className="text-sm text-gray-500 mb-3">
                    Last edited: {new Date(form.lastEdited).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Link 
                      to={`/form-builder?id=${form.id}`} 
                      className="flex-1"
                      onClick={() => {
                        // Update the form store with this form's data
                        updateFormSettings(form.title, form.description);
                        // Note: In a real implementation, you'd load the full form data into the store
                      }}
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        Edit
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => handleDeleteForm(form.id, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
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