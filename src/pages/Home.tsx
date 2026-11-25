import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'

import { Deferred } from '../components/Deferred'
import { Hero } from '../sections/Hero'

// Hero ships with the page (it is the first paint); everything below it is
// split into its own chunk and only fetched once it nears the viewport.
const section = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) => lazy(() => load().then((m) => ({ default: m[name] })))
const Pillars = section(() => import('../sections/Pillars'), 'Pillars')
const Metrics = section(() => import('../sections/Metrics'), 'Metrics')
const Testimonial = section(() => import('../sections/Testimonial'), 'Testimonial')
const PricingTeaser = section(() => import('../sections/PricingTeaser'), 'PricingTeaser')
const Faq = section(() => import('../sections/Faq'), 'Faq')
const Cta = section(() => import('../sections/Cta'), 'Cta')

export function Home() {
  return (
    <>
      <Hero />
      <Deferred>
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Pillars />
        </Suspense>
      </Deferred>
      <Deferred>
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <Metrics />
        </Suspense>
      </Deferred>
      <Deferred>
        <Suspense fallback={<div className="min-h-[420px]" />}>
          <Testimonial />
        </Suspense>
      </Deferred>
      <Deferred>
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <PricingTeaser />
        </Suspense>
      </Deferred>
      <Deferred>
        <Suspense fallback={<div className="min-h-[420px]" />}>
          <Faq />
        </Suspense>
      </Deferred>
      <Deferred>
        <Suspense fallback={<div className="min-h-[420px]" />}>
          <Cta />
        </Suspense>
      </Deferred>
    </>
  )
}
