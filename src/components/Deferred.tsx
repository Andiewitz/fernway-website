import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/*
  Holds children back until they are close to the viewport, so the code and
  markup for below-the-fold sections are not fetched or rendered on load.
  `minHeight` reserves room for the fallback to keep the scroll position
  stable while the section mounts.
*/
export function Deferred({ children, margin = '900px', minHeight = 480 }: { children: ReactNode; margin?: string; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    if (near) return
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setNear(true)
        io.disconnect()
      },
      { rootMargin: `${margin} 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near, margin])

  return (
    <div ref={ref} style={near ? undefined : { minHeight }}>
      {near ? children : null}
    </div>
  )
}
