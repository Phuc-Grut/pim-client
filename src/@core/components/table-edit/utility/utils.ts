//** React Imports
import { useEffect } from 'react'

export const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(
    () => {
      const listener = (event: any) => {
        // ** Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        // ** Call passed function on click outside
        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // ** Add ref and handler to effect dependencies
    // ** It's worth noting that because passed in handler is a new ...
    // ** ... function on every render that will cause this effect ...
    // ** ... callback/cleanup to run every render. It's not a big deal ...
    // ** ... but to optimize you can wrap handler in useCallback before ...
    // ** ... passing it into this hook.
    [ref, handler]
  )
}

export const isNullOrUndefined = (d: any) => {
  if (d === null || d === undefined) {
    return true
  }
  return false
}

export const generateUUID = () => { // Public Domain/MIT
  let d = new Date().getTime()//Timestamp
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16//random number between 0 and 16
    if (d > 0) { //Use timestamp until depleted
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else { //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : 0x3).toString(16)
  })
}