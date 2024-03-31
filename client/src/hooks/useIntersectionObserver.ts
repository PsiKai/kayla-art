import { useEffect, useState } from "react"

export default function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit,
): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      options || {
        threshold: 0.2,
      },
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, isVisible, options])

  return isVisible
}
