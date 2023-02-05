import { useContext } from 'react'
import { AccessTokenContext } from './AccessTokenContext'

export const useAccessToken = () => {
  return useContext(AccessTokenContext)
}
