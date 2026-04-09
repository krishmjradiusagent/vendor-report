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

  // Client-side filter by month/year/collaborator type
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

      if (collaboratorType !== 'All Types') {
        const type = collaboratorType.toLowerCase()
        if (type === 'escrow' && !t.escrowCompany) return false
        if (type === 'title' && !t.titleCompany) return false
        if (type === 'lender' && !t.lender) return false
        if (type === 'tc' && !t.tcCompany) return false
        if (type === 'home warranty' && !t.homeWarranty) return false
      }

      return true
    })
  }, [month, year, collaboratorType])

  return (
    <div className="w-full space-y-0">
      <CommandBar
        search={search}
        onSearchChange={setSearch}
        month={month}
        onMonthChange={setMonth}
        year={year}
        onYearChange={setYear}
        collaboratorType={collaboratorType}
        onCollaboratorTypeChange={setCollaboratorType}
        totalCount={filtered.length}
      />
      <div className="pt-4">
        <VendorTable data={filtered} globalFilter={search} />
      </div>
    </div>
  )
}
