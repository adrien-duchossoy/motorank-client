import { cn } from "@/lib/utils"

const Spinner = ({ className }) => (
  <svg
    className={cn("animate-spin text-muted-foreground", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
    <Spinner className="h-10 w-10" />
  </div>
)

export { Spinner, Loader }
