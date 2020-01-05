import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

export default function Map (props) {
  const { viewport, onViewportChanged = () => {} } = props

  return (
    <LeafletMap
      viewport={viewport}
      onViewportChanged={onViewportChanged}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
      />
    </LeafletMap>
  )
}
