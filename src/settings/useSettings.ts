import { useContext } from 'react'
import { SettingsContext } from './SettingsContext'

export const useSettings = () => {
  return useContext(SettingsContext)
}
