
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "rounded-xl shadow-sm border p-6 overflow-hidden transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-white",
        glass: "glass",
        colored: "bg-gradient-to-br from-racing-blue/10 to-racing-red/10"
      },
      size: {
        default: "",
        sm: "p-4",
        lg: "p-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
}

const DashboardCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, subtitle, icon, footer, children, variant, size, isLoading, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size }), className, "animate-scale-in")}
        {...props}
      >
        {(title || icon) && (
          <div className="flex justify-between items-start mb-4">
            <div>
              {title && <h3 className="text-lg font-medium">{title}</h3>}
              {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
            </div>
            {icon && <div className="text-slate-400">{icon}</div>}
          </div>
        )}
        
        <div className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-50" : "opacity-100"
        )}>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-racing-red animate-spin"></div>
            </div>
          ) : children}
        </div>
        
        {footer && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

DashboardCard.displayName = "DashboardCard";

export { DashboardCard };
