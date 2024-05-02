import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<"input"> {
  error: string;
}

export const Input = ({ error, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={twMerge(
        "w-full h-[54px] p-4 rounded-lg dark:border outline-none ",
        "border-gray-700 dark:bg-gray-500 placeholder:text-gray-300 dark:text-gray-100",
        "focus-within:border-none focus-within:ring-1 focus-within:ring-blue-dark",
        error && "focus-within:ring-danger",
        "shadow-xl",
      )}
    />
  );
};
