import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Search, MoreVertical, Smartphone, Mail, Phone, MapPin, Calendar, Clock, Activity, MessageSquare, ChevronDown, User, Heart, Eye } from 'lucide-react'
import { Client } from '../../core/schema'
import { cn } from '../../core/utils'

interface ClientProfilePanelProps {
  client: Client | null
  onClose: () => void
}

export function ClientProfilePanel({ client, onClose }: ClientProfilePanelProps) {
  return (
    <AnimatePresence>
      {client && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-[919px] h-full bg-white shadow-2xl overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="relative">
                     {client.avatar ? (
                       <img src={client.avatar} className="w-16 h-16 rounded-full border-2 border-white ring-1 ring-[#E5E7EB] object-cover" alt="" />
                     ) : (
                       <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-white ring-1 ring-[#E5E7EB] flex items-center justify-center">
                         <span className="text-indigo-600 font-bold text-xl">{client.name.charAt(0)}</span>
                       </div>
                     )}
                     {client.isOnline && (
                       <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#16A34A] border-2 border-white rounded-full shadow-sm" />
                     )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-[#111827] tracking-tight">{client.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-[#EFF8FE] text-[#0C4A6E] text-xs font-medium">Buyer</span>
                      <span className="px-3 py-0.5 rounded-full bg-[#CCFBF1] text-[#134E4A] text-xs font-medium">Seller</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-[#5A5FF2] text-sm font-semibold tracking-wide hover:bg-indigo-50 rounded-lg transition-colors">
                    SEND APP INVITE
                    <ChevronDown size={16} />
                  </button>
                  <div className="flex items-center gap-2 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl shadow-sm">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#5A5FF2] border border-[#5A5FF2]/20 rounded-lg shadow-sm text-sm font-medium">
                      <MessageSquare size={16} />
                      Chat
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col gap-10">
              {/* Status Section */}
              <div className="flex items-center gap-8">
                 <div className="flex items-center justify-between w-[223px] px-4 py-2 bg-[#DCFCE7] border border-[#86EFAC] rounded-xl">
                    <span className="text-sm font-medium text-[#166534]">New Client</span>
                    <Plus size={16} className="text-[#166534]" />
                 </div>
                 <div className="flex items-center gap-3 px-4 py-2 bg-[#EFF6FF] border border-[#BEDBFF] rounded-xl w-[202px]">
                    <span className="text-sm font-medium text-[#1C398E]">Hot Leads Pod</span>
                    <button className="px-2 py-0.5 bg-[#155DFC] text-white text-[10px] font-bold rounded">Claim Lead</button>
                 </div>
                 <div className="flex items-center justify-between px-4 py-2 bg-[#F5F5F5] rounded-xl w-[223px]">
                    <div className="flex items-center gap-2">
                      <img src={client.agent.avatar} className="w-6 h-6 rounded-full" alt="" />
                      <span className="text-sm font-medium text-[#525252]">{client.agent.name}</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                 </div>
              </div>

              <div className="w-full h-px bg-[#E5E5E5]" />

              {/* Grid Stats */}
              <div className="grid grid-cols-4 gap-8">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-[#A3A3A3] font-medium uppercase tracking-wider">Email</span>
                  <span className="text-[14px] font-medium text-[#525252]">{client.email}</span>
                  <span className="text-xs text-[#A3A3A3]">+2 emails</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-[#A3A3A3] font-medium uppercase tracking-wider">Phone</span>
                  <span className="text-[14px] font-medium text-[#525252]">{client.phone}</span>
                  <span className="text-xs text-[#A3A3A3]">+1 phone</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-[#A3A3A3] font-medium uppercase tracking-wider">Added on</span>
                  <span className="text-[14px] font-medium text-[#525252]">{client.createdAt}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-[#A3A3A3] font-medium uppercase tracking-wider">Source</span>
                  <span className="text-[14px] font-medium text-[#525252]">Radius Marketplace</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[#A3A3A3] font-medium uppercase tracking-wider">Address</span>
                <span className="text-[14px] font-medium text-[#525252] leading-relaxed">{client.address}</span>
              </div>

              <div className="w-full h-px bg-[#E5E5E5]" />

              {/* List Sections */}
              <div className="flex flex-col gap-6">
                 <div className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold text-[#111827]">AI Prospecting</span>
                    <div className="w-10 h-6 bg-[#22C55E] rounded-full relative p-1 cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                 </div>
                 
                 <div className="w-full h-px bg-[#F3F4F6]" />

                 <div className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold text-[#111827]">Additional Details</span>
                    <ChevronDown size={18} className="text-gray-400" />
                 </div>

                 <div className="w-full h-px bg-[#F3F4F6]" />

                 <div className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold text-[#111827]">Tags</span>
                    <ChevronDown size={18} className="text-gray-400" />
                 </div>

                 <div className="w-full h-px bg-[#F3F4F6]" />

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-[#111827]">Family Members</span>
                      <div className="size-6 rounded-full border border-[#6366F1] flex items-center justify-center text-[#6366F1]">
                        <Plus size={12} />
                      </div>
                    </div>
                    <ChevronDown size={18} className="text-gray-400" />
                 </div>

                 <div className="w-full h-px bg-[#F3F4F6]" />

                 <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] font-semibold text-[#111827]">Buyer Representation</span>
                        <span className="px-2 py-0.5 bg-[#5A5FF2] text-white text-[10px] font-bold rounded-full">2</span>
                      </div>
                      <ChevronDown size={18} className="text-gray-400" />
                    </div>

                    <div className="p-4 bg-white border border-[#E7E7E9] rounded-xl flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                         MM
                       </div>
                       <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#27272A]">Monica Miller</span>
                            <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#374151] text-[10px] font-medium rounded-full">Spouse</span>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                              <Phone size={12} />
                              (555) 123-4567
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                              <Mail size={12} />
                              monica.miller@email.com
                            </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="w-full h-px bg-[#F3F4F6]" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
