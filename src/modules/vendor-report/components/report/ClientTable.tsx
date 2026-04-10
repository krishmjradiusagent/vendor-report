import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Heart, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MapPin, 
  List, 
  ChevronDown,
  Calendar,
  MessageSquare,
  Activity,
  History,
  Clock,
  User,
  Search,
  ArrowUpDown
} from 'lucide-react'
import { cn } from '../../core/utils'
import { Client } from '../../core/schema'

const columnHelper = createColumnHelper<Client>()

const HeaderCell = ({ label, icon: Icon }: { label: string, icon?: any }) => (
  <div className="flex items-center gap-2 group cursor-pointer group">
    {Icon && <Icon size={14} className="text-[#A1A1AA] group-hover:text-[#5A5FF2] transition-colors" />}
    <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider whitespace-nowrap">{label}</span>
    <ArrowUpDown size={10} className="text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
)

const ScoreCircle = ({ score }: { score: number }) => {
  const getColors = (s: number) => {
    if (s >= 90) return "border-[#10B981] text-[#10B981]"
    if (s >= 75) return "border-[#5A5FF2] text-[#5A5FF2]"
    if (s >= 50) return "border-[#F59E0B] text-[#F59E0B]"
    return "border-[#EF4444] text-[#EF4444]"
  }
  return (
    <div className={cn(
      "size-8 rounded-full border-2 flex items-center justify-center font-bold text-xs bg-white shadow-sm",
      getColors(score)
    )}>
      {score}
    </div>
  )
}

const TypeBadge = ({ type }: { type: string }) => {
  const styles: Record<string, string> = {
    'Luxury': 'bg-[#FDF4FF] text-[#D946EF] border-[#F5D0FE]',
    'Investor': 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]',
    'First-time Buyer': 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
    'Commercial': 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    'Tenant': 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
  }
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
      styles[type] || 'bg-gray-100 text-gray-600 border-gray-200'
    )}>
      {type}
    </span>
  )
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Active': 'text-[#16A34A] font-bold',
    'Pending': 'text-[#D97706] font-bold',
    'Closed': 'text-[#525252] font-bold px-2 py-0.5 bg-[#F5F5F5] rounded',
    'Paused': 'text-[#DC2626] font-bold',
  }
  return <span className={cn("text-[11px] uppercase tracking-wide", styles[status])}>{status}</span>
}

const SearchListingCell = ({ val }: { val: { type: string, title: string, count: number } }) => {
  if (!val) return null
  return (
    <div className="flex flex-col gap-0.5 min-w-[200px]">
      <div className="flex items-center gap-1">
        <div className={cn("size-2 rounded-full", val.type === 'Listing' ? 'bg-[#D946EF]' : 'bg-[#16A34A]')} />
        <span className="text-[12px] font-semibold text-[#1F2937] truncate max-w-[150px]">{val.title}</span>
      </div>
      <div className="flex items-center gap-1.5 pl-3">
        <span className="text-[10px] font-medium text-[#9CA3AF]">{val.type}</span>
        <div className="size-1 rounded-full bg-[#E5E7EB]" />
        <span className="text-[10px] font-medium text-[#5A5FF2]">+{val.count} others</span>
      </div>
    </div>
  )
}

