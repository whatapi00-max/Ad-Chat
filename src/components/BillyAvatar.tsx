import { Headset } from 'lucide-react'

interface BillyAvatarProps {
  size?: number
  className?: string
}

/** Customer Support avatar with a headset icon on a circular gradient. */
export function BillyAvatar({ size = 40, className = '' }: BillyAvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#075E54] text-white ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Customer Support avatar"
    >
      <Headset size={Math.round(size * 0.45)} aria-hidden="true" />
    </div>
  )
}
