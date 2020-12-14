import { createPortal } from 'react-dom'

type Props = {
  className?: string
  onClose: Function
  children: React.ReactNode
}

export default function Modal({ className = '', onClose, ...props }: Props) {
  function handleBackgroundClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.target === event.currentTarget && onClose()
  }

  return createPortal(
    <div
      className={`
        flex
        justify-center
        items-center
        fixed
        top-0
        right-0
        bottom-0
        left-0
        p-4
        bg-black
        bg-opacity-50
        text-black
        overflow-hidden
      `}
      onClick={handleBackgroundClick}
    >
      <div
        className={`flex flex-col p-6 mx-auto bg-gray-100 rounded-xl shadow-md max-w-full max-h-full overflow-auto ${className}`}
        {...props}
      />
    </div>,
    document.getElementById('modal-root')!
  )
}
