# 🏛️ Vendor Report module (FLOW Framework)

This module is a **"Plug-and-Play"** high-fidelity dashboard system built using the **FLOW** (Flexible, Layered, Object-oriented, Web-standard) architecture. It is designed to be extracted and injected into any React project with zero configuration friction.

## 🛠️ Developer "Plug-out" Guide

To integrate this module into a host application, follow these steps:

### 1. External Dependencies
Ensure the following packages are installed in the host project:
```bash
npm install framer-motion lucide-react @tanstack/react-table clsx tailwind-merge
```

### 2. Style Integration
Copy the `src/modules/vendor-report/core/tailwind.preset.js` tokens or add them to your `tailwind.config.js` to ensure visual parity:
```js
// tailwind.config.js
module.exports = {
  presets: [require('./src/modules/vendor-report/core/tailwind.preset.js')],
  // ... rest of config
}
```

### 3. Implementation
Wrap your view in the `VendorFlowProvider` and drop the `VendorReportRoot` composition wherever needed.

```tsx
import { VendorFlowProvider, VendorReportRoot } from './modules/vendor-report'

export default function App() {
  return (
    /* source="mock" for demo/off-site mode | source="api" for live production */
    <VendorFlowProvider source="mock">
      <div className="p-8 h-screen">
        <VendorReportRoot />
      </div>
    </VendorFlowProvider>
  )
}
```

## 🏗️ Architecture Layers

- **Logic Layer (`/hooks/useVendorReport`)**: Pure JS/TS logic. No UI dependencies. Handles filtering, searching, and data normalization.
- **UI Layer (`/components/report`)**: Stateless, "Skin-only" components. They receive props and render the "Airbnb-standard" interface.
- **Socket Layer (`/context/VendorFlowProvider`)**: Manages global configuration, theme tokens, and data-toggling (Mock vs API).
- **Composition Layer (`VendorReportRoot.tsx`)**: The glue that connects the Logic and UI layers into a ready-to-use organism.

## 🎨 Slot Architecture
The `FlowSidePanel` and `FlowTopNav` support **React Slots**. You can inject custom branding or user-profile menus from the host application seamlessly:

```tsx
<FlowTopNav 
  logoSlot={<MyCustomLogo />} 
  userSlot={<HostUserProfile />} 
/>
```

---
**Maintained by the Antigravity Heritage System**
"Composition over Inheritance. Accessibility by Birth. Meaningful Motion."
