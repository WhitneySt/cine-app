import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../NavigationBar/NavigationBar'

const Layout = () => {
  return (
      <div>
          <NavigationBar/>
          <Outlet/>
    </div>
  )
}

export default Layout