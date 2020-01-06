import React, { useCallback } from 'react'
import { QueryParamProvider, useQueryParams, NumberParam, StringParam } from 'use-query-params'
import { createBrowserHistory } from 'history'
import { merge } from 'lodash'
import './App.css'
import DrawerLayout from './DrawerLayout'
import Map from './Map'
import ControlPane from './ControlPane'
import useHistoryUpdate from './useHistoryUpdate'

const history = createBrowserHistory()

const DEFAULT_STATE = {
  lat: -28.5,
  lon: 24.6,
  zoom: 6,
  dots: 'race'
}

const QUERY_TYPES = {
  lat: NumberParam,
  lon: NumberParam,
  zoom: NumberParam,
  dots: StringParam
}

function App () {
  useHistoryUpdate(history)

  const [query, setQuery] = useQueryParams(QUERY_TYPES)
  const { lat, lon, zoom, dots } = merge({}, DEFAULT_STATE, query)
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

  const handleChangeDots = useCallback(dots => setQuery({ dots }), [setQuery])

  const map = (
    <Map
      viewport={viewport}
      onViewportChanged={handleViewportChanged}
      dots={dots}
    />
  )

  const controls = (
    <ControlPane
      dots={dots}
      onChangeDots={handleChangeDots}
    />
  )

  return (
    <DrawerLayout
      title='Dot Map of South Africa'
      mainContent={map}
      drawerContent={controls}
    />
  )
}

export default () => (
  <QueryParamProvider history={history}>
    <App />
  </QueryParamProvider>
)
