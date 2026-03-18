import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const InputAdornment = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, startAdornment, endAdornment, ...props }, ref) => {
  return (
    <div className="flex items-center w-full rounded-md border border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive h-9 min-w-0 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-within:ring-4 focus-within:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-within:ring-[3px] aria-invalid:focus-within:outline-none md:text-sm dark:aria-invalid:focus-within:ring-4">
      {startAdornment && <span className="pr-2 text-sm text-muted-foreground">{startAdornment}</span>}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "w-full border-0 shadow-none focus-visible:ring-0 focus-within:outline-0",
          className
        )}
        {...props}
      />
      {endAdornment && <span className="pl-2 text-sm text-muted-foreground">{endAdornment}</span>}
    </div>
  )
})
InputAdornment.displayName = "InputAdornment"

export { InputAdornment }
