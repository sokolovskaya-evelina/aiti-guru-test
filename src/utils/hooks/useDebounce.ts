import { useState, useEffect } from "react"

export const useDebounce = <T>(value: T, milliseconds: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, milliseconds)

    return () => clearTimeout(handler)
  }, [value, milliseconds])

  return debouncedValue
}
