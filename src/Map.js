import React, { useState, useEffect } from 'react'
import ReactMapGL, { Source, Layer, WebMercatorViewport } from 'react-map-gl'
import { fromJS } from 'immutable'

const streetmapStyle = 'https://maptiles.frith.dev/styles/positron/style.json'

const aerialStyle = fromJS({
  version: 8,
  sources: {
    'ngi-aerial': {
      type: 'raster',
      tiles: ['http://localhost:3000/ngi-aerial/{z}/{x}/{y}.jpg'],
      tileSize: 256,
      minzoom: 0,
      maxzoom: 20,
      attribution: 'Aerial photo by <a href="http://www.ngi.gov.za/">NGI</a>'
    }
  },
  layers: [
    {
      id: 'aerial',
      source: 'ngi-aerial',
      type: 'raster',
      paint: {
        'raster-brightness-max': 0.6,
        'raster-saturation': -0.5
      }
    }
  ]
})

const colours = {
  race: ['#60b260', '#f4b925', '#ea4934', '#b270e5', '#777777']
}

const sourceCodes = Object.keys(colours)

const sources = sourceCodes.map(code => ({
  id: code,
  type: 'vector',
  tiles: [`http://localhost:3000/tiles/${code}/{z}/{x}/{y}.mvt`],
  maxzoom: 13
}))

const layers = {}
sourceCodes.forEach(code => {
  layers[code] = {
    id: code + '-dot',
    type: 'circle',
    source: code,
    'source-layer': code,
    paint: {
      'circle-color': ['to-color', ['at', ['get', 'race'], ['literal', colours[code]]]],
      'circle-opacity': 0.5,
      'circle-radius': 2.2
    }
  }
})

const calculateInitialViewport = ({ width, height }) => {
  const { longitude, latitude, zoom } = new WebMercatorViewport({ width, height })
    .fitBounds([[16.45, -34.833333], [32.891667, -22.127778]], { padding: 20 })

  return { longitude, latitude, zoom }
}

export default function Map (props) {
  const {
    dots,
    bg,
    latitude: receivedLatitude,
    longitude: receivedLongitude,
    zoom: receivedZoom,
    onViewportChanged = () => {}
  } = props
  const [viewport, setViewport] = useState({})
  const [locationInitialised, setLocationInitialised] = useState(false)

  // If the location has not been initialised, set it to cover the whole of SA,
  // but only once the viewport size is known.
  useEffect(() => {
    if (locationInitialised || !viewport.height || !viewport.width) return
    const newViewport = calculateInitialViewport({ width: viewport.width, height: viewport.height })
    setViewport(viewport => ({ ...viewport, ...newViewport }))
    setLocationInitialised(true)
  }, [viewport.width, viewport.height, locationInitialised])

  // When the viewport changes, do debounced notifications to our parent
  useEffect(() => {
    if (!viewport) return
    const timeout = setTimeout(() => { onViewportChanged(viewport) }, 250)
    return () => { clearTimeout(timeout) }
  }, [viewport, onViewportChanged])

  // When we receive new viewport details from our parent, update internal state
  useEffect(() => {
    if (!(receivedLatitude && receivedLongitude && receivedZoom)) return
    setViewport(viewport => ({ ...viewport, latitude: receivedLatitude, longitude: receivedLongitude, zoom: receivedZoom }))
    setLocationInitialised(true)
  }, [receivedLatitude, receivedLongitude, receivedZoom])

  return (
    <ReactMapGL
      mapStyle={bg === 'street' ? streetmapStyle : aerialStyle}
      {...viewport}
      width='100%'
      height='100%'
      onViewportChange={vp => setViewport(vp)}
      maxZoom={14}
    >
      {sources.map(s => <Source key={s.id} {...s} />)}
      <Layer key={dots} {...layers[dots]} beforeId={bg === 'street' ? 'highway_name_other' : null} />
    </ReactMapGL>
  )
}
