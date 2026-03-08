import cx from 'classnames'

type Props = {
  title: string
  message: string
  primaryLabel: string
  secondaryLabel: string
  onPrimary: () => void
  onSecondary: () => void
  secondaryDanger?: boolean
}

export function ConfirmModal({
  title,
  message,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  secondaryDanger = false,
}: Props) {
  return (
    <div
      className={cx('relative', 'z-10')}
      aria-labelledby="confirm-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cx('fixed', 'inset-0', 'bg-gray-500', 'bg-opacity-75', 'transition-opacity')}
        aria-hidden
      />
      <div className={cx('fixed', 'inset-0', 'z-10', 'overflow-y-auto')}>
        <div
          className={cx(
            'flex',
            'min-h-full',
            'items-end',
            'justify-center',
            'p-4',
            'text-center',
            'sm:items-center',
            'sm:p-0',
          )}
        >
          <div
            className={cx(
              'relative',
              'overflow-hidden',
              'rounded',
              'border',
              'border-slate-200',
              'bg-white',
              'text-left',
              'shadow-xl',
              'sm:my-8',
              'sm:w-full',
              'sm:max-w-lg',
            )}
          >
            <div className={cx('bg-white', 'px-4', 'pt-5', 'pb-4', 'sm:p-6', 'sm:pb-4')}>
              <div className={cx('sm:flex', 'sm:items-start')}>
                <div className={cx('mt-3', 'text-center', 'sm:mt-0', 'sm:text-left', 'w-full')}>
                  <h3
                    className={cx('text-lg', 'font-medium', 'leading-6', 'text-slate-900')}
                    id="confirm-modal-title"
                  >
                    {title}
                  </h3>
                  <div className={cx('mt-2')}>
                    <p className={cx('text-sm', 'text-slate-600')}>{message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={cx(
                'border-t',
                'border-slate-200',
                'bg-slate-50',
                'px-4',
                'py-3',
                'flex',
                'flex-col-reverse',
                'sm:flex-row',
                'sm:justify-end',
                'sm:gap-3',
                'sm:px-6',
              )}
            >
              <button
                type="button"
                onClick={onSecondary}
                className={cx(
                  'cursor-pointer',
                  'mt-3',
                  'sm:mt-0',
                  'inline-flex',
                  'w-full',
                  'justify-center',
                  'rounded',
                  'px-4',
                  'py-2',
                  'text-base',
                  'font-medium',
                  'sm:w-auto',
                  'sm:text-sm',
                  'border',
                  'shadow-sm',
                  'focus:outline-none',
                  'focus:ring-2',
                  'focus:ring-offset-2',
                  {
                    'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:ring-blue-900':
                      !secondaryDanger,
                    'border-red-800 bg-red-800 text-white hover:bg-red-900 focus:ring-red-800':
                      secondaryDanger,
                  },
                )}
              >
                {secondaryLabel}
              </button>
              <button
                type="button"
                onClick={onPrimary}
                className={cx(
                  'cursor-pointer',
                  'inline-flex',
                  'w-full',
                  'justify-center',
                  'rounded',
                  'border',
                  'border-transparent',
                  'bg-blue-500',
                  'ring-1',
                  'ring-blue-900',
                  'px-4',
                  'py-2',
                  'text-base',
                  'font-medium',
                  'text-white',
                  'shadow-sm',
                  'hover:bg-blue-700',
                  'sm:w-auto',
                  'sm:text-sm',
                  'focus:outline-none',
                  'focus:ring-2',
                  'focus:ring-blue-900',
                  'focus:ring-offset-2',
                )}
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
