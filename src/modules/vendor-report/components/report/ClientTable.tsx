import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import { Client } from '../../core/schema'
import { Eye, Heart, MoreHorizontal, Phone, Mail, MapPin } from 'lucide-react'
import { cn } from '../../core/utils'

const columnHelper = createColumnHelper<Client>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Client Name',
    cell: (info) => (
      <div className="flex items-center gap-3">
        {info.row.original.avatar ? (
          <img src={info.row.original.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
            {info.getValue().charAt(0)}
          </div>
        )}
        <span className="text-[13px] font-medium text-[#111827]">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email Address',
    cell: (info) => (
      <div className="flex items-center gap-2 text-[#6B7280]">
        <Mail size={14} />
        <span className="text-[13px]">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('phone', {
    header: 'Phone Number',
    cell: (info) => (
      <div className="flex items-center gap-2 text-[#00BFA5] whitespace-nowrap">
        <Phone size={14} />
        <span className="text-[13px] font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('address', {
    header: 'Address',
    cell: (info) => (
      <div className="max-w-[200px] truncate text-[13px] text-[#6B7280]">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('searchListing', {
    header: 'Search & Listing',
    cell: (info) => {
      const val = info.getValue()
      return (
        <div className="flex flex-col gap-1 min-w-[180px]">
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium w-fit",
            val.type === 'Listing' ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
          )}>
            <div className={cn("w-1.5 h-1.5 rounded-full", val.type === 'Listing' ? "bg-purple-500" : "bg-green-500")} />
            {val.type}: {val.title}
          </div>
          <span className="text-[11px] text-[#9CA3AF] opacity-80">+{val.count} others</span>
        </div>
      )
    },
  }),
  columnHelper.accessor('agent', {
    header: 'Agent',
    cell: (info) => (
      <div className="flex items-center gap-3 min-w-[180px]">
        <img src={info.getValue().avatar} className="w-7 h-7 rounded-full shadow-sm" alt="" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-[#111827]">{info.getValue().name}</span>
          <span className="text-[11px] text-[#6B7280] opacity-90">{info.getValue().email}</span>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('budget', {
    header: 'Budget',
    cell: (info) => <span className="text-[13px] text-[#111827]">{info.getValue()}</span>,
  }),
  columnHelper.accessor('purchasePrice', {
    header: 'Purchase Price',
    cell: (info) => (
      <span className="text-[13px] text-[#111827]">
        {info.getValue() ? `$${info.getValue()?.toLocaleString()}` : '-'}
      </span>
    ),
  }),
  columnHelper.accessor('listedPrice', {
    header: 'Listed Price',
    cell: (info) => (
      <span className="text-[13px] text-[#111827]">
        {info.getValue() ? `$${info.getValue()?.toLocaleString()}` : '-'}
      </span>
    ),
  }),
  columnHelper.accessor('rentalAmount', {
    header: 'Rental Amount',
    cell: (info) => <span className="text-[13px] text-[#111827]">{info.getValue() || '-'}</span>,
  }),
  columnHelper.accessor('propertiesViewed', {
    header: 'Properties Viewed',
    cell: (info) => (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100 w-fit">
        <Eye size={14} />
        <span className="text-[12px] font-bold">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor('propertiesShortlisted', {
    header: 'Properties Shortlisted',
    cell: (info) => (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-50 text-red-500 border border-red-100 w-fit">
        <Heart size={14} fill="currentColor" fillOpacity={0.2} />
        <span className="text-[12px] font-bold">{info.getValue()}</span>
      </div>
    ),
  }),
]

export function ClientTable({ data }: { data: Client[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex-1 overflow-auto custom-scrollbar bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
      <table className="w-full border-collapse min-w-[1600px]">
        <thead className="sticky top-0 z-20 bg-white">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b border-[#E5E7EB]">
              <th className="px-4 py-3 text-left bg-[#F9FAFB] w-10">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              </th>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-3 text-left text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider bg-[#F9FAFB] whitespace-nowrap">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              <th className="px-4 py-3 text-right bg-[#F9FAFB] w-10"></th>
            </tr>
          ))}
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {table.getRowModel().rows.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.32, 0.72, 0, 1] }}
                className="group border-b border-[#EFEFEF] hover:bg-indigo-50/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 align-middle whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
