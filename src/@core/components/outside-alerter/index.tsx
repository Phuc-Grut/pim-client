import React, { useRef, useEffect } from "react"


function useOutsideAlerter(ref: any, onclickOutside: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onclickOutside(true)
      } else {
        onclickOutside(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}


function OutsideAlerter(props: any) {
  const {onclickOutside, children} = props
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, onclickOutside)

  return <div ref={wrapperRef}>{children}</div>
}


export default OutsideAlerter
