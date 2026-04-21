import { useEffect, useState } from 'react'

export function useCountUp(target, duration = 1300) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const stepTime = Math.max(Math.floor(duration / target), 20)

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= target) {
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [target, duration])

  return count
}
