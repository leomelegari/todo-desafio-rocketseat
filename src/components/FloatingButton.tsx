import { ComponentProps, ElementType } from "react";

type FloatingButtonProps = ComponentProps<"button"> & {
  icon: ElementType;
  themeSwitcher: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const FloatingButton = ({
  icon: Icon,
  themeSwitcher,
  ...props
}: FloatingButtonProps) => {
  return (
    <div className="fixed top-4 right-4">
      <button
        {...props}
        onClick={(e) => themeSwitcher(e)}
        className="bg-gray-500 dark:bg-gray-200 text-white dark:text-gray-500 font-bold py-2 px-4 rounded-full shadow-lg"
      >
        <Icon />
      </button>
    </div>
  );
};
