'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { MovementDetail } from '@/components/movement-detail'
import { movementLibrary } from '@/lib/movement-utils'

export default function MovementDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const movement = movementLibrary.find((m) => m.id === params.id)

  if (!movement) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <Link
            href="/movement"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            aria-label="Back to movement guide"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Movement Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find this movement. Try browsing all available movements.
            </p>
            <Link
              href="/movement"
              className="inline-flex px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View All Movements
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/movement"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Movement Guide
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{movement.name}</span>
          </div>
        </nav>

        {/* Back Button */}
        <Link
          href="/movement"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          aria-label="Back to movement guide"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Title & Main Content */}
        <article>
          <h1 className="text-4xl font-bold text-foreground mb-1">
            {movement.name}
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            {movement.description}
          </p>

          {/* Content */}
          <MovementDetail movement={movement} />
        </article>
      </div>
    </div>
  )
}
