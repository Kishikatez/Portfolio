export function ScrollProgress({ progress }) {
  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
