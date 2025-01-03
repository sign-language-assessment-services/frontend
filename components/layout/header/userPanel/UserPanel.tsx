import SignOutLink from '@/components/layout/header/userPanel/SignOutLink'
import UserProfileLink from '@/components/layout/header/userPanel/UserProfileLink'
import { getSession } from '@/lib/auth'

export default async function UserPanel() {
  const session = await getSession()
  if (!session?.user) {
    return <></>
  }
  return (
    <div className="flex items-center gap-4">
      <UserProfileLink />
      <SignOutLink />
    </div>
  )
}
