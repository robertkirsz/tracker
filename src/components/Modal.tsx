import { createPortal } from 'react-dom'
import cn from 'classnames'

import Fade from 'components/Fade'

type Props = {
  show: boolean
  className?: string
  onClose: Function
  children: React.ReactNode
}

export default function Modal({ show, className = '', onClose, children, ...props }: Props) {
  function handleBackgroundClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.target === event.currentTarget && onClose()
  }

  return createPortal(
    <Fade show={show}>
      <div
        className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 p-4 bg-black bg-opacity-50 text-black overflow-hidden"
        onClick={handleBackgroundClick}
      >
        <div
          className={cn(
            'flex flex-col p-6 mx-auto bg-gray-100 rounded-xl shadow-md max-w-full max-h-full overflow-auto',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </Fade>,
    document.getElementById('modal-root')!
  )
}
