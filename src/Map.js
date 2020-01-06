import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

export default function Map (props) {
  const { viewport, onViewportChanged = () => {}, dots } = props

  return (
    <LeafletMap
      viewport={viewport}
      onViewportChanged={onViewportChanged}
    >
      <TileLayer
        attribution='Streetmap &amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
      />
      <TileLayer
        attribution='Dots &amp;copy; <a href="http://adrianfrith.com/">Adrian Frith</a> based on data from <a href="http://www.statssa.gov.za/">Census 2011</a>'
        url={`https://dotmap.adrianfrith.com/tiles/${dots}/{z}/{x}/{y}.png`}
      />
    </LeafletMap>
  )
}
