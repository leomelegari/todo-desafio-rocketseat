// import Clipboard from "../assets/clipboard.svg";
import { ClipboardList } from "lucide-react";

export const EmptyList = () => {
  return (
    <div className="flex h-60 mt-6 border-t-[1px] border-t-gray-200 dark:border-t-gray-400 rounded-lg">
      <div className="w-full flex flex-col items-center justify-center border-t border-transparent rounded-full text-gray-500 dark:text-gray-300">
        {/* <img
          src={Clipboard}
          alt="clipboard icon"
          className="w-14 h-14 text-danger"
        /> */}
        <ClipboardList className="w-14 h-14 text-gray-500 dark:text-gray-300" />
        <span className="font-bold text-base mt-4">
          You don't have any tasks registered yet
        </span>
        <span className="ext-base">
          Create tasks and organize your to-do items
        </span>
      </div>
    </div>
  );
};
