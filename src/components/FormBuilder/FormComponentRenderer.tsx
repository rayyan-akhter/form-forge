
import { FormComponent } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useFormStore } from "@/store/formStore";

interface FormComponentRendererProps {
  component: FormComponent;
  isPreview: boolean;
}

export default function FormComponentRenderer({ component, isPreview }: FormComponentRendererProps) {
  const { form } = useFormStore();
  const id = useId();
  
  // Apply theme styles dynamically
  const theme = form.theme;
  
  const labelStyles = {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize.label,
    marginBottom: theme.spacing,
  };
  
  const inputStyles = {
    borderRadius: theme.borderRadius,
  };
  
  const requiredIndicator = component.required ? <span className="text-red-500 ml-1">*</span> : null;
  
  const renderComponentByType = () => {
    switch (component.type) {
      case 'shortText':
        return (
          <div>
            <Label htmlFor={id} style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <Input
              id={id}
              placeholder={component.placeholder}
              style={inputStyles}
              disabled={!isPreview}
            />
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'longText':
        return (
          <div>
            <Label htmlFor={id} style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <Textarea
              id={id}
              placeholder={component.placeholder}
              style={inputStyles}
              disabled={!isPreview}
            />
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'email':
        return (
          <div>
            <Label htmlFor={id} style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <Input
              id={id}
              type="email"
              placeholder={component.placeholder}
              style={inputStyles}
              disabled={!isPreview}
            />
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'number':
        return (
          <div>
            <Label htmlFor={id} style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <Input
              id={id}
              type="number"
              placeholder={component.placeholder}
              style={inputStyles}
              disabled={!isPreview}
            />
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <div>
            <Label style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <div className="space-y-2 mt-2">
              {component.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox id={`${id}-${option.id}`} disabled={!isPreview} />
                  <Label htmlFor={`${id}-${option.id}`} className="text-sm font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'radio':
        return (
          <div>
            <Label style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <RadioGroup className="mt-2" disabled={!isPreview}>
              {component.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem id={`${id}-${option.id}`} value={option.value} />
                  <Label htmlFor={`${id}-${option.id}`} className="text-sm font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'select':
        return (
          <div>
            <Label htmlFor={id} style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <Select disabled={!isPreview}>
              <SelectTrigger id={id} style={inputStyles}>
                <SelectValue placeholder={component.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {component.options?.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'date':
        return (
          <div>
            <Label htmlFor={id} style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={id}
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !component.defaultValue && "text-muted-foreground"
                  )}
                  style={inputStyles}
                  disabled={!isPreview}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {component.defaultValue ? 
                    format(new Date(component.defaultValue as string), "PPP") : 
                    component.placeholder || "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar />
              </PopoverContent>
            </Popover>
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'phone':
        return (
          <div>
            <Label htmlFor={id} style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <Input
              id={id}
              type="tel"
              placeholder={component.placeholder}
              style={inputStyles}
              disabled={!isPreview}
            />
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'name':
        return (
          <div>
            <Label htmlFor={id} style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <Input
              id={id}
              placeholder={component.placeholder}
              style={inputStyles}
              disabled={!isPreview}
            />
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'address':
        return (
          <div className="space-y-4">
            <Label style={labelStyles}>
              {component.label} {requiredIndicator}
            </Label>
            <div className="space-y-2">
              <Input 
                placeholder="Street Address" 
                style={inputStyles} 
                disabled={!isPreview} 
              />
              <Input 
                placeholder="Street Address Line 2" 
                style={inputStyles} 
                disabled={!isPreview} 
              />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="City" style={inputStyles} disabled={!isPreview} />
                <Input placeholder="State / Province" style={inputStyles} disabled={!isPreview} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Postal / Zip Code" style={inputStyles} disabled={!isPreview} />
                <Select disabled={!isPreview}>
                  <SelectTrigger style={inputStyles}>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {component.helpText && (
              <p className="text-sm text-muted-foreground mt-1">{component.helpText}</p>
            )}
          </div>
        );
      
      case 'heading':
        return (
          <h2 
            style={{ 
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSize.heading,
              fontWeight: 600,
            }}
          >
            {component.label}
          </h2>
        );
      
      case 'paragraph':
        return (
          <p
            style={{ 
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSize.base,
            }}
          >
            {component.label}
          </p>
        );
      
      case 'divider':
        return (
          <hr className="my-4" style={{ borderColor: theme.primaryColor + '20' }} />
        );
      
      default:
        return (
          <div>Unsupported component type: {component.type}</div>
        );
    }
  };

  return (
    <div className={cn(
      "w-full",
      component.width === 'half' && "md:w-1/2",
      component.width === 'third' && "md:w-1/3",
    )}>
      {renderComponentByType()}
    </div>
  );
}
