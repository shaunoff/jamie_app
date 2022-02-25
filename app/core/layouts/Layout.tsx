import { Head, BlitzLayout, Image, useRouter, useMutation } from "blitz"
import logo from "public/logo.jpeg"
import { Toaster } from "react-hot-toast"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  LocationMarkerIcon,
  CogIcon,
  XIcon,
  ClipboardListIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "../hooks/useCurrentUser"
import Button from "../components/Button"

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Completed Audits", href: "/audits", icon: CogIcon },
  { name: "Create Audit", href: "/audits/new", icon: ClipboardListIcon },
  { name: "Locations", href: "/locations", icon: LocationMarkerIcon },
  { name: "Admin", href: "/admin", icon: CogIcon },
  { name: "Users", href: "/users", icon: UserGroupIcon },
  // { name: "Team", href: "#", icon: UsersIcon, current: false },
  // { name: "Projects", href: "#", icon: FolderIcon, current: false },
  // { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "#", icon: InboxIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const [logoutMutation] = useMutation(logout)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  console.log(router.pathname, navigation)
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <div className="w-1/2">
                      <Image src={logo} alt="logo" />
                    </div>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => {
                      console.log(item.href === router.pathname)
                      const anchorClass =
                        item.href == router.pathname
                          ? "bg-blue-300 text-gray-700 group flex items-center px-2 py-2 text-base font-bold rounded-md"
                          : "text-gray-600 hover:bg-blue-100 hover:text-gray-700 group flex items-center px-2 py-2 text-base font-bold rounded-md"
                      const iconClass =
                        item.href == router.pathname
                          ? "text-gray-700 mr-3 flex-shrink-0 h-6 w-6"
                          : "text-blue-400 group-hover:text-blue-500 mr-3 flex-shrink-0 h-6 w-6"
                      return (
                        <a key={item.name} href={item.href} className={anchorClass}>
                          <item.icon className={iconClass} aria-hidden="true" />
                          {item.name}
                        </a>
                      )
                    })}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <Button
                    onClick={async () => {
                      await logoutMutation()
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-4overflow-y-auto">
              <div className="flex justify-center flex-shrink-0 px-12 w-full">
                <Image src={logo} alt="logo" className="justify-center" />
              </div>
              <nav className="mt-2 flex-1 px-2 bg-white space-y-1">
                {navigation.map((item) => {
                  console.log(item.href === router.pathname)
                  const anchorClass =
                    item.href == router.pathname
                      ? "bg-blue-500 text-blue-100 group flex items-center px-2 py-2 text-base font-bold rounded-md"
                      : "text-gray-600 hover:bg-blue-100 hover:text-gray-700 group flex items-center px-2 py-2 text-base font-bold rounded-md"
                  const iconClass =
                    item.href == router.pathname
                      ? "text-blue-100 mr-3 flex-shrink-0 h-6 w-6"
                      : "text-blue-400 group-hover:text-blue-500 mr-3 flex-shrink-0 h-6 w-6"
                  return (
                    <a key={item.name} href={item.href} className={anchorClass}>
                      <item.icon className={iconClass} aria-hidden="true" />
                      {item.name}
                    </a>
                  )
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <Button
                  onClick={async () => {
                    await logoutMutation()
                  }}
                >
                  Logout
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-10xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
              <div className="max-w-10xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">{children}</div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default Layout
