import React from 'react';

const Select = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef(({ placeholder, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {props.children || placeholder}
    </span>
  );
});

SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
      {...props}
    >
      {children}
    </div>
  );
});

SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      {...props}
    >
      {children}
    </div>
  );
});

SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }; 