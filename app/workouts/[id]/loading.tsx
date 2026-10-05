export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0e10] text-white">
      <div role="status" className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-[#ccff00]"
        />

        <p className="text-sm text-zinc-400">
          Loading workout…
        </p>
      </div>
    </main>
  );
}