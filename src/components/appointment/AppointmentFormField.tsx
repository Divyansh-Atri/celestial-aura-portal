
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AppointmentFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const AppointmentFormField: React.FC<AppointmentFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <Label htmlFor={id} className="text-celestial-stardust mb-2 block">{label} {required && '*'}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="bg-celestial-dark-blue/50 border-celestial-stardust/20 text-celestial-stardust"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default AppointmentFormField;
