import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

interface Props {
  position: [number, number]
  zoom?: number
}

const PointsMap: React.FC<Props> = (props) => {
  const { position, zoom } = props;

  return (
    <Map
      center={position}
      zoom={zoom}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={position} />
    </Map>
  );
};

PointsMap.defaultProps = {
  position: [-19.9232945, -43.9462827],
  zoom: 16,
};

export default PointsMap;
