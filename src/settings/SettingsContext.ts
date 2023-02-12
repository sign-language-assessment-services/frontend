import { createContext } from 'react'
import { fallbackSettings, Settings } from './Settings'

export const SettingsContext = createContext<Settings>(fallbackSettings)
