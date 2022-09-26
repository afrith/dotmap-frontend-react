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
  const { lat, lon, zoom: queryZoom, dots, bg } = merge({}, DEFAULT_STATE, query)
  const zoom = queryZoom + 5

  const handleViewportChanged = useCallback(viewport => {
    const { latitude, longitude, zoom } = viewport
    if (!(latitude && longitude && zoom)) return
    setQuery({
      lat: latitude.toFixed(4), // see https://xkcd.com/2170/
      lon: longitude.toFixed(4),
      zoom: (zoom - 5).toFixed(2)
    }, 'replaceIn')
  }, [setQuery])

  const handleChangeDots = useCallback(dots => setQuery({ dots }, 'replaceIn'), [setQuery])
  const handleChangeBg = useCallback(bg => setQuery({ bg }, 'replaceIn'), [setQuery])

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
      zoom={zoom}
    />
  )

  return (
    <DrawerLayout
      title='Dot Map of South Africa'
      subtitle={<>by <a style={{ color: 'white' }} href='https://adrian.frith.dev/'>Adrian Frith</a></>}
      mainContent={map}
      drawerContent={controls}
    />
  )
}

const WrappedApp = () => (
  <QueryParamProvider history={history}>
    <App />
  </QueryParamProvider>
)

export default WrappedApp
