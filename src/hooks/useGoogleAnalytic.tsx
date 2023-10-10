import { useEffect } from 'react'
import ReactGA from 'react-ga4'

const useGoogleAnalytic = (location: any) => {
  useEffect(() => {
    const getTitle = (pathname: string) => {
      const segments = pathname.split('/')
      return `/${segments[1]}`
    }

    const pageTitle = getTitle(location.pathname as string)
    try {
      console.log(pageTitle)
      ReactGA.send({ hitType: 'pageview', page: location.pathname, title: pageTitle })
    } catch (error) {
      console.error('Error sending GA pageview:', error)
    }
  }, [location])
}

export default useGoogleAnalytic
