// useInViewport.ts
import { useState, useEffect, useRef } from 'react'

const useInViewport = () => {
  const [inViewport, setInViewport] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    })

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  return [ref, inViewport]
}

export default useInViewport
