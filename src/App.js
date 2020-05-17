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
  dots: 'race',
  bg: 'street'
}

const QUERY_TYPES = {
  lat: NumberParam,
  lon: NumberParam,
  zoom: NumberParam,
  dots: StringParam,
  bg: StringParam
}

function App () {
  useHistoryUpdate(history)

  const [query, setQuery] = useQueryParams(QUERY_TYPES)
  const { lat, lon, zoom, dots, bg } = merge({}, DEFAULT_STATE, query)

  const handleViewportChanged = useCallback(viewport => {
    const { latitude, longitude, zoom } = viewport
    if (!(latitude && longitude && zoom)) return
    setQuery({
      lat: latitude.toFixed(4), // see https://xkcd.com/2170/
      lon: longitude.toFixed(4),
      zoom: zoom.toFixed(2)
    })
  }, [setQuery])

  const handleChangeDots = useCallback(dots => setQuery({ dots }), [setQuery])
  const handleChangeBg = useCallback(bg => setQuery({ bg }), [setQuery])

  const map = (
    <Map
      latitude={lat}
      longitude={lon}
      zoom={zoom}
      onViewportChanged={handleViewportChanged}
      dots={dots}
      bg={bg}
    />
  )

  const controls = (
    <ControlPane
      dots={dots}
      onChangeDots={handleChangeDots}
      bg={bg}
      onChangeBg={handleChangeBg}
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
