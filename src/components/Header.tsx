import logoHeader from "../assets/todo-logo.svg";

export const Header = () => {
  return (
    <div className="flex justify-center items-center w-full h-[200px] bg-gray-100 dark:bg-gray-700 ">
      <img src={logoHeader} alt="todo logo" width={126} />
    </div>
  );
};
