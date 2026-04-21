import { useEffect, useState } from 'react'

export function useTypewriter(text, speed = 70) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1))
      index += 1
      if (index >= text.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return displayed
}
