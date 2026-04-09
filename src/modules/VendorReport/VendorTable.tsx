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
    header: 'Transaction Type',
    size: 150,
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
      const isBuyer = val === 'Buyer'
      const isBoth = val === 'Both'
      return (
        <span className={cn(
          'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight',
          isBuyer ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
          isBoth ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 
          'bg-rose-50 text-rose-700 border border-rose-100'
        )}>
          {val}
        </span>
      )
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
    size: 210,
    // Property address color updated to #5A5FF2
    cell: ({ getValue }) => (
      <span className="text-[12px] font-semibold text-[#5A5FF2] block truncate max-w-[200px] cursor-pointer hover:underline underline-offset-2 decoration-[#5A5FF2]/50 transition-colors">
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
    header: 'Lender',
    size: 160,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-[#374151] block truncate max-w-[150px]">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'escrowCompany',
    header: 'Escrow Company',
    size: 190,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-[#374151] block truncate max-w-[180px]">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'homeWarranty',
    header: 'Home Warranty',
    size: 150,
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
    header: 'Title Company',
    size: 160,
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
    <div className="flex flex-col gap-0">
      <div className="w-full overflow-x-auto rounded-[16px] border border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-[#F9FAFB]/90 backdrop-blur-md">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-[#E5E7EB]">
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  const isSelect = header.id === 'select'
                  // Determine alignment: typically right for numbers/dates, left for text
                  const isNumeric = false // Placeholder for future logic if numeric data is added
                  
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize(), minWidth: header.getSize() }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={cn(
                        'px-4 py-3 transition-colors',
                        isNumeric ? 'text-right' : 'text-left',
                        canSort && 'cursor-pointer select-none hover:bg-indigo-50/50'
                      )}
                    >
                      <div className={cn(
                        'flex items-center gap-1 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider',
                        isNumeric ? 'justify-end' : 'justify-start'
                      )}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && <SortIcon sorted={sorted} />}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-[#F3F4F6]">
            <AnimatePresence mode="popLayout">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-16 text-center text-[13px] text-[#9CA3AF]">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: i * 0.02, ease: BEZIER }}
                    className={cn(
                      'transition-colors h-[56px]',
                      i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFF]', // Colorful: Zebra stripes
                      row.getIsSelected() ? 'bg-indigo-50/60' : 'hover:bg-indigo-50/30'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isNumeric = false // Placeholder
                      return (
                        <td
                          key={cell.id}
                          className={cn('px-4 py-2', isNumeric ? 'text-right' : 'text-left')}
                          style={{ maxWidth: cell.column.getSize() }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>

          <tfoot>
            <tr className="bg-[#F9FAFB]/50 border-t border-[#E5E7EB]">
              <td colSpan={columns.length} className="px-5 py-3 text-[12px] font-semibold text-[#6B7280]">
                Overall total: <span className="text-indigo-600">{totalFiltered}</span> results identified
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination — Heritage styling */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between pt-5 px-1">
          <span className="text-[12px] font-medium text-[#6B7280]">
            Showing <span className="text-[#111827]">{pageIndex * PAGE_SIZE + 1}</span> to{' '}
            <span className="text-[#111827]">
              {Math.min((pageIndex + 1) * PAGE_SIZE, totalFiltered)}
            </span>{' '}
            of <span className="text-[#111827]">{totalFiltered}</span> results
          </span>
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-1.5 h-[34px] px-3 text-[12px] font-semibold text-[#374151] border border-[#E5E7EB] rounded-[10px] bg-white disabled:opacity-30 hover:bg-[#F9FAFB] transition-all shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </motion.button>
            <div className="flex items-center mx-1">
              {Array.from({ length: Math.min(pageCount, 5) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={cn(
                    'h-[34px] w-[34px] text-[12px] font-bold rounded-[10px] transition-all',
                    pageIndex === i
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-1.5 h-[34px] px-3 text-[12px] font-semibold text-[#374151] border border-[#E5E7EB] rounded-[10px] bg-white disabled:opacity-30 hover:bg-[#F9FAFB] transition-all shadow-sm"
            >
              Next <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}
