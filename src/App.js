import React, { useCallback } from 'react'
import { QueryParamProvider, useQueryParams, NumberParam } from 'use-query-params'
import { merge } from 'lodash'
import './App.css'
import DrawerLayout from './DrawerLayout'
import Map from './Map'

const DEFAULT_STATE = {
  lat: -28.5,
  lon: 24.6,
  zoom: 6
}

const QUERY_TYPES = {
  lat: NumberParam,
  lon: NumberParam,
  zoom: NumberParam
}

function App () {
  const [query, setQuery] = useQueryParams(QUERY_TYPES)
  const { lat, lon, zoom } = merge({}, DEFAULT_STATE, query)
  const viewport = {
    center: [lat, lon],
    zoom: zoom
  }

  const handleViewportChanged = useCallback(viewport => {
    const { center, zoom } = viewport
    setQuery({
      lat: center[0].toFixed(5), // see https://xkcd.com/2170/
      lon: center[1].toFixed(5),
      zoom
    })
  }, [setQuery])

  return (
    <QueryParamProvider history={window.history}>
      <DrawerLayout
        title='Dot Map of South Africa'
        mainContent={<Map viewport={viewport} onViewportChanged={handleViewportChanged} />}
        drawerContent='Controls'
      />
    </QueryParamProvider>
  )
}

export default App
