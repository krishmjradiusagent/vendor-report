import * as React from 'react'
import { ChevronDown, Search, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CommandBarProps {
  search: string
  onSearchChange: (v: string) => void
  month: string
  onMonthChange: (v: string) => void
  year: string
  onYearChange: (v: string) => void
  collaboratorType: string
  onCollaboratorTypeChange: (v: string) => void
  vendor: string
  onVendorChange: (v: string) => void
  vendorOptions: string[]
  representing: string
  onRepresentingChange: (v: string) => void
  totalCount: number
}

const MONTHS = [
  'All Months', 'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
]

const YEARS = ['2026', '2025', '2024', '2023']

const COLLABORATOR_TYPES = [
  'All Types', 'Escrow', 'Title', 'Lender', 'TC', 'Home Warranty',
]

const REPRESENTING_TYPES = [
  'All Representing', 'Buyer', 'Seller', 'Tenant', 'Landlord', 'Referral',
]


function FilterSelect({
  value,
  onChange,
  options,
  className,
  disabled,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  className?: string
  disabled?: boolean
}) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={cn("w-auto min-w-[120px]", className)}>
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}


export function CommandBar({
  search,
  onSearchChange,
  month,
  onMonthChange,
  year,
  onYearChange,
  collaboratorType,
  onCollaboratorTypeChange,
  vendor,
  onVendorChange,
  vendorOptions,
  representing,
  onRepresentingChange,
  totalCount,
}: CommandBarProps) {
  return (
    // Figma: Filters layer — height auto, flex row, gap 16px, padding horizontal
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[#E5E7EB]">
      {/* Left: count + filter label + dropdowns */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Transaction count header — single line per request */}
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-bold text-indigo-600 leading-none">{totalCount}</span>
          <span className="text-[13px] font-semibold text-[#111827] whitespace-nowrap">Transactions Vendor Report</span>
        </div>

        <div className="w-px h-5 bg-[#E5E7EB]" />

        {/* Filter label — Figma: "filter by:" muted text */}
        <span className="text-[12px] font-medium text-[#9CA3AF]">filter by:</span>

        <FilterSelect value={month} onChange={onMonthChange} options={MONTHS} />
        <FilterSelect value={year} onChange={onYearChange} options={YEARS} />
        <FilterSelect value={representing} onChange={onRepresentingChange} options={REPRESENTING_TYPES} />
        <FilterSelect 
          value={collaboratorType} 
          onChange={(v) => {
            onCollaboratorTypeChange(v)
            onVendorChange('All Vendors')
          }} 
          options={COLLABORATOR_TYPES} 
        />
        <FilterSelect 
          value={vendor} 
          onChange={onVendorChange} 
          options={vendorOptions} 
          disabled={collaboratorType === 'All Types'}
          className="min-w-[140px]"
        />
      </div>

      {/* Right: search + export — Figma: search rounded pill, 36px height */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-3.5 w-3.5 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by address or vendor..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-[36px] w-[260px] pl-10 pr-4 text-[12px] font-medium border border-[#E5E7EB] rounded-full bg-white placeholder-[#9CA3AF] text-[#374151] focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-colors"
          />
        </div>
        {/* Export button — Figma: ghost button, border, 36px */}
        <motion.button
          whileHover={{ backgroundColor: '#F9FAFB', borderColor: '#D1D5DB' }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-1.5 h-[36px] px-5 text-[12px] font-medium text-[#374151] bg-white border border-[#E5E7EB] rounded-full transition-colors"
        >
          <Download className="h-3.5 w-3.5 text-[#6B7280]" />
          Export
        </motion.button>
      </div>
    </div>
  )
}
