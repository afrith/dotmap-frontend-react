import { useEffect, useReducer } from 'react'

// Listens to the history object for changes and forces the component to re-render
export default function useHistoryUpdate (history) {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    // history.listen returns an 'unlisten' function which we return here so it is called by useEffect() cleanup
    return history.listen(() => {
      forceUpdate()
    })
  }, [history])
}
