import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between px-10 py-6 bg-blue-950 shadow-lg fixed w-full top-0 z-50 text-white">
        <h1 className="text-2xl font-bold">Effort Estimator</h1>
        <nav>
          <ul className="flex space-x-8 text-white text-lg font-medium">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-gray-300">FAQ</Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-gray-300">Pricing</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>  
    </>
  )
}

export default Header