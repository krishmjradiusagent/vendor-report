import * as React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { VendorTransaction } from './types'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 25

// Heritage Bezier curve
const BEZIER = [0.32, 0.72, 0, 1] as const

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (sorted === 'asc') return <ArrowUp className="h-3.5 w-3.5 ml-1 text-indigo-600 animate-in fade-in slide-in-from-bottom-1 duration-300" />
  if (sorted === 'desc') return <ArrowDown className="h-3.5 w-3.5 ml-1 text-indigo-600 animate-in fade-in slide-in-from-top-1 duration-300" />
  return null // Per request: sort option in header on click make it up or down arrow.. no default icon
}

const columns: ColumnDef<VendorTransaction>[] = [
  {
    id: 'select',
    size: 44,
    header: () => (
      <input
        type="checkbox"
        className="h-3.5 w-3.5 rounded border-[#D1D5DB] accent-indigo-600 cursor-pointer"
        onChange={() => {}}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="h-3.5 w-3.5 rounded border-[#D1D5DB] accent-indigo-600 cursor-pointer transition-transform active:scale-90"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'transactionType',
    header: () => <span className="whitespace-nowrap">Transaction Type</span>,
    size: 180,
    cell: ({ getValue }) => {
      const val = getValue() as string
      // Colorful: Different color indicators for types
      const colorMap: Record<string, string> = {
        Purchase: 'bg-blue-500',
        Listing: 'bg-rose-500',
        Lease: 'bg-emerald-500',
        'Lease Listing': 'bg-indigo-500',
        Referral: 'bg-amber-500',
      }
      const color = colorMap[val] || 'bg-gray-400'
      return (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className={cn('w-1.5 h-1.5 rounded-full shrink-0 shadow-sm', color)} />
          <span className="text-[12px] font-medium text-[#111827]">{val}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'representing',
    header: 'Representing',
    size: 110,
    cell: ({ getValue }) => {
      const val = getValue() as string
      const styles: Record<string, string> = {
        Buyer: 'bg-[#EFF8FE] text-[#0C4A6E] border-[#EFF8FE]',
        Seller: 'bg-[#CCFBF1]/50 text-[#134E4A] border-teal-100/50',
        Tenant: 'bg-[#EDE9FE]/50 text-[#4C1D95] border-violet-100/50',
        Landlord: 'bg-[#D1FAE5]/50 text-[#365314] border-emerald-100/50',
        Referral: 'bg-[#FFE4E6] text-[#881337] border-[#FFE4E6]',
      }
      const style = styles[val] || 'bg-gray-50 text-gray-700 border-gray-100'
      return (
        <span className={cn(
          'text-[10px] font-semibold px-2 py-0.5 rounded-[13px] tracking-tight border capitalize',
          style
        )}>
          {val.toLowerCase() === 'landlords' ? 'Landlord' : val}
        </span>
      )
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
    size: 280,
    // Property address color updated to #5A5FF2
    cell: ({ getValue }) => (
      <span className="text-[12px] font-semibold text-[#5A5FF2] block cursor-pointer hover:underline underline-offset-2 decoration-[#5A5FF2]/50 transition-colors">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'owner',
    header: 'Owner / Agent',
    size: 180,
    cell: ({ row }) => {
      const name = row.original.owner
      const avatar = row.original.ownerAvatar
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()

      return (
        <div className="flex items-center gap-2.5">
          <div className="relative group/avatar">
            {avatar ? (
              <motion.img
                whileHover={{ scale: 1.15, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                src={avatar}
                alt={name}
                className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-gray-100 cursor-pointer"
              />
            ) : (
              <motion.div
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm ring-1 ring-gray-100 cursor-pointer"
              >
                {initials}
              </motion.div>
            )}
          </div>
          <span className="text-[12px] font-semibold text-[#374151] truncate max-w-[130px]">
            {name}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'lender',
    header: () => <span className="whitespace-nowrap">Lender</span>,
    size: 180,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-[#374151] block truncate max-w-[150px]">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'escrowCompany',
    header: () => <span className="whitespace-nowrap">Escrow Company</span>,
    size: 200,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-[#374151] block truncate max-w-[180px]">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'homeWarranty',
    header: () => <span className="whitespace-nowrap">Home Warranty</span>,
    size: 180,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-[#374151] block truncate max-w-[140px]">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'tcCompany',
    // TC & Co. in single line as requested
    header: () => <span className="whitespace-nowrap">TC & Co.</span>,
    size: 110,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-[#374151] whitespace-nowrap">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'titleCompany',
    header: () => <span className="whitespace-nowrap">Title Company</span>,
    size: 180,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-[#374151] block truncate max-w-[150px]">
        {getValue() as string}
      </span>
    ),
  },
]

interface VendorTableProps {
  data: VendorTransaction[]
  globalFilter: string
}

export function VendorTable({ data, globalFilter }: VendorTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: PAGE_SIZE } },
  })

  const { pageIndex } = table.getState().pagination
  const pageCount = table.getPageCount()
  const totalFiltered = table.getFilteredRowModel().rows.length

  return (
    <div className="flex flex-col gap-0 h-full overflow-hidden">
      <div className="w-full flex-1 overflow-auto rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] backdrop-blur-sm custom-scrollbar scroll-smooth">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-30 bg-[#F9FAFB] backdrop-blur-xl">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize(), minWidth: header.getSize() }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={cn(
                        'px-5 py-4 transition-all border-b border-[#E5E7EB] text-left align-middle',
                        canSort && 'cursor-pointer select-none hover:bg-indigo-50/40 group'
                      )}
                    >
                      <div className="flex items-center gap-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.1em] whitespace-nowrap">
                        <span className="group-hover:text-indigo-600 transition-colors">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {canSort && <SortIcon sorted={sorted} />}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody className="relative">
            <AnimatePresence mode="wait" initial={false}>
              {table.getRowModel().rows.length === 0 ? (
                <motion.tr
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={columns.length} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                        <ArrowUp className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-[13px] font-medium text-[#9CA3AF]">No transactions matched your filters.</p>
                    </div>
                  </td>
                </motion.tr>
              ) : (
                table.getRowModel().rows.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: Math.min(i * 0.01, 0.2), 
                      ease: BEZIER 
                    }}
                    className={cn(
                      'group transition-all duration-200 h-[64px] border-b border-[#F3F4F6] relative',
                      row.getIsSelected() ? 'bg-indigo-50/40' : 'bg-white hover:bg-[#FAFBFF]'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-5 py-3 align-middle"
                        style={{ maxWidth: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>

          <tfoot className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-xl border-t border-[#E5E7EB]">
            <tr>
              <td colSpan={columns.length} className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[13px] font-bold text-[#111827]">
                    {totalFiltered} <span className="text-[#9CA3AF] font-medium">Transactions identified in current view</span>
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination — Refined high-fidelity controls */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between py-6 px-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-semibold text-[#111827]">
              Page {pageIndex + 1} <span className="text-[#9CA3AF] font-medium text-[11px] ml-1">of {pageCount}</span>
            </span>
            <span className="text-[11px] font-medium text-[#9CA3AF]">
              Showing {pageIndex * PAGE_SIZE + 1}–{Math.min((pageIndex + 1) * PAGE_SIZE, totalFiltered)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center justify-center h-[38px] w-[38px] border border-[#E5E7EB] rounded-xl bg-white disabled:opacity-30 hover:bg-gray-50 transition-all shadow-sm group"
            >
              <ChevronLeft className="h-4 w-4 text-[#374151] group-hover:text-indigo-600" />
            </motion.button>
            
            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: Math.min(pageCount, 5) }).map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => table.setPageIndex(i)}
                  className={cn(
                    'h-[34px] min-w-[34px] px-2 text-[12px] font-bold rounded-lg transition-all',
                    pageIndex === i
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-4 ring-indigo-50'
                      : 'text-[#6B7280] hover:bg-indigo-50 hover:text-indigo-600'
                  )}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center justify-center h-[38px] w-[38px] border border-[#E5E7EB] rounded-xl bg-white disabled:opacity-30 hover:bg-gray-50 transition-all shadow-sm group"
            >
              <ChevronRight className="h-4 w-4 text-[#374151] group-hover:text-indigo-600" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}
