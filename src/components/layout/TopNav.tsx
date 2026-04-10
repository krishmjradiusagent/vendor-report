import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export const TopNav = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] bg-white border-b border-[#EFEFEF] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.05)] flex items-center justify-between px-4 z-40">
      {/* Brand / Context */}
      <div className="flex items-center gap-6">
        {/* Unified Logo Area */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-5">
            <img 
              src="/src/assets/logo-topnav.png" 
              alt="Radius" 
              className="h-full object-contain"
            />
          </div>
        </div>
        
        <div className="h-8 w-px bg-[#F1F5F9] mx-2" />
        
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[13px] font-medium text-gray-400">Environment:</span>
          <span className="text-[13px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Production</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-10">
        <div className="h-[70px] w-px bg-[#EFEFEF]" />
        
        <motion.button 
          whileHover={{ backgroundColor: '#F9FAFB' }}
          className="flex items-center gap-4 pl-4 pr-2 py-2 rounded-lg transition-colors group"
        >
          <div className="size-12 rounded-full border border-[#EFEFEF] p-px overflow-hidden shadow-sm">
            <img 
              src="https://i.pravatar.cc/150?u=vanessa" 
              alt="Vanessa Brown" 
              className="size-full rounded-full object-cover"
            />
          </div>
          
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[16px] font-semibold text-[#303030] leading-none">
              Vanessa Brown
            </span>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-[#5A5FF2]" />
              <span className="text-[12px] font-regular text-[#303030]">
                Radius Agent
              </span>
            </div>
          </div>
          
          <ChevronDown className="size-4 text-gray-400 group-hover:text-gray-600 transition-colors ml-2" />
        </motion.button>
      </div>
    </header>
  )
}
