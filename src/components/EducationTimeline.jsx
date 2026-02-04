export function EducationTimeline({ title = 'Education', items = [] }) {
  return (
    <div className="space-y-8">
      {/* Title with divider line */}
      <div className="flex items-center">
        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
        <span className="shrink-0 px-4 text-gray-900 dark:text-white font-semibold text-lg">
          {title}
        </span>
        <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
      </div>

      {/* Timeline */}
      <ol className="relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700">
        {items.map((item, index) => (
          <li
            key={index}
            className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3"
          >
            <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
              {/* Timeline dot */}
              <span className="size-3 shrink-0 rounded-full bg-purple-600 dark:bg-purple-500"></span>

              {/* Content */}
              <div className="-mt-2">
                <time className="text-xs/none font-medium text-gray-700 dark:text-gray-200">
                  {item.date}
                </time>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {item.institution}
                </p>
                {item.description && (
                  <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <div aria-hidden="true"></div>
          </li>
        ))}
      </ol>
    </div>
  )
}