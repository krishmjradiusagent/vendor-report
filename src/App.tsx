import * as React from 'react'
import { cn } from '@/lib/utils'
import { VendorReportView } from './modules/VendorReport/VendorReportView'
import { StatsView } from './modules/Stats/StatsView'
import { motion, AnimatePresence } from 'framer-motion'
import { SidePanel } from './components/layout/SidePanel'
import { TopNav } from './components/layout/TopNav'

// Tabs matching screenshot: Stats | My Team (32) | Leaderboard | Monthly Awards | Vendor Report
const TABS = [
  { id: 'stats', label: 'Stats' },
  { id: 'my-team', label: 'My Team', count: 32 },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'monthly-awards', label: 'Monthly Awards' },
  { id: 'vendor-report', label: 'Vendor Report' },
]

export function App() {
  const [activeTab, setActiveTab] = React.useState('vendor-report')

  return (
    <div className="flex min-h-screen bg-white font-sans overflow-x-hidden">
      <SidePanel />
      
      <div className="flex-1 flex flex-col ml-[72px] h-screen overflow-hidden">
        <TopNav />
        
        {/* ── Main content area ── */}
        <main className="flex-1 flex flex-col bg-white mt-[70px] overflow-hidden">
          {/* Fixed Header Section (Greeting + Tabs) */}
          <div className="shrink-0 bg-white/80 backdrop-blur-sm z-30">
            <div className="px-8 pt-8 pb-4">
              <h1 className="text-[24px] font-bold text-[#111827] tracking-tight">
                Hello, MohammedTeamLead123 Sayyaf12!
              </h1>
            </div>

            <div className="px-8">
              <nav className="flex items-center border-b border-[#E5E7EB] gap-0">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-6 h-[48px] text-[13px] font-medium transition-all relative whitespace-nowrap',
                      activeTab === tab.id
                        ? 'text-indigo-600'
                        : 'text-[#6B7280] hover:text-[#374151]'
                    )}
                  >
                    {tab.label}
                    {tab.count != null && (
                      <span className={cn(
                        'text-[11px] font-semibold px-2 py-0.5 rounded-full',
                        activeTab === tab.id
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-[#F3F4F6] text-[#6B7280]'
                      )}>
                        {tab.count}
                      </span>
                    )}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-hidden px-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="h-full pt-4"
              >
                {activeTab === 'stats' && <StatsView />}
                {activeTab === 'my-team' && (
                  <div className="text-[13px] text-[#9CA3AF] text-center py-24 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    My Team — coming soon
                  </div>
                )}
                {activeTab === 'leaderboard' && (
                  <div className="text-[13px] text-[#9CA3AF] text-center py-24 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    Leaderboard — coming soon
                  </div>
                )}
                {activeTab === 'monthly-awards' && (
                  <div className="text-[13px] text-[#9CA3AF] text-center py-24 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    Monthly Awards — coming soon
                  </div>
                )}
                {activeTab === 'vendor-report' && <VendorReportView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

