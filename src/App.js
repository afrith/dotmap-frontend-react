import React, { useCallback } from 'react'
import { QueryParamProvider, useQueryParams, NumberParam } from 'use-query-params'
import './App.css'
import DrawerLayout from './DrawerLayout'
import Map from './Map'

function App () {
  console.log('Rendering')

  const [query, setQuery] = useQueryParams({ lat: NumberParam, lon: NumberParam, zoom: NumberParam })
  const viewport = {
    center: [query.lat || -28.5, query.lon || 24.6],
    zoom: query.zoom || 6
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
