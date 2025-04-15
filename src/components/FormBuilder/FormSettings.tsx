
import { useFormStore } from "@/store/formStore";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FormSettings() {
  const { form, updateFormSettings, mode } = useFormStore();
  const [title, setTitle] = useState(form.title);
  const [description, setDescription] = useState(form.description || "");

  useEffect(() => {
    setTitle(form.title);
    setDescription(form.description || "");
  }, [form.title, form.description]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleBlur = () => {
    updateFormSettings(title, description);
  };

  return (
    <div className="space-y-4">
      {mode === 'edit' ? (
        <>
          <Input
            className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            placeholder="Form Title"
          />
          <Textarea
            className="resize-none border-none p-0 focus-visible:ring-0"
            value={description}
            onChange={handleDescriptionChange}
            onBlur={handleBlur}
            placeholder="Form Description (optional)"
          />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </>
      )}
    </div>
  );
}
