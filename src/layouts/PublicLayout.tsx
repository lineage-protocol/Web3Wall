import { Outlet } from 'react-router-dom'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto text-black bg-white">
      <Outlet />
    </div>
  )
}

export default PublicLayout
