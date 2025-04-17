
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { useFormStore } from "@/store/formStore";
import { useEffect } from "react";

export default function PreviewPage() {
  const { setMode } = useFormStore();
  
  useEffect(() => {
    setMode('preview');
  }, [setMode]);
  
  return <FormBuilder />;
}
