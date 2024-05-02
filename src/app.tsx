import { useEffect, useRef, useState } from "react";

import { EmptyList } from "./components/EmptyList";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { ListItem } from "./components/ListItem";

import { CirclePlus, MoonIcon, SunIcon, Trash2 } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FloatingButton } from "./components/FloatingButton";

export interface TaskProps {
  id: string;
  checked: boolean;
  title: string;
}

export function App() {
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [error, setError] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const [parent] = useAutoAnimate(/* optional config */);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && buttonRef.current) {
        buttonRef.current.click();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // INÍCIO DARK MODE TOGGLE

  const themeSwitcher = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const newTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);

    setTheme(newTheme);
  };

  // FIM DARK MODE TOGGLE

  const handleCheck = (checkedTaskId: string) => {
    if (tasks) {
      const task = tasks.find((task) => task.id === checkedTaskId);
      if (task) {
        const newTaskList = tasks.filter((task) => task.id !== checkedTaskId);

        task.checked = !task.checked;

        setTasks([...newTaskList, task]);
      }
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError("");
  };

  const handleSubmitTask = () => {
    if (!/^.{3,}$/.test(title)) {
      setError("Title must have, at least, 3 character.");

      return;
    }

    if (tasks === undefined) {
      setTasks([
        {
          id: crypto.randomUUID(),
          checked: false,
          title,
        },
      ]);
    } else {
      setTasks([
        ...tasks,
        {
          id: crypto.randomUUID(),
          checked: false,
          title,
        },
      ]);
    }

    setTitle("");
  };

  const handleCounterCheckedTasks = () => {
    let counter = 0;
    if (tasks) {
      tasks.forEach((task) => {
        if (task.checked) {
          counter++;
        }
      });
    }

    return counter;
  };

  const handleDeleteItem = (taskId: string) => {
    if (tasks) {
      const newTaskList = tasks.filter((task) => task.id !== taskId);
      setTasks(newTaskList);
    }
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <>
      <Header />
      <FloatingButton
        icon={theme === "light" ? MoonIcon : SunIcon}
        themeSwitcher={themeSwitcher}
      />
      <div className="flex justify-center w-full">
        <div className="w-[736px] px-2">
          <div className="flex flex-col gap-2 justify-center items-center -mt-7">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Add a new task"
                onChange={(e) => handleTitle(e)}
                value={title}
                error={error}
                className="bg-gray-100 text-gray-700 border-none"
              />

              <button
                ref={buttonRef}
                onClick={handleSubmitTask}
                className="flex justify-center items-center gap-2 p-4 w-[98px] h-[54px] rounded-lg bg-blue-dark text-gray-100 font-bold text-sm shadow-xl"
              >
                Create
                <CirclePlus className="w-4 h-4" />
              </button>
            </div>
            {error && (
              <span className="text-danger dark:text-sm font-bold">
                {error}
              </span>
            )}
          </div>

          {/* list counter */}
          <div className="flex justify-between mt-16">
            <div className="flex justify-center items-center gap-2">
              <span className="text-blue-dark dark:text-blue-400 font-bold text-md">
                Tasks created
              </span>
              <span className="inline-block px-2 py-0.5 text-center rounded-full bg-gray-600 text-gray-100 dark:bg-gray-400 dark:text-gray-200 text-xs font-bold">
                {tasks.length > 0 ? tasks.length : 0}
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex justify-center items-center gap-2">
                <span className="text-purple-dark dark:text-purple-400 font-bold text-md  ">
                  Tasks done
                </span>
                <span className="inline-block px-2 py-0.5 text-center rounded-full bg-gray-600 text-gray-100 dark:bg-gray-400 dark:text-gray-200 text-xs font-bold">
                  {tasks.length > 0
                    ? `${handleCounterCheckedTasks()} de ${tasks.length}`
                    : 0}
                </span>
              </div>
            </div>
          </div>

          {tasks.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={handleClearAll}
                className="flex h-8 justify-center items-center gap-2 p-4 rounded-lg bg-danger text-gray-100 font-bold text-sm"
              >
                Clear all
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {tasks.length === 0 && <EmptyList />}

          <div ref={parent} className="pb-6">
            {tasks.length > 0 &&
              tasks.map((item) => (
                <ListItem
                  key={item.id}
                  data={item}
                  handleCheck={handleCheck}
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
