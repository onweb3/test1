import { twMerge } from "tailwind-merge";

function BlackFancyPaper({ children, className, childrenWrapperClassName }) {
  return (
    <div
      className={twMerge(
        "shadow-[0px_4px_50px_rgba(0,0,0,0.25)] rounded-[30px] p-[2px] flex flex-col feature-card bg-[#252527] -border",
        className
      )}
    >
      <div className="bg-main-bg rounded-[30px] overflow-hidden flex-1 flex flex-col">
        <div
          className={twMerge(
            `flex-1 bg-feature-card`,
            childrenWrapperClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default BlackFancyPaper;
