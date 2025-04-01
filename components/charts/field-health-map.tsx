export function FieldHealthMap() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg border">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-green-500/10 to-yellow-500/20">
        <div className="absolute top-1/4 left-1/3 h-16 w-16 rounded-full bg-red-500/20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 h-12 w-12 rounded-full bg-yellow-500/30 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/2 h-10 w-10 rounded-full bg-yellow-500/20 animate-pulse"></div>
      </div>
      <div className="absolute bottom-2 right-2 bg-white/90 p-2 text-xs rounded shadow">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span>Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <span>Moderate Stress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span>High Stress</span>
        </div>
      </div>
    </div>
  )
}

