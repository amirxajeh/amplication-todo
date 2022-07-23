import { useState } from "react";
import { ITask } from "./@types/Task";

import "./App.css";
import CreateTask from "./components/CreateTasks/CreateTasks";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const createTask = (text: string, id: number) => ({
    id,
    text,
    completed: false,
  });

  const addTask = (task: string) => {
    const temp = [...tasks];
    temp.push(createTask(task, tasks.length));
    setTasks(temp);
  };

  const toggleCompleted = (id: number) => {
    let temp = [...tasks];
    const i = temp.findIndex((t) => t.id === id);
    temp[i].completed = !temp[i].completed;
    setTasks(temp);
  };

  return <div>
    <CreateTask addTask={addTask} />
    <Tasks tasks={tasks} toggleCompleted={toggleCompleted} />
  </div>;
}

export default App;