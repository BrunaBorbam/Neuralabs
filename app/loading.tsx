/**
 * Route-transition skeleton (Next.js App Router convention — shown while a
 * new route segment streams in, e.g. navigating into /demo/airbnb).
 * The Hero itself claims "0.7s Core Web Vitals"; a bare flash of blank
 * black during navigation would quietly contradict that promise, so this
 * gives the wait a shape instead of a void.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-obsidian-900 px-6 pt-28 md:pt-44 pb-28" aria-hidden="true">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="flex flex-col gap-4">
          <div className="h-6 w-40 rounded-full bg-pearl-100/10 animate-shimmer bg-[length:1000px_100%] bg-gradient-to-r from-pearl-100/5 via-pearl-100/15 to-pearl-100/5" />
          <div className="h-12 w-full max-w-md rounded-lg bg-pearl-100/10 animate-shimmer bg-[length:1000px_100%] bg-gradient-to-r from-pearl-100/5 via-pearl-100/15 to-pearl-100/5" />
          <div className="h-12 w-4/5 max-w-sm rounded-lg bg-pearl-100/10 animate-shimmer bg-[length:1000px_100%] bg-gradient-to-r from-pearl-100/5 via-pearl-100/15 to-pearl-100/5" />
          <div className="h-4 w-full max-w-lg rounded bg-pearl-100/5 mt-4" />
          <div className="h-4 w-2/3 max-w-md rounded bg-pearl-100/5" />
        </div>
        <div className="aspect-video w-full rounded-2xl bg-pearl-100/5 border border-pearl-100/10 animate-shimmer bg-[length:1000px_100%] bg-gradient-to-r from-pearl-100/5 via-pearl-100/10 to-pearl-100/5" />
      </div>
    </div>
  );
}
