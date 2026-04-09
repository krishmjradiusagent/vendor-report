import * as React from 'react'
import { cn } from '@/lib/utils'
import { VendorReportView } from './modules/VendorReport/VendorReportView'
import { StatsView } from './modules/Stats/StatsView'
import { motion } from 'framer-motion'

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
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ── Main content area ── */}
      <main className="flex-1 bg-white min-h-screen">
        {/* Greeting bar — updated to white bg and black text per request */}
        <div className="bg-white px-8 pt-8 pb-4">
          <h1 className="text-[24px] font-bold text-[#111827]">
            Hello, MohammedTeamLead123 Sayyaf12!
          </h1>
        </div>

        {/* Tab bar + content */}
        <div className="px-8 pt-0">
          {/* Tab navigation */}
          <nav className="flex items-center border-b border-[#E5E7EB] gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-1.5 px-4 h-[44px] text-[13px] font-medium transition-all relative whitespace-nowrap',
                  activeTab === tab.id
                    ? 'text-indigo-600'
                    : 'text-[#6B7280] hover:text-[#374151]'
                )}
              >
                {tab.label}
                {tab.count != null && (
                  <span className={cn(
                    'text-[11px] font-semibold px-1.5 py-0.5 rounded-full',
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-[#F3F4F6] text-[#6B7280]'
                  )}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="py-5"
          >
            {activeTab === 'stats' && <StatsView />}
            {activeTab === 'my-team' && (
              <div className="text-[13px] text-[#9CA3AF] text-center py-16">My Team — coming soon</div>
            )}
            {activeTab === 'leaderboard' && (
              <div className="text-[13px] text-[#9CA3AF] text-center py-16">Leaderboard — coming soon</div>
            )}
            {activeTab === 'monthly-awards' && (
              <div className="text-[13px] text-[#9CA3AF] text-center py-16">Monthly Awards — coming soon</div>
            )}
            {activeTab === 'vendor-report' && <VendorReportView />}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
