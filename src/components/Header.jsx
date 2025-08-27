import React from 'react'

const Header = () => {
  return (
    <>
        <header className="flex items-center justify-between px-10 py-6 bg-blue-950 shadow-lg fixed w-full top-0 z-50">
        <h1 className="text-2xl font-bold">Effort Estimator</h1>
        <nav>
          <ul className="flex space-x-8 text-white text-lg font-medium">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">About</li>
            <li className="cursor-pointer hover:text-gray-300">Products</li>
            <li className="cursor-pointer hover:text-gray-300">Contact</li>
          </ul>
        </nav>
      </header>  
    </>
  )
}

export default Header