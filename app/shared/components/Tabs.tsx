import { ReactNode, useState } from "react"

const tabs = [
  { name: "My Account", href: "#", current: false },
  { name: "Company", href: "#", current: false },
  { name: "Team Members", href: "#", current: true },
  { name: "Billing", href: "#", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

type Tab = {
  name: string
}

interface TabsProps {
  tabs: Tab[]
  index?: number
  children: ({ currentIndex }: { currentIndex: number }) => ReactNode
}

const Tabs: React.FC<TabsProps> = ({ tabs, index, children }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(index ?? 0)
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={currentIndex}
          onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
        >
          {tabs.map((tab, index) => (
            <option key={tab.name} value={index}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <a
              key={tab.name}
              onClick={() => setCurrentIndex(index)}
              className={classNames(
                currentIndex === index
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-2 px-1 border-b-2 font-bold text-lg cursor-pointer"
              )}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="pt-4 h-full">{children({ currentIndex })}</div>
    </div>
  )
}

export default Tabs
