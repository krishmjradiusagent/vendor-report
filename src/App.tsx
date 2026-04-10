import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  VendorFlowProvider, 
  VendorReportRoot, 
  FlowSidePanel, 
  FlowTopNav,
  ClientsRoot
} from './modules/vendor-report'

// Tabs for the specific Vendor Report implementation
const TABS = [
  { id: 'stats', label: 'Stats' },
  { id: 'my-team', label: 'My Team', count: 32 },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'monthly-awards', label: 'Monthly Awards' },
  { id: 'vendor-report', label: 'Vendor Report' },
]

export function App() {
  const [activeTab, setActiveTab] = React.useState('vendor-report')
  const [activeSideItem, setActiveSideItem] = React.useState('dashboard')

  return (
    <VendorFlowProvider source="mock">
      <div className="flex min-h-screen bg-white font-sans overflow-x-hidden">
        {/* Modular Side Panel - Extracted and Ready for Injection */}
        <FlowSidePanel 
          activeItem={activeSideItem} 
          onItemClick={setActiveSideItem} 
        />

        <div className="flex-1 flex flex-col ml-[72px] h-screen overflow-hidden">
          {/* Modular Top Nav - Decoupled with Slots */}
          <FlowTopNav />

          <main className="flex-1 flex flex-col bg-white mt-[70px] overflow-hidden">
            {activeSideItem !== 'dashboard' && (
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
                      className="text-2xl inline-block origin-bottom-right"
                    >
                      👋
                    </motion.span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[26px] font-bold text-[#111827] tracking-tight">
                      Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-slow">Sarah Jenkins!</span>
                    </h1>
                  </div>
                </motion.div>

                <div className="px-8">
                  <nav className="flex items-center border-b border-[#E5E7EB]">
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 h-[48px] text-[13px] font-medium relative transition-colors ${
                          activeTab === tab.id ? 'text-indigo-600' : 'text-[#6B7280] hover:text-[#374151]'
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600"
                          />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-hidden px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSideItem === 'dashboard' ? 'clients' : activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="h-full"
                >
                  {activeSideItem === 'dashboard' ? (
                    <ClientsRoot />
                  ) : activeTab === 'vendor-report' ? (
                    <VendorReportRoot />
                  ) : (
                    <div className="py-20 text-center text-[#9CA3AF] text-[13px]">
                      {activeTab} module is coming soon in the FLOW system.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </VendorFlowProvider>
  )
}
