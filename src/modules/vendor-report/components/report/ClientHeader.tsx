import * as React from 'react'
import { motion } from 'framer-motion'
import { Plus, Download, Upload, Share2, Archive, Settings2, Users } from 'lucide-react'

export function ClientHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-[#1F2937] tracking-tight">Clients</h1>
          <div className="bg-[#ECFDF5] border border-[#10B981]/20 px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[12px] font-bold text-[#059669]">{count}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-full text-[12px] font-medium text-[#374151] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            <span>Archived</span>
            <Archive size={14} className="text-[#9CA3AF]" />
          </button>
          
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-full text-[12px] font-medium text-[#374151] hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            <Settings2 size={14} className="text-[#9CA3AF]" />
            <span>Integrations</span>
          </button>

          <div className="h-4 w-px bg-gray-200 mx-1" />

          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#5A5FF2] rounded-full text-[12px] font-medium text-[#5A5FF2] hover:bg-indigo-50 transition-all active:scale-95 shadow-sm">
            <Plus size={14} />
            <span>Client</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] border border-[#E0E7FF] rounded-full text-[12px] font-medium text-[#5A5FF2] hover:bg-indigo-100 transition-all active:scale-95 shadow-sm">
            <Upload size={14} />
            <span>Import</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] border border-[#E0E7FF] rounded-full text-[12px] font-medium text-[#5A5FF2] hover:bg-indigo-100 transition-all active:scale-95 shadow-sm">
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  )
}
