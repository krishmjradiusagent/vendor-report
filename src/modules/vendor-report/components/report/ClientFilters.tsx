import * as React from 'react'
import { Search, ChevronDown, Columns, Filter as FilterIcon, Bookmark } from 'lucide-react'

export function ClientFilters({ onSearch }: { onSearch: (val: string) => void }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="relative flex-1 group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#5A5FF2] transition-colors" size={16} />
        <input
          type="text"
          placeholder="Search by client name or email address"
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-[#F3F4F6] border-none rounded-full py-2.5 pl-10 pr-4 text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#5A5FF2]/20 transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-2 bg-[#F3F4F6] rounded-full text-[13px] font-medium text-[#374151] hover:bg-gray-200 transition-colors">
          <span>View Clients For</span>
          <ChevronDown size={14} className="text-[#6B7280]" />
        </button>

        <button className="flex items-center gap-2 px-3 py-2 bg-[#F3F4F6] rounded-full text-[13px] font-medium text-[#374151] hover:bg-gray-200 transition-colors">
          <span>Type: All</span>
          <ChevronDown size={14} className="text-[#6B7280]" />
        </button>

        <button className="flex items-center gap-2 px-3 py-2 bg-[#F3F4F6] rounded-full text-[13px] font-medium text-[#374151] hover:bg-gray-200 transition-colors">
          <span>Status</span>
          <ChevronDown size={14} className="text-[#6B7280]" />
        </button>

        <button className="flex items-center gap-2 px-3 py-2 bg-[#F3F4F6] rounded-full text-[13px] font-medium text-[#374151] hover:bg-gray-200 transition-colors">
          <Columns size={14} className="text-[#6B7280]" />
          <span>Columns</span>
          <ChevronDown size={14} className="text-[#6B7280]" />
        </button>

        <button className="p-2.5 bg-[#F3F4F6] rounded-full text-[#374151] hover:bg-gray-200 transition-colors shadow-sm">
          <FilterIcon size={16} />
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#F3F4F6] rounded-full text-[13px] font-medium text-[#9CA3AF] hover:bg-gray-200 transition-colors border border-transparent">
          <Bookmark size={14} />
          <span>Save as Smart List</span>
        </button>
      </div>
    </div>
  )
}
