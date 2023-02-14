import React from 'react'
import { ErrorModal } from '../components/ErrorModal'
import { useNavigate } from 'react-router'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <ErrorModal
      title="Seite nicht gefunden"
      message="Die von Ihnen angefragte Seite konnte nicht gefunden werden."
      closeLabel="Zur Startseite"
      onClose={() => navigate('/')}
    />
  )
}
