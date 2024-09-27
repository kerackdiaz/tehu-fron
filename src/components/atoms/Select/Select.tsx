import React from 'react';

interface Option {
  id: string;
  name: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean
}


const Select: React.FC<SelectProps> = ({ options, value, onChange, label, disabled }) => {
  return (
    <>
      <label className='pl-1'>{label}:</label>
      <select value={value} onChange={onChange} disabled={disabled}  className={`rounded-md h-10 px-2 ${disabled ? 'bg-gray-200 border-none cursor-not-allowed text-black' : 'border-gray-300 border h-10 outline-none'}`}>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </>
  );
};

export default Select;

