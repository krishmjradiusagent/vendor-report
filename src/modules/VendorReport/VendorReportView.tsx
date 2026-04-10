import * as React from 'react'
import { MOCK_TRANSACTIONS } from './mockData'
import { CommandBar } from './CommandBar'
import { VendorTable } from './VendorTable'
import type { VendorTransaction } from './types'

export function VendorReportView() {
  const [search, setSearch] = React.useState('')
  const [month, setMonth] = React.useState('All Months')
  const [year, setYear] = React.useState('2026')
  const [collaboratorType, setCollaboratorType] = React.useState('All Types')
  const [vendor, setVendor] = React.useState('All Vendors')
  const [representing, setRepresenting] = React.useState('All Representing')

  // Dynamic vendor options based on selected type
  const vendorOptions = React.useMemo(() => {
    if (collaboratorType === 'All Types') return ['All Vendors']

    const type = collaboratorType.toLowerCase()
    const vendors = new Set<string>()
    MOCK_TRANSACTIONS.forEach(t => {
      let v: string | undefined
      if (type === 'escrow') v = t.escrowCompany
      else if (type === 'title') v = t.titleCompany
      else if (type === 'lender') v = t.lender
      else if (type === 'tc') v = t.tcCompany
      else if (type === 'home warranty') v = t.homeWarranty

      if (v) vendors.add(v)
    })
    return ['All Vendors', ...Array.from(vendors).sort()]
  }, [collaboratorType])

  // Client-side filter by month/year/collaborator type/vendor
  const filtered = React.useMemo<VendorTransaction[]>(() => {
    return MOCK_TRANSACTIONS.filter((t) => {
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
  }, [month, year, collaboratorType, vendor, representing])

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-hidden">
      <div className="shrink-0">
        <CommandBar
          search={search}
          onSearchChange={setSearch}
          month={month}
          onMonthChange={setMonth}
          year={year}
          onYearChange={setYear}
          collaboratorType={collaboratorType}
          onCollaboratorTypeChange={setCollaboratorType}
          vendor={vendor}
          onVendorChange={setVendor}
          vendorOptions={vendorOptions}
          representing={representing}
          onRepresentingChange={setRepresenting}
          totalCount={filtered.length}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <VendorTable data={filtered} globalFilter={search} />
      </div>
    </div>
  )
}
