import { Outlet } from 'react-router-dom'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto text-black bg-yellow-100 pb-[100px]">
      <Outlet />
    </div>
  )
}

export default PublicLayout
