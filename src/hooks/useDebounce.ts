import React from "react"

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
/**
 * @example
 *   const [searchString, setSearchString] = useState(keyword);
 *   const debounceSearch = useDebounce(searchString, 500);
 */