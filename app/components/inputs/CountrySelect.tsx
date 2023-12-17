'use client';

import Select from 'react-select';

import useCounties from '@/app/hooks/useCountries';

export type CountrySelectValue = {
    flag: string,
    label: string,
    lating: number[],
    region: string,
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue,
    onChange: (value: CountrySelectValue) => void 
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useCounties();
    // test
    return ( 
        <div>
            <Select 
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div
                        className='
                            flex
                            flex-row
                            tiems-center
                            gap-3
                        '  
                    >
                        <div>
                            {option.flag}
                        </div>
                        <span className='text-neutral-800 ml-1'>
                            {option.region}
                        </span>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'

                    }
                })}
            />
        </div>
     );
}
 
export default CountrySelect;