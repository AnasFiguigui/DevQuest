// function Section({ onFilterChange }) {
//   const [currentTab, setCurrentTab] = useState('all')

//   const handleTabChange = (value) => {
//     setCurrentTab(value)
//     onFilterChange(value)
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:hidden">
//         <select
//           value={currentTab}
//           onChange={(e) => handleTabChange(e.target.value)}
//           aria-label="Select a tab"
//           className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-zinc-800 dark:text-zinc-100 dark:outline-zinc-700"
//         >
//           {tabs.map((tab) => (
//             <option key={tab.name} value={tab.value}>{tab.name}</option>
//           ))}
//         </select>
//       </div>
//       <div className="hidden sm:block">
//         <nav aria-label="Tabs" className="isolate flex divide-x divide-zinc-200 rounded-lg bg-zinc-50 shadow dark:divide-zinc-700 dark:bg-zinc-800">
//           {tabs.map((tab, tabIdx) => (
//             <button
//               key={tab.name}
//               onClick={() => handleTabChange(tab.value)}
//               aria-current={currentTab === tab.value ? 'page' : undefined}
//               className={classNames(
//                 currentTab === tab.value ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300',
//                 tabIdx === 0 ? 'rounded-l-lg' : '',
//                 tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
//                 'group relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center text-sm font-medium hover:bg-zinc-100 focus:z-10 dark:hover:bg-zinc-700',
//               )}
//             >
//               <span>{tab.name}</span>
//               <span
//                 aria-hidden="true"
//                 className={classNames(
//                   currentTab === tab.value ? 'bg-purple-400' : 'bg-transparent',
//                   'absolute inset-x-0 bottom-0 h-0.5 transition',
//                 )}
//               />
//             </button>
//           ))}
//         </nav>
//       </div>
//     </div>
//   )
// }


// function Section({ onFilterChange }) {
//   const [currentTab, setCurrentTab] = useState('all')

//   const handleTabChange = (value) => {
//     setCurrentTab(value)
//     onFilterChange(value)
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:hidden">
//         <select
//           value={currentTab}
//           onChange={(e) => handleTabChange(e.target.value)}
//           aria-label="Select a tab"
//           className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-zinc-800 dark:text-zinc-100 dark:outline-zinc-700"
//         >
//           {tabs.map((tab) => (
//             <option key={tab.name} value={tab.value}>{tab.name}</option>
//           ))}
//         </select>
//       </div>
//       <div className="hidden sm:block">
//         <nav aria-label="Tabs" className="isolate flex divide-x divide-zinc-200 rounded-lg bg-zinc-50 shadow dark:divide-zinc-700 dark:bg-zinc-800">
//           {tabs.map((tab, tabIdx) => (
//             <button
//               key={tab.name}
//               onClick={() => handleTabChange(tab.value)}
//               aria-current={currentTab === tab.value ? 'page' : undefined}
//               className={classNames(
//                 currentTab === tab.value ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300',
//                 tabIdx === 0 ? 'rounded-l-lg' : '',
//                 tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
//                 'group relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center text-sm font-medium hover:bg-zinc-100 focus:z-10 dark:hover:bg-zinc-700 inline-flex items-center justify-center',
//               )}
//             >
//               <span>{tab.name}</span>
//               <span
//                 className={classNames(
//                   currentTab === tab.value ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-200/20 dark:bg-white/10 text-zinc-600 dark:text-gray-300',
//                   'ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium',
//                 )}
//               >
//                 {getCountByCategory(tab.value)}
//               </span>
//             </button>
//           ))}
//         </nav>
//       </div>
//     </div>
//   )
// }