const columns = [
  columnHelper.accessor('name', {
    header: () => <HeaderCell label="Client Name" icon={User} />,
    cell: (info) => (
      <div className="flex items-center gap-3 min-w-[180px]">
        <div className="relative shrink-0">
          <img src={info.row.original.avatar} className="size-8 rounded-full border border-[#EEEEEE]" alt="" />
          {info.row.original.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-[#16A34A] border-2 border-white rounded-full" />
          )}
        </div>
        <div className="flex flex-col gap-0">
           <span className="text-[12px] font-bold text-[#1F2937]">{info.getValue()}</span>
           <span className="text-[10px] text-[#71717A] tracking-tighter">{info.row.original.phone}</span>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('tags', {
    header: () => <HeaderCell label="Tags" icon={List} />,
    cell: (info) => (
      <div className="flex flex-wrap gap-1 max-w-[240px]">
        {info.getValue().slice(0, 2).map((tag, i) => (
          <span key={i} className="px-2 py-0.5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] text-[10px] font-medium rounded-md whitespace-nowrap">
            {tag}
          </span>
        ))}
        {info.getValue().length > 2 && (
          <span className="px-1.5 py-0.5 text-[#5A5FF2] text-[10px] font-bold">
            +{info.getValue().length - 2} more
          </span>
        )}
      </div>
    ),
  }),
  columnHelper.accessor('score', {
    header: () => <HeaderCell label="Score" />,
    cell: (info) => <ScoreCircle score={info.getValue()} />,
  }),
  columnHelper.accessor('createdAt', {
    header: () => <HeaderCell label="Created" icon={Calendar} />,
    cell: (info) => <span className="text-[12px] font-medium text-[#525252]">{info.getValue()}</span>,
  }),
  columnHelper.accessor('updatedAt', {
    header: () => <HeaderCell label="Updated" icon={History} />,
    cell: (info) => <span className="text-[12px] font-medium text-[#525252]">{info.getValue()}</span>,
  }),
  columnHelper.accessor('type', {
    header: () => <HeaderCell label="Type" />,
    cell: (info) => <TypeBadge type={info.getValue()} />,
  }),
  columnHelper.accessor('status', {
    header: () => <HeaderCell label="Status" />,
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor('lastVisit', {
    header: () => <HeaderCell label="Last Visit" icon={Eye} />,
    cell: (info) => <span className="text-[12px] font-semibold text-[#1F2937]">{info.getValue()}</span>,
  }),
  columnHelper.accessor('lastActivity', {
    header: () => <HeaderCell label="Last Activity" icon={Activity} />,
    cell: (info) => <span className="text-[12px] font-semibold text-[#1F2937]">{info.getValue()}</span>,
  }),
  columnHelper.accessor('lastCommunication', {
    header: () => <HeaderCell label="Last Comm." icon={MessageSquare} />,
    cell: (info) => (
      <div className="flex items-center gap-2">
         {info.getValue() === 'Email' ? <Mail size={14} className="text-[#5A5FF2]" /> : <Phone size={14} className="text-[#10B981]" />}
         <span className="text-[12px] font-medium text-[#525252]">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('lastText', { header: () => <HeaderCell label="Last Text" />, cell: (info) => <span className="text-[11px] text-[#71717A] italic">{info.getValue()}</span> }),
  columnHelper.accessor('email', { header: () => <HeaderCell label="Email Address" icon={Mail} />, cell: (info) => <span className="text-[11px] text-[#5A5FF2] underline">{info.getValue()}</span> }),
  columnHelper.accessor('phone', { header: () => <HeaderCell label="Phone Number" icon={Phone} />, cell: (info) => <span className="text-[11px] text-[#10B981]">{info.getValue()}</span> }),
  columnHelper.accessor('address', { header: () => <HeaderCell label="Address" icon={MapPin} />, cell: (info) => <span className="text-[11px] text-[#71717A] truncate max-w-[150px]">{info.getValue()}</span> }),
  columnHelper.accessor('searchListing', {
    header: () => <HeaderCell label="Search & Listing" icon={Search} />,
    cell: (info) => <SearchListingCell val={info.getValue()} />,
  }),
  columnHelper.accessor('agent', {
    header: () => <HeaderCell label="Agent" />,
    cell: (info) => (
      <div className="flex items-center gap-2 min-w-[160px]">
        <img src={info.getValue().avatar} className="size-6 rounded-full" alt="" />
        <span className="text-[12px] font-bold text-[#1F2937]">{info.getValue().name}</span>
        <ChevronDown size={12} className="text-[#A1A1AA]" />
      </div>
    ),
  }),
  columnHelper.accessor('budget', { header: () => <HeaderCell label="Budget" />, cell: (info) => <span className="text-[12px] font-bold text-[#1F2937]">{info.getValue()}</span> }),
  columnHelper.accessor('purchasePrice', { header: () => <HeaderCell label="Purchase Price" />, cell: (info) => <span className="text-[12px] font-bold text-[#1F2937]">{info.getValue()}</span> }),
  columnHelper.accessor('listedPrice', { header: () => <HeaderCell label="Listed Price" />, cell: (info) => <span className="text-[12px] font-bold text-[#1F2937]">{info.getValue()}</span> }),
  columnHelper.accessor('rentalAmount', { header: () => <HeaderCell label="Rental Amount" />, cell: (info) => <span className="text-[12px] font-bold text-[#1F2937]">{info.getValue() || '-'}</span> }),
  columnHelper.accessor('propertiesViewed', { header: () => <HeaderCell label="Prop. Viewed" />, cell: (info) => <span className="text-[12px] font-bold text-[#F59E0B] bg-[#FFFBEB] px-2 py-0.5 rounded">{info.getValue()}</span> }),
  columnHelper.accessor('propertiesShortlisted', { header: () => <HeaderCell label="Prop. Shortlisted" />, cell: (info) => <span className="text-[12px] font-bold text-[#E11D48] bg-[#FFF1F2] px-2 py-0.5 rounded">{info.getValue()}</span> }),
]

export function ClientTable({ data, onRowClick }: { data: Client[], onRowClick?: (c: Client) => void }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex-1 overflow-auto custom-scrollbar bg-white rounded-xl border border-[#E5E7EB] shadow-[0px_4px_12px_rgba(0,0,0,0.03)] h-full">
      <div className="min-w-fit">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-[#F9FAFB] shadow-sm font-['Inter',sans-serif]">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
                <th className="px-4 py-3 text-left w-[52px] border-r border-[#EEEEEE]">
                   <div className="size-[20px] flex items-center justify-center">
                    <input type="checkbox" className="w-[15px] h-[15px] rounded-[4px] border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]" />
                   </div>
                </th>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-[16px] py-[10px] text-left border-r border-[#EEEEEE]">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  onClick={() => onRowClick?.(row.original)}
                  className="group border-b border-[#E5E7EB] hover:bg-[#F8FAFF] transition-colors h-[52px] cursor-pointer"
                >
                  <td className="px-4 py-2 border-r border-[#EEEEEE]" onClick={(e) => e.stopPropagation()}>
                    <div className="size-[20px] flex items-center justify-center">
                      <input type="checkbox" className="w-[15px] h-[15px] rounded-[4px] border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]" />
                    </div>
                  </td>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-[16px] py-[4px] align-middle whitespace-nowrap border-r border-[#EEEEEE] group-hover:border-[#DBEAFE]/50 transition-colors">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
