
import { useFormStore } from "@/store/formStore";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import FormComponentRenderer from "./FormComponentRenderer";
import { FormComponent } from "@/types/form";
import { GripVertical, Trash, Copy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormSettings from "./FormSettings";

export default function FormBuilderCanvas() {
  const { 
    form, 
    mode, 
    selectedComponentId,
    selectComponent,
    updateComponent,
    removeComponent,
    duplicateComponent,
    moveComponent,
    setIsDragging,
    toggleComponentSettings,
  } = useFormStore();
  
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setIsDragging(false);
    
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeIndex = form.components.findIndex((c) => c.id === active.id);
      const overIndex = form.components.findIndex((c) => c.id === over.id);
      
      moveComponent(activeIndex, overIndex);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setIsDragging(false);
  };

  const activeComponent = form.components.find((c) => c.id === activeId);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-8rem)]">
        <FormSettings />
        
        {form.components.length === 0 && mode === 'edit' ? (
          <div className="form-placeholder mt-8 text-center">
            <p>Drag components here to build your form</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={form.components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4 mt-8">
                {form.components.map((component) => (
                  <SortableFormComponent
                    key={component.id}
                    component={component}
                    isSelected={component.id === selectedComponentId}
                    onSelect={selectComponent}
                    onRemove={removeComponent}
                    onDuplicate={duplicateComponent}
                    onOpenSettings={toggleComponentSettings}
                    isEditMode={mode === 'edit'}
                  />
                ))}
              </div>
            </SortableContext>
            
            <DragOverlay>
              {activeId && activeComponent && (
                <div className="form-component-container opacity-70 border-dashed border-primary w-full">
                  <FormComponentRenderer component={activeComponent} isPreview={false} />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
}

interface SortableFormComponentProps {
  component: FormComponent;
  isSelected: boolean;
  isEditMode: boolean;
  onSelect: (id: string | null) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onOpenSettings: () => void;
}

function SortableFormComponent({
  component,
  isSelected,
  isEditMode,
  onSelect,
  onRemove,
  onDuplicate,
  onOpenSettings
}: SortableFormComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  const handleClick = () => {
    if (isEditMode) {
      onSelect(isSelected ? null : component.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`form-component-container group ${isSelected ? 'form-component-selected' : ''}`}
      onClick={handleClick}
    >
      <FormComponentRenderer component={component} isPreview={!isEditMode} />
      
      {isEditMode && (
        <div className="form-component-controls">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(component.id);
            }}
          >
            <Copy size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(component.id);
            }}
          >
            <Trash size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(component.id);
              onOpenSettings();
            }}
          >
            <Settings size={16} />
          </Button>
          <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          >
            <GripVertical size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
