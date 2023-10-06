import { Outlet } from 'react-router-dom'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container md:max-w-md mx-auto text-black bg-gray-200">
      <Outlet />
    </div>
  )
}

export default PublicLayout
