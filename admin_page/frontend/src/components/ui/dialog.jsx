import React from 'react';

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        {children}
      </div>
    </div>
  );
};

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
});

DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  );
});

DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <h3 ref={ref} className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
});

DialogTitle.displayName = 'DialogTitle';

export { Dialog, DialogContent, DialogHeader, DialogTitle }; 