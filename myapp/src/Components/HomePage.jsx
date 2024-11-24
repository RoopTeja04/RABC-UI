import React from 'react'

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="homepage-wel">Welcome, <span className="hompage-user">Admin</span></h1>
      <span className="homepage-to">to</span>
      <div className='homepage-spans'>
        <span className='homepage-span-main'>RBAC</span>
        <span className='homepage-span-main-full'>Role Based Access Control</span>
      </div>
    </div>
  )
}

export default HomePage