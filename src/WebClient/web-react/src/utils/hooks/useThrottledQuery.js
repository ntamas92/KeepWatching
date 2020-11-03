import { useState, useEffect } from "react"

const useThrottledQuery = (fetchingFunction, fetchCallback) => {
  const [query, setQuery] = useState(null)
  const [pendingQuery, setPendingQuery] = useState(null)

  useEffect(() => {
    if (query === null && pendingQuery !== null) {
      setPendingQuery(null)
      setQuery(pendingQuery)

      fetchingFunction(pendingQuery)
        .then(fetchCallback)
        .catch(console.error)
        .finally(x => setQuery(null))
    }
  }, [query, pendingQuery, fetchingFunction, fetchCallback])

  return setPendingQuery
}

export default useThrottledQuery