import cx from 'classnames'
import { PropsWithChildren } from 'react'
import NavBar from '@/components/appshell/header/NavBar'
import UserPanel from '@/components/appshell/header/userPanel/UserPanel'
import AssessmentFlowAwareNav from '@/components/appshell/AssessmentFlowAwareNav'

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className={cx('absolute', 'inset-0', 'flex', 'flex-col', 'w-full')}>
      <AssessmentFlowAwareNav>
        <NavBar />
        <UserPanel />
      </AssessmentFlowAwareNav>
      <main className={cx('flex', 'flex-col', 'flex-grow', 'text-2xl')}>{children}</main>
    </div>
  )
}
