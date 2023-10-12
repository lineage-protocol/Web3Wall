import { useEffect } from 'react'
import ReactGA from 'react-ga4'

const useGoogleAnalytic = (location: any) => {
  useEffect(() => {
    if (import.meta.env.VITE_MODE !== 'production') {
      return
    }

    const getTitle = (pathname: string) => {
      const segments = pathname.split('/')
      return `/${segments[1]}`
    }

    const pageTitle = getTitle(location.pathname as string)
    try {
      ReactGA.send({ hitType: 'pageview', page: location.pathname, title: pageTitle })
    } catch (error) {
      console.error('Error sending GA pageview:', error)
    }
  }, [location])
}

export default useGoogleAnalytic
