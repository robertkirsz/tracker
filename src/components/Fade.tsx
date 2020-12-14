import { useEffect, useState } from 'react'

export default function Fade({ show, children }: { show: boolean; children: React.ReactNode }) {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  return shouldRender ? (
    <div
      style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 250ms` }}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  ) : null
}
