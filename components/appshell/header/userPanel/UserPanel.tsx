import SignOutLink from '@/components/appshell/header/userPanel/SignOutLink'
import AccountManagementLink from '@/components/appshell/header/userPanel/AccountManagementLink'
import { auth } from '@/lib/auth'
import cx from 'classnames'

export default async function UserPanel() {
  const session = await auth()
  if (!session?.user) {
    return <></>
  }
  return (
    <div className={cx('flex', 'items-center', 'h-full', 'gap-4', 'pl-4', 'border-l', 'border-slate-200')}>
      <AccountManagementLink />
      <SignOutLink />
    </div>
  )
}
