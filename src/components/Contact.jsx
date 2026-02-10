'use client'

import { Button } from '@/components/Button'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

export function Contact() {
  return (
    <form
      action="/api/send-email"
      method="post"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Contact Me</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Send a message — I&apos;ll get back to you soon.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3">
        <label htmlFor="fullName" className="sr-only">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          placeholder="Full name"
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500"
        />

        <label htmlFor="phone" className="sr-only">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="Phone number"
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500"
        />

        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500"
        />

        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Message"
          className="min-w-0 w-full resize-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500"
        />

        <div className="mt-2 flex">
          <Button type="submit" className="ml-auto">
            Send Message
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Contact
