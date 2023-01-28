import React from 'react'

interface Props {
  error: Error
}

export const ErrorMessage: React.FC<Props> = ({ error }) => (
  <>
    {error.name}: {error.message}
  </>
)
