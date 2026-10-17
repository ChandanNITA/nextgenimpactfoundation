import { Link } from 'react-router-dom'
import type { Program } from '@/types'
import { ArrowRight, Users, MapPin } from 'lucide-react'

interface ProgramCardProps {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5">
      <div className="relative h-56 w-full overflow-hidden bg-navy-900">
        <img
          src={program.image}
          alt={program.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-400 backdrop-blur-md">
          {program.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <h3 className="font-heading text-xl font-bold text-navy-900 group-hover:text-green-600 transition-colors">
            {program.title}
          </h3>
          <p className="mt-1 text-xs font-semibold text-green-700">{program.tagline}</p>
          <p className="mt-3 line-clamp-3 text-sm text-mid-gray/90 leading-relaxed">{program.description}</p>
        </div>

        <div className="mt-6 border-t border-light-gray/60 pt-4">
          <div className="flex items-center justify-between text-xs text-mid-gray">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-navy-600" />
              {program.beneficiaries.toLocaleString()}+ Impacted
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-navy-600" />
              {program.location.split(',')[0]}
            </span>
          </div>

          <Link
            to={`/programs/${program.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition-colors hover:text-green-600"
          >
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
