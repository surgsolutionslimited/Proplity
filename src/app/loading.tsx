export default function Loading() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-on-surface-variant font-label-md text-label-md">Loading…</p>
      </div>
    </div>
  );
}
