import React from 'react'

const Content = ({ children }) => {
  return (
    <div className='min-h-[calc(100vh-61px)] max-h-[calc(100vh-61px)] overflow-y-auto '>
      {children}
    </div>
  )
}

export default Content
