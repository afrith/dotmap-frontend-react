import React from 'react'
import './App.css'
import DrawerLayout from './DrawerLayout'

function App () {
  return (
    <DrawerLayout
      title='Dot Map of South Africa'
      mainContent={<div style={{ backgroundColor: 'red', height: '100%' }}>Map</div>}
      drawerTitle='Settings'
      drawerContent='Controls'
    />
  )
}

export default App
