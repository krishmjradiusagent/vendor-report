import * as React from 'react'
import { useVendorReport } from './hooks/useVendorReport'
import { CommandBar } from './components/report/CommandBar'
import { VendorTable } from './components/report/VendorTable'
import { motion, AnimatePresence } from 'framer-motion'

export function VendorReportRoot() {
  const logic = useVendorReport()

  if (logic.isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-40">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
        <span className="mt-4 text-[13px] font-medium text-[#6B7280]">Initializing Vendor Flow...</span>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-hidden">
      <div className="shrink-0">
        <CommandBar
          search={logic.search}
          onSearchChange={logic.setSearch}
          month={logic.month}
          onMonthChange={logic.setMonth}
          year={logic.year}
          onYearChange={logic.setYear}
          collaboratorType={logic.collaboratorType}
          onCollaboratorTypeChange={logic.setCollaboratorType}
          vendor={logic.vendor}
          onVendorChange={logic.setVendor}
          vendorOptions={logic.vendorOptions}
          representing={logic.representing}
          onRepresentingChange={logic.setRepresenting}
          totalCount={logic.filteredData.length}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <VendorTable data={logic.filteredData} globalFilter={logic.search} />
      </div>
    </div>
  )
}
