import * as React from 'react'
import type { VendorTransaction } from '../core/types'
import { MOCK_TRANSACTIONS } from '../core/mockData'

type DataSource = 'mock' | 'api'

interface VendorFlowContextType {
  data: VendorTransaction[]
  isLoading: boolean
  source: DataSource
  config: {
    primaryColor: string
    showSidePanel: boolean
    showTopNav: boolean
  }
}

const VendorFlowContext = React.createContext<VendorFlowContextType | undefined>(undefined)

export function VendorFlowProvider({ 
  children, 
  source = 'mock',
  config = {
    primaryColor: '#4F46E5',
    showSidePanel: true,
    showTopNav: true
  }
}: { 
  children: React.ReactNode
  source?: DataSource
  config?: Partial<VendorFlowContextType['config']>
}) {
  const [data, setData] = React.useState<VendorTransaction[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Logic Layer: Data Toggling between source modes
    const loadData = async () => {
      setIsLoading(true)
      if (source === 'mock' || import.meta.env.VITE_MOCK_MODE === 'true') {
        // Humanized delay for realistic "settling" feel
        await new Promise(r => setTimeout(r, 800))
        setData(MOCK_TRANSACTIONS)
      } else {
        // API fetch logic would go here
        // const res = await fetch('/api/vendor-report')
        // setData(await res.json())
      }
      setIsLoading(false)
    }
    loadData()
  }, [source])

  const value = React.useMemo(() => ({
    data,
    isLoading,
    source,
    config: {
      primaryColor: '#4F46E5',
      showSidePanel: true,
      showTopNav: true,
      ...config
    }
  }), [data, isLoading, source, config])

  return (
    <VendorFlowContext.Provider value={value}>
      {children}
    </VendorFlowContext.Provider>
  )
}

export function useVendorFlow() {
  const context = React.useContext(VendorFlowContext)
  if (!context) throw new Error('useVendorFlow must be used within a VendorFlowProvider')
  return context
}
