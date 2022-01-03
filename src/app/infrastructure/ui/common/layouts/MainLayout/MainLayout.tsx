import React from 'react'
import { NavBar } from '../../components'

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default MainLayout
