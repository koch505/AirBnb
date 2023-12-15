import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import qs from 'query-string';

import { IconType } from "react-icons";

interface CategoryProps {
    label: string;
    selected?: boolean
    icon: IconType
}

const CategoryBox: React.FC<CategoryProps> = ({
   label,
   selected,
   icon: Icon 
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
       let currentQuery = {};  

       if (params) {
            currentQuery = qs.parse(params.toString());
       }

       const updatedQuery: any = {
            ...currentQuery,
            category: label
       }

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        router.push(url);
       
    }, [label, params, router]);

    return ( 
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                justify-content
                gap-2
                p-3
                border-b-2
                hover:text-neutral-8000
                transition
                cursor-pointer
                ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                ${selected ? 'text-neutral-800' : 'text-neutral-500'}            
            `}
        >
            <Icon     
                size={26} 
            />
            <div
                className="
                    font-medium
                    text-sm
                "
            >
                {label}
            </div>
        </div>
    );
}
 
export default CategoryBox;