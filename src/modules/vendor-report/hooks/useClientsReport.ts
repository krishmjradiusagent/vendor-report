import { useState, useMemo } from 'react'
import { CLIENT_MOCK_DATA } from '../core/clientMockData'
import { Client } from '../core/schema'

export function useClientsReport() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Client; direction: 'asc' | 'desc' } | null>(null)

  const filteredData = useMemo(() => {
    let result = [...CLIENT_MOCK_DATA]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.phone.toLowerCase().includes(query) ||
          item.address.toLowerCase().includes(query)
      )
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue === undefined || bValue === undefined) return 0
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [searchQuery, sortConfig])

  const handleSort = (key: keyof Client) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' }
        return null
      }
      return { key, direction: 'asc' }
    })
  }

  return {
    clients: filteredData,
    searchQuery,
    setSearchQuery,
    handleSort,
    sortConfig,
  }
}
