import { getUpcomingEvents } from '@/data/events'
import { EventCard } from '@/components/events/EventCard'

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents()

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
            Get Involved
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Upcoming Events</h1>
          <p className="mt-4 text-lg text-navy-100">
            Join our upcoming drives, workshops, and youth leadership summits.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-6">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </div>
  )
}
