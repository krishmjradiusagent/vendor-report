import * as React from 'react'
import { useVendorFlow } from '../context/VendorFlowProvider'
import type { VendorTransaction } from '../core/schema'

export function useVendorReport() {
  const { data, isLoading } = useVendorFlow()
  
  const [search, setSearch] = React.useState('')
  const [month, setMonth] = React.useState('All Months')
  const [year, setYear] = React.useState('2026')
  const [collaboratorType, setCollaboratorType] = React.useState('All Types')
  const [vendor, setVendor] = React.useState('All Vendors')
  const [representing, setRepresenting] = React.useState('All Representing')

  const vendorOptions = React.useMemo(() => {
    if (collaboratorType === 'All Types') return ['All Vendors']
    const type = collaboratorType.toLowerCase()
    const vendors = new Set<string>()
    data.forEach(t => {
      let v: string | undefined
      if (type === 'escrow') v = t.escrowCompany
      else if (type === 'title') v = t.titleCompany
      else if (type === 'lender') v = t.lender
      else if (type === 'tc') v = t.tcCompany
      else if (type === 'home warranty') v = t.homeWarranty
      if (v) vendors.add(v)
    })
    return ['All Vendors', ...Array.from(vendors).sort()]
  }, [collaboratorType, data])

  const filteredData = React.useMemo<VendorTransaction[]>(() => {
    return data.filter((t) => {
      const date = new Date(t.closingDate)
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ]
      const rowMonth = monthNames[date.getMonth()]
      const rowYear = String(date.getFullYear())

      if (month !== 'All Months' && rowMonth !== month) return false
      if (rowYear !== year) return false
      if (representing !== 'All Representing' && t.representing !== representing) return false

      if (collaboratorType !== 'All Types') {
        const type = collaboratorType.toLowerCase()
        let tValue: string | undefined
        if (type === 'escrow') tValue = t.escrowCompany
        else if (type === 'title') tValue = t.titleCompany
        else if (type === 'lender') tValue = t.lender
        else if (type === 'tc') tValue = t.tcCompany
        else if (type === 'home warranty') tValue = t.homeWarranty
        if (!tValue) return false
        if (vendor !== 'All Vendors' && tValue !== vendor) return false
      }
      return true
    })
  }, [data, month, year, collaboratorType, vendor, representing])

  return {
    isLoading,
    search,
    setSearch,
    month,
    setMonth,
    year,
    setYear,
    collaboratorType,
    setCollaboratorType,
    vendor,
    setVendor,
    representing,
    setRepresenting,
    vendorOptions,
    filteredData,
  }
}
