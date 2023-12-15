'use client';

import L from 'leaflet';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRul: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
})

interface MapProps {
    center?: number[]
}
const Map:React.FC<MapProps> = ({
    center
}) => {
    return ( 
        <div>
            <MapContainer
                center={center as L.LatLngExpression}
                zoom={center? 4: 2}
                scrollWheelZoom={false}
                className='"h-35vh rounded-lg'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
     );
}
 
export default Map;