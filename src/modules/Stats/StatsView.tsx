import * as React from 'react'
import { Info } from 'lucide-react'

export function StatsView() {
  const statCards = [
    {
      label: 'TOTAL CLOSED DEALS',
      items: [
        { value: '0', label: 'Total Closed Deals' },
        { value: '0', label: 'Total Closed Buyer Deals' },
        { value: '0', label: 'Total Closed Seller Deals' },
        { value: '0', label: 'Total Closed Tenant Deals' },
        { value: '0', label: 'Total Closed Landlord Deals' },
        { value: '0', label: 'Total Closed Referral Deals' },
        { value: '0', label: 'Total In Contract Deals' },
        { value: '0', label: 'Active Listing' },
      ],
    },
    {
      label: 'TOTAL PRODUCTION',
      items: [
        { value: '$0', label: 'Total Production' },
        { value: '$0', label: 'Buyer Volume' },
        { value: '$0', label: 'Tenant Volume' },
        { value: '$0', label: 'Landlord Volume' },
        { value: '$0', label: 'Referral Volume' },
        { value: '$0', label: 'Seller Volume' },
        { value: '$0', label: 'In Contract Volume' },
        { value: '$0', label: 'Active Listing Volume' },
      ],
    },
  ]

  return (
    <div className="space-y-4 w-full">
      {statCards.map((card) => (
        <div key={card.label} className="bg-white border border-[#E5E7EB] rounded-[8px] p-4">
          <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">{card.label}</p>
          <div className="grid grid-cols-5 gap-4">
            {card.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <span className="text-[16px] font-semibold text-indigo-600">{item.value}</span>
                <span className="text-[11px] text-[#6B7280]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-4">
        <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">CLIENT SOURCE OVERVIEW</p>
        <div className="h-[160px] flex flex-col items-center justify-center gap-2 text-[#9CA3AF]">
          <Info className="h-7 w-7" />
          <span className="text-[13px]">No data to show.</span>
        </div>
      </div>
    </div>
  )
}
