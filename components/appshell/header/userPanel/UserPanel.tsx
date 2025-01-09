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
    <div className={cx('flex', 'items-center', 'gap-4')}>
      <AccountManagementLink />
      <SignOutLink />
    </div>
  )
}
