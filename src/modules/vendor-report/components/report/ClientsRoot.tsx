import * as React from 'react'
import { motion } from 'framer-motion'
import { useClientsReport } from '../../hooks/useClientsReport'
import { ClientHeader } from './ClientHeader'
import { ClientFilters } from './ClientFilters'
import { ClientTable } from './ClientTable'

export function ClientsRoot() {
  const { clients, setSearchQuery } = useClientsReport()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full p-6 pt-2"
    >
      <ClientHeader count={15000} />
      <ClientFilters onSearch={setSearchQuery} />
      <ClientTable data={clients} />
    </motion.div>
  )
}
