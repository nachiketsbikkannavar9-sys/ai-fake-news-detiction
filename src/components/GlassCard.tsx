import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-xl p-6",
        hoverEffect && "glass-panel-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
