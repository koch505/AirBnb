'use client';

import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
} from 'react-hook-form';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors;
}


const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors
}) => {
    return ( 
        <div className='w-full relative'>
            div
        </div>
     );
}
 
export default Input;
