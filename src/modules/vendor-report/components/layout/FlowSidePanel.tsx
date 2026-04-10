import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../core/utils';
import * as Icons from '../../assets/icons';
import logoPng from '../../assets/logo-mark.png';

interface SidePanelProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
  /** Slot for host application to inject custom branding */
  brandingSlot?: React.ReactNode;
  /** Slot for host application to inject extra footer actions */
  footerSlot?: React.ReactNode;
  items?: { id: string; icon: keyof typeof Icons; label: string; section: string }[];
}

const defaultItems = [
  { id: 'dashboard', icon: 'DashboardIcon' as const, label: 'Clients', section: 'Home' },
  { id: 'campaigns', icon: 'CampaignsIcon' as const, label: 'Campaigns', section: 'Home' },
  { id: 'reports', icon: 'ReportsIcon' as const, label: 'Reports', section: 'Home' },
  { id: 'directory', icon: 'DirectoryIcon' as const, label: 'Directory', section: 'Tools' },
  { id: 'portfolio', icon: 'PortfolioIcon' as const, label: 'Portfolio', section: 'Tools' },
  { id: 'benefits', icon: 'BenefitsIcon' as const, label: 'Benefits', section: 'Tools' },
  { id: 'newsfeed', icon: 'NewsfeedIcon' as const, label: 'Newsfeed', section: 'Manage' },
  { id: 'inventory', icon: 'InventoryIcon' as const, label: 'Inventory', section: 'Manage' },
  { id: 'contacts', icon: 'ContactsIcon' as const, label: 'Contacts', section: 'Manage' },
  { id: 'marketing', icon: 'MarketingIcon' as const, label: 'Marketing', section: 'Manage' },
  { id: 'notifications', icon: 'NotificationsIcon' as const, label: 'Notifications', section: 'Support' },
  { id: 'support', icon: 'SupportIcon' as const, label: 'Support', section: 'Support' },
  { id: 'settings', icon: 'SettingsIcon' as const, label: 'Settings', section: 'Support' },
];

export const FlowSidePanel: React.FC<SidePanelProps> = ({ 
  activeItem = 'reports', 
  onItemClick,
  brandingSlot,
  footerSlot,
  items = defaultItems
}) => {
  return (
    <motion.aside
      initial={{ x: -72 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-[70px] z-40 h-[calc(100vh-70px)] w-[72px] flex flex-col items-center bg-white border-r border-[#EFEFEF] py-[20px] px-[8px]"
    >
      <div className="w-full flex flex-col items-center mb-[24px]">
        {brandingSlot || (
          <div className="w-[56px] h-[56px] flex items-center justify-center rounded-[8px] bg-white border border-[#EFEFEF] transition-all cursor-pointer">
            <img src={logoPng} alt="Logo" className="w-full h-full object-contain scale-125" />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center w-full gap-[32px] overflow-y-auto no-scrollbar pb-10">
        {['Home', 'Tools', 'Manage', 'Support'].map((section) => (
          <div key={section} className="flex flex-col items-center w-full">
            <div className="flex flex-col gap-[8px]">
              {items
                .filter((item) => item.section === section)
                .map((item) => {
                  const Icon = Icons[item.icon as keyof typeof Icons];
                  const isActive = activeItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onItemClick?.(item.id)}
                      className={cn(
                        "relative group flex items-center justify-center w-[36px] h-[36px] rounded-[4px] transition-all duration-200",
                        isActive ? "bg-[#EFF6FF] text-[#2563EB]" : "bg-white text-[#374151] hover:bg-gray-50"
                      )}
                    >
                      {Icon && <Icon className="w-[20px] h-[20px]" />}
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute inset-0 bg-[#EFF6FF] rounded-[4px] -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className="absolute left-[48px] px-2 py-1 bg-[#1F2937] text-white text-[11px] font-medium rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-lg translate-x-1">
                        {item.label}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      {footerSlot}
    </motion.aside>
  );
};
