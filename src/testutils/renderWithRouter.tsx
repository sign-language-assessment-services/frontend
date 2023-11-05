import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

export const renderWithRouter = (children: ReactNode, route = '/') =>
  render(
    <IntlProvider locale="de-DE" timeZone="UTC">
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </IntlProvider>,
  )
