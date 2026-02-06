export function HydrationInfo() {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-6">
      <h3 className="font-semibold text-foreground mb-4">How Hydration Works</h3>
      <ul className="space-y-3 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <span className="text-primary font-bold flex-shrink-0">→</span>
          <span>Reminders adapt gently based on your cycle phase and mood</span>
        </li>
        <li className="flex gap-3">
          <span className="text-primary font-bold flex-shrink-0">→</span>
          <span>You control how often you're reminded—no pressure</span>
        </li>
        <li className="flex gap-3">
          <span className="text-primary font-bold flex-shrink-0">→</span>
          <span>Missing a reminder is okay—this is gentle support, not a goal</span>
        </li>
        <li className="flex gap-3">
          <span className="text-primary font-bold flex-shrink-0">→</span>
          <span>All reminders can be disabled anytime from preferences</span>
        </li>
      </ul>
    </div>
  )
}
