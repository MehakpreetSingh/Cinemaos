/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect , useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline'

import logo from '../cinemaos.png'
import mlogo from '../mlogo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Movies', href: '/movie', current: false },
  { name: 'TvShows', href: '/tv', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const handleCLick = () => {
    var x = document.getElementById("nosearch") ;
    var y = document.getElementById("search") ;
    var z = document.getElementById("search-form"); 
    if(open) {
      y.classList.remove("hidden") ;
      x.classList.add("hidden") ; 
      z.classList.add("-translate-y-80");
      setOpen(!open) ;
    }else {
      y.classList.add("hidden") ;
      x.classList.remove("hidden") ; 
      z.classList.remove("-translate-y-80");
      setOpen(!open) ;
    }
  }
  const handleSearchClick = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
    handleCLick();
   
  }
  const handleClick = () => {
    localStorage.setItem("token" , "") ;
  }
  useEffect(() => {
  }, [])
  return (
    <>
      <Disclosure as="nav" className="fixed w-full z-[99999] bg-white border-b-2">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <Link to='/' className="flex-shrink-0 flex items-center">
                    <img
                      className="block scale-110 lg:hidden h-8 w-auto"
                      src={mlogo}
                      alt="Workflow"
                    />
                    <img
                      className="hidden ml-2 scale-150 lg:block h-8 w-auto"
                      src={logo}
                      alt="Workflow"
                    />
                  </Link>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href ? 'bg-gray-300 text-black' : 'text-gray-800 hover:bg-gray-300 hover:text-black',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}

                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    onClick={handleCLick}
                    className="bg-gray-200 p-1 rounded-full text-gray-800 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <SearchIcon id="search" className=" h-6 w-6" aria-hidden="true" />
                    <XIcon id='nosearch' className="hidden  h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="user">
                            <h1
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </h1>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="?"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/login" onClick={handleClick}>
                            <h1
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </h1>
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      location.pathname === item.href ? 'bg-gray-300 text-gray-800' : 'text-gray-800 hover:bg-gray-300 hover:text-gray-800',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <form onSubmit={handleSearchClick} id="search-form" className="flex absolute w-full place-content-center z-[9999] -translate-y-80 transition-all duration-5000 mt-[65px] bg-gray-400/70 items-center">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative bg-white px-3 rounded-sm py-1 mx-auto w-[100%] flex ">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input type="text" id="simple-search" onChange={(e)=> {setQuery(e.target.value)}} className="bg-gray-50 text-gray-900 text-base rounded-lg outline-none block w-full pl-10 p-2.5 " placeholder="Search" required />
          <Link to={`/search/${query}`}>
          <button disabled={query.length===0} onClick={handleSearchClick} type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:outline-none "><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
          </Link>
        </div>
      </form>
    </>
  )
}
