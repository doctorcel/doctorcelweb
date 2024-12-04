import React, { createContext, useContext, useState } from 'react'

interface SelectContextType {
  value: string
  onChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

interface SelectProps {
  children: React.ReactNode
  onValueChange?: (value: string) => void
  defaultValue?: string
}

export function Select({ children, onValueChange, defaultValue = '' }: SelectProps) {
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)

  const onChange = (newValue: string) => {
    setValue(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value, onChange, open, setOpen }}>
      <div className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectTrigger must be used within a Select')

  return (
    <button
      type="button"
      className={`w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => context.setOpen(!context.open)}
      {...props}
    >
      {children}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-4 w-4 opacity-50 ml-2 shrink-0"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectValue must be used within a Select')

  return <span className="truncate">{context.value || placeholder}</span>
}

export function SelectContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectContent must be used within a Select')

  if (!context.open) return null

  return (
    <div 
      className={`absolute left-0 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md z-50 animate-in fade-in-0 zoom-in-95 ${className}`}
      style={{ minWidth: '100%' }}
      {...props}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  )
}

export function SelectItem({ children, className, value, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectItem must be used within a Select')

  const isSelected = context.value === value

  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${isSelected ? 'bg-accent text-accent-foreground' : ''} ${className}`}
      onClick={() => context.onChange(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </span>
      <span className="truncate">{children}</span>
    </div>
  )
}

