import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

interface Props {
  currentPosition: [number, number],
  selectedPosition: [number, number],
  zoom?: number,
  mapSelection: (event: LeafletMouseEvent) => void,
}

const PointsMap: React.FC<Props> = (props) => {
  const {
    currentPosition,
    selectedPosition,
    zoom,
    mapSelection,
  } = props;

  const defaultPosition = selectedPosition.length > 0 && selectedPosition[0] === 0 && selectedPosition[1] === 0;

  return (
    <Map
      center={defaultPosition ? currentPosition : selectedPosition}
      zoom={zoom}
      onClick={mapSelection}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={selectedPosition} />
    </Map>
  );
};

PointsMap.defaultProps = {
  currentPosition: [0, 0],
  selectedPosition: [0, 0],
  zoom: 16,
};

export default PointsMap;
