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
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="px-8 pt-8 pb-4 flex items-center gap-4"
            >
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 shadow-[0_8px_16px_-4px_rgba(79,70,229,0.1)] flex items-center justify-center">
                <motion.span 
                  animate={{ rotate: [0, 14, -8, 14, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  className="text-2xl inline-block origin-bottom-right cursor-default"
                >
                  👋
                </motion.span>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-[26px] font-bold text-[#111827] tracking-tight leading-none">
                  Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-slow">MohammedTeamLead123 Sayyaf12!</span>
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-[13px] text-[#6B7280] font-medium">
                    Welcome back to your vendor reporting suite
                  </p>
                  <span className="w-1 h-1 rounded-full bg-[#E5E7EB]" />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                    Team Lead
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="px-8">
              <nav className="flex items-center border-b border-[#E5E7EB] gap-0">
                {TABS.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.96 }}
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
                  </motion.button>
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
                className="h-full pt-0"
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

