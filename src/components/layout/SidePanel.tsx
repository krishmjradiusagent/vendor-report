import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DashboardIcon,
  CampaignsIcon,
  ReportsIcon,
  DirectoryIcon,
  PortfolioIcon,
  BenefitsIcon,
  NewsfeedIcon,
  InventoryIcon,
  ContactsIcon,
  MarketingIcon,
  NotificationsIcon,
  SupportIcon,
  SettingsIcon
} from '@/assets/icons/sidebar';
import logoPng from '@/assets/logo-mark.png';

const menuItems = [
  { id: 'dashboard', icon: DashboardIcon, label: 'Dashboard', section: 'Home' },
  { id: 'campaigns', icon: CampaignsIcon, label: 'Campaigns', section: 'Home' },
  { id: 'reports', icon: ReportsIcon, label: 'Reports', section: 'Home' },
  
  { id: 'directory', icon: DirectoryIcon, label: 'Directory', section: 'Tools' },
  { id: 'portfolio', icon: PortfolioIcon, label: 'Portfolio', section: 'Tools' },
  { id: 'benefits', icon: BenefitsIcon, label: 'Benefits', section: 'Tools' },
  
  { id: 'newsfeed', icon: NewsfeedIcon, label: 'Newsfeed', section: 'Manage' },
  { id: 'inventory', icon: InventoryIcon, label: 'Inventory', section: 'Manage' },
  { id: 'contacts', icon: ContactsIcon, label: 'Contacts', section: 'Manage' },
  { id: 'marketing', icon: MarketingIcon, label: 'Marketing', section: 'Manage' },
  
  { id: 'notifications', icon: NotificationsIcon, label: 'Notifications', section: 'Support' },
  { id: 'support', icon: SupportIcon, label: 'Support', section: 'Support' },
  { id: 'settings', icon: SettingsIcon, label: 'Settings', section: 'Support' },
];

export const SidePanel: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('reports');

  return (
    <motion.aside
      initial={{ x: -72 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-[70px] z-40 h-[calc(100vh-70px)] w-[72px] flex flex-col items-center bg-white border-r border-[#EFEFEF] py-[20px] px-[8px]"
    >
      {/* Brand Header / Logo Block */}
      <div className="w-full flex flex-col items-center mb-[24px]">
        <div className="w-[56px] h-[56px] flex items-center justify-center rounded-[8px] bg-white border border-[#EFEFEF] transition-all pointer-events-auto cursor-pointer">
          <img 
            src={logoPng} 
            alt="Rise Group" 
            className="w-full h-full object-contain scale-125"
          />
        </div>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex flex-col items-center w-full gap-[32px] overflow-y-auto no-scrollbar pb-10">
        {/* Sections Mapping */}
        {['Home', 'Tools', 'Manage', 'Support'].map((section, idx) => (
          <div key={section} className="flex flex-col items-center w-full">
            <div className="flex flex-col gap-[8px]">
              {menuItems
                .filter((item) => item.section === section)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className={cn(
                        "relative group flex items-center justify-center w-[36px] h-[36px] rounded-[4px] transition-all duration-200",
                        isActive 
                          ? "bg-[#EFF6FF] text-[#2563EB]" 
                          : "bg-white text-[#374151] hover:bg-gray-50"
                      )}
                    >
                      <Icon 
                        className={cn(
                          "w-[20px] h-[20px]",
                          isActive ? "text-[#2563EB]" : "text-[#374151]"
                        )} 
                      />
                      
                      {/* Spring Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute inset-0 bg-[#EFF6FF] rounded-[4px] -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      {/* Tooltip Label */}
                      <div className="absolute left-[48px] px-2 py-1 bg-[#1F2937] text-white text-[11px] font-medium rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap blur-none transition-opacity duration-200 shadow-lg translate-x-1">
                        {item.label}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </motion.aside>
  );
};
