export function Welcome() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 font-mono text-muted">
      <p className="text-sm">
        <span className="text-keyword">portfolio</span>
        <span className="text-fg/70"> — ningún archivo abierto</span>
      </p>
      <p className="text-xs">
        Selecciona un archivo del explorador para empezar
      </p>
    </div>
  )
}
