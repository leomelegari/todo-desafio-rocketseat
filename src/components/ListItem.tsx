import * as Checkbox from "@radix-ui/react-checkbox";

import { Trash2 } from "lucide-react";
import { CheckIcon } from "@radix-ui/react-icons";
import { TaskProps } from "../app";

interface ListItemProps {
  data: TaskProps;
  handleCheck: (checkedTaskId: string) => void;
  handleDeleteItem: (taskId: string) => void;
  // checked: boolean;
}

export const ListItem = ({
  data,
  handleCheck,
  handleDeleteItem,
}: ListItemProps) => {
  return (
    <div className="flex justify-center items-start w-full gap-3 bg-gray-200 dark:bg-gray-500 p-5 rounded-lg mt-6">
      <div>
        <Checkbox.Root
          onCheckedChange={() => handleCheck(data.id)}
          className="flex mt-1 items-center justify-center w-5 h-5 border-2 border-blue-dark dark:border-blue-400 rounded-full bg-transparent aria-checked:bg-purple-dark aria-checked:border-none aria-checked:text-white"
          id="c1"
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div className="flex-1 items-start">
        <span
          className={`font-semibold text-gray-700 dark:text-gray-100 ${
            data.checked && "line-through text-gray-300"
          }`}
        >
          {data.title}
        </span>
      </div>
      <button
        onClick={() => handleDeleteItem(data.id)}
        className="w-6 h-6 text-gray-300"
      >
        <Trash2 className="w-5" />
      </button>
    </div>
  );
};
