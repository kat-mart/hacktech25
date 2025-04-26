
// import { Link } from 'react-router-dom';

// export default function Navbar(){
//     return(
//         <nav className='nav'>
//             <div className='site-title'>Food Security</div>
//             <ul>
//                 <li>
//                     <Link to='/map'>Food Map</Link>
//                 </li>
//             </ul>
//         </nav>
//     );
// }
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-green-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <a href="#" className="flex items-center py-5 px-2 text-white">
                <span className="font-bold text-xl">FoodBank Info</span>
              </a>
            </div>
            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-5 px-3 hover:text-green-200">Home</a>
              <a href="#" className="py-5 px-3 hover:text-green-200">About</a>
              <a href="#" className="py-5 px-3 hover:text-green-200">Find Food Banks</a>
              <a href="#" className="py-5 px-3 hover:text-green-200">Donate</a>
              <a href="#" className="py-5 px-3 hover:text-green-200">Volunteer</a>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-700">Home</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-700">About</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-700">Find Food Banks</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-700">Donate</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-700">Volunteer</a>
      </div>
    </nav>
  )
}
