import { twMerge } from "tailwind-merge";

function Input({ className, as = "input", ...props }) {
  const Comp = as;

  return (
    <Comp
      {...props}
      className={twMerge(
        "h-10 border-1 border-white-60 px-4 sm:px-6 bg-transparent w-full rounded-md",
        className
      )}
    />
  );
}

export default Input;
