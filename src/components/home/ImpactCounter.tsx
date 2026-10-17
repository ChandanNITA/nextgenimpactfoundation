import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useCounterAnimation } from '@/hooks/useCounterAnimation'
import { impactStats } from '@/data/impact'

function SingleCounter({ value, label, suffix = '', prefix = '', isVisible }: { value: number; label: string; suffix?: string; prefix?: string; isVisible: boolean }) {
  const count = useCounterAnimation(value, isVisible)

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="font-heading text-4xl font-extrabold text-navy-600 sm:text-5xl">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-mid-gray">{label}</p>
    </div>
  )
}

export function ImpactCounter() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.2 })

  return (
    <div ref={ref} className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {impactStats.map((stat) => (
        <SingleCounter
          key={stat.label}
          value={stat.value}
          label={stat.label}
          suffix={stat.suffix}
          prefix={stat.prefix}
          isVisible={isIntersecting}
        />
      ))}
    </div>
  )
}

