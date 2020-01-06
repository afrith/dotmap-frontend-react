import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

export default function Map (props) {
  const { viewport, onViewportChanged = () => {}, dots, bg } = props

  return (
    <LeafletMap
      viewport={viewport}
      onViewportChanged={onViewportChanged}
      minZoom={6}
      maxZoom={14}
    >
      {bg === 'street' && (
        <TileLayer
          attribution='Streetmap &amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
          zIndex={1}
        />
      )}
      {bg === 'aerial' && (
        <TileLayer
          attribution='Aerial photo by <a href="http://www.ngi.gov.za/">NGI</a>'
          url='http://{s}.aerial.openstreetmap.org.za/ngi-aerial/{z}/{x}/{y}.jpg'
          zIndex={1}
        />
      )}
      <TileLayer
        attribution='Dots &amp;copy; <a href="http://adrianfrith.com/">Adrian Frith</a> based on data from <a href="http://www.statssa.gov.za/">Census 2011</a>'
        url={`https://dotmap.adrianfrith.com/tiles/${dots}/{z}/{x}/{y}.png`}
        zIndex={2}
      />
    </LeafletMap>
  )
}
