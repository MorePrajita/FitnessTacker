// import React from 'react';

// interface InputProps {
//     label?: string;
//     type?: React.HTMLInputTypeAttribute;
//     value: string | number;
//     onChange: (value: string | number) => void;
//     placeholder?: string;
//     className?: string;
//     required?: boolean;
//     min?: string | number;
//     max?: string | number;
// }

// export default function Input({ label, type = 'text', value, onChange, placeholder = '', className = '', required = false, min, max }: InputProps) {
//     return (
//         <div className={`space-y-2 ${className}`}>
//             {label && (
//                 <label className='block text-sm font-medium text-slate-700 dark:text-slate-300'>
//                     {label}
//                     {required && <span className='text-red-500 ml-1'>*</span>}
//                 </label>
//             )}
//             <input
//                 type={type}
//                 value={value}
//                 onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
//                 placeholder={placeholder}
//                 min={min}
//                 max={max}
//                 className='w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200'
//             />
//         </div>
//     );
// }
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps {
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
}

export default function Input({ 
    label, 
    type = 'text', 
    value, 
    onChange, 
    placeholder = '', 
    className = '', 
    required = false 
}: InputProps) {
    
    // Handle the change event properly
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // If it's a number type, we still pass it as a string to the parent 
        // to avoid issues with leading zeros or empty states
        onChange(val);
    };

    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-300 ml-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={cn(
                    'w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none',
                    'border-slate-700 bg-slate-800/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500/20 focus:border-green-500',
                    className
                )}
            />
        </div>
    );
}