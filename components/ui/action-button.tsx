import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  href?: string
  children: React.ReactNode
}

export function ActionButton({
  variant = "default",
  size = "default",
  onClick,
  href,
  children,
  className,
  ...props
}: ActionButtonProps) {
  const handleClick = () => {
    if (href) {
      window.location.href = href
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </Button>
  )
} 