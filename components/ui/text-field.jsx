'use client';

import * as React from 'react';
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textFieldVariants = cva(
  "flex flex-col flex-nowrap items-stretch justify-center relative",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        classic: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        surface: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        soft: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        md: "h-11 rounded-md px-8",
        lg: "h-10 w-10",
      },
      radius: {
        default: "h-10 px-4 py-2",
        none: "",
        small: "",
        medium: "",
        large: "",
        full: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  }
)

const TextFieldContext = React.createContext(undefined);

const TextField = React.forwardRef(({ className, variant, size, radius, asChild = false, children, ...props }, ref) => {
  return (
    <div 
      className="flex flex-col flex-nowrap items-stretch justify-center relative"
      ref={ref}
    >
      <TextFieldContext.Provider value={{ size, variant, radius }}>
        {children}
      </TextFieldContext.Provider>
    </div>
  )
})

TextField.displayName = 'TextField'

const TextFieldSlot = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(TextFieldContext);
  return (
    <div 
      className="my-0 ml-0 mr-3 p-1 border-0 outline-0 select-none cursor-pointer rounded inline-flex justify-center items-center transition font-normal text-sm min-h[1.5rem] tracking-wider w-6 absolute right-0 text-slate-400 hover:text-slate-500 focus:transition focus:shadow focus:shadow-indigo-400"
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

TextFieldSlot.displayName = 'TextFieldSlot'

const TextFieldInput = React.forwardRef(({ ...props }, ref) => {
  const context = React.useContext(TextFieldContext);
  const hasRoot = context !== undefined;

  const { variant, size, className } = {...context, ...props};

  const clsx = hasRoot ? 
  "m-0 py-3 pr-10 pl-4 bg-white text-black outline-transparent outline outline-2 outline-offset-2 w-full accent-indigo-400 font-normal text-sm rounded border border-solid border-slate-300 focus:transition focus:shadow focus:shadow-indigo-400"
  :
  "m-0 py-3 px-4 bg-white text-black outline outline-2 outline-transparent outline-offset-2 w-full accent-indigo-400 font-normal text-sm rounded border border-solid border-slate-300 focus:transition focus:shadow focus:shadow-indigo-400"

  return (
    <input
      className={clsx}
      ref={ref}
      {...props}
    />
  )
})

TextFieldInput.displayName = 'TextFieldInput'

export { TextField, TextFieldSlot, TextFieldInput }