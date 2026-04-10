import * as React from 'react'
import { Search, Download } from 'lucide-react'
import { cn } from '../../core/utils'
import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

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
const COLLABORATOR_TYPES = ['All Types', 'Escrow', 'Title', 'Lender', 'TC', 'Home Warranty']
const REPRESENTING_TYPES = ['All Representing', 'Buyer', 'Seller', 'Tenant', 'Landlord', 'Referral']

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
      <SelectTrigger className={cn(
        "h-[36px] w-auto min-w-[120px] text-[12px] font-medium border-[#E5E7EB] bg-white transition-all hover:border-indigo-200 hover:bg-indigo-50/30",
        className
      )}>
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent className="bg-white/95 backdrop-blur-xl border-[#E5E7EB] shadow-2xl">
        {options.map((o) => (
          <SelectItem key={o} value={o} className="text-[12px] focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer">
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
    <div className="flex items-center justify-between gap-4 py-3 bg-white border-b border-[#E5E7EB]">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center min-w-[32px] h-[32px] bg-indigo-50 rounded-lg">
            <span className="text-[18px] font-bold text-indigo-600 leading-none">{totalCount}</span>
          </div>
          <span className="text-[14px] font-bold text-[#111827] tracking-tight whitespace-nowrap">
            Transactions Vendor Report
          </span>
        </div>

        <div className="w-px h-6 bg-[#E5E7EB] mx-1" />
        <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">filter by:</span>

        <div className="flex items-center gap-2">
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
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            id="vendor-search"
            name="search"
            placeholder="Search by address or vendor..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-[36px] w-[280px] pl-10 pr-4 text-[12px] font-medium border border-[#E5E7EB] rounded-full bg-white transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 placeholder-[#9CA3AF] text-[#374151]"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#4F46E5', color: '#FFFFFF' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex items-center gap-2 h-[36px] px-6 text-[12px] font-semibold text-[#374151] bg-white border border-[#E5E7EB] rounded-full shadow-sm hover:border-indigo-600 transition-colors"
        >
          <Download className="h-4 w-4" />
          Export
        </motion.button>
      </div>
    </div>
  )
}
