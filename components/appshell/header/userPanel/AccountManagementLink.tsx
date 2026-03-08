import { auth } from '@/lib/auth'
import cx from 'classnames'

export default async function AccountManagementLink() {
  const session = await auth()
  const userName = session!.user!.name

  return (
    <span className={cx('flex', 'items-center', 'gap-2', 'text-sm', 'text-slate-600')}>
      <svg
        className={cx('shrink-0', 'w-4', 'h-4', 'text-slate-500')}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
      {userName}
    </span>
  )
}
