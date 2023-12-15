import Container from "../container";

import { useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBoatFishing, GiCastle, GiIsland, GiWindmill } from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from "./CategoryBox";


export const categoires = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is close to the beach!'
    },
    {
        label: 'polls',
        icon: TbPool,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is close to the beach!'
    }
    
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');

    return ( 
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categoires.map(item => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={item.label === category}
                    />
                ))}
            </div>
        </Container>
    )
}
 
export default Categories;