
import { useEffect, useState } from "react"

export const useDebounce = (value: string, milliSeconds: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, milliSeconds)
 
    return () => {
      clearTimeout(handler)
    }
  }, [value, milliSeconds])
 
  return debouncedValue
}
