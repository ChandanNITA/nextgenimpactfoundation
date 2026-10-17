
import type { NGOEvent } from '@/types'
import { Calendar, MapPin, Users } from 'lucide-react'

interface EventCardProps {
  event: NGOEvent
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date)

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-light-gray bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:flex-row">
      <div className="relative h-48 w-full shrink-0 bg-navy-900 sm:h-auto sm:w-56">
        <img src={event.image} className="h-full w-full object-cover" />
        <div className="absolute top-4 left-4 rounded-xl bg-white/95 px-3 py-2 text-center shadow-md backdrop-blur-md">
          <span className="block font-heading text-lg font-bold text-navy-900 leading-none">
            {eventDate.getDate()}
          </span>
          <span className="block text-xs font-semibold uppercase text-green-700">
            {eventDate.toLocaleDateString('en-US', { month: 'short' })}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-navy-700">
              {event.category}
            </span>
            <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-green-700">
              {event.locationType}
            </span>
          </div>

          <h3 className="mt-2.5 font-heading text-xl font-bold text-navy-900">{event.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-mid-gray">{event.description}</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-light-gray pt-4 text-xs text-mid-gray">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-navy-600" />
              {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-navy-600" />
              {event.location}
            </span>
            {event.capacity && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4 text-navy-600" />
                {event.capacity} seats
              </span>
            )}
          </div>

          <a
            href={event.registrationUrl || '/volunteer'}
            className="inline-flex items-center justify-center rounded-full bg-navy-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  )
}

