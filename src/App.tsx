import { useState, useEffect } from "react";
import { ITask } from "./@types/Task";

import "./App.css";
import Auth from "./components/Auth/Auth";
import CreateTask from "./components/CreateTasks/CreateTasks";
import Tasks from "./components/Tasks/Tasks";
import { me } from "./lib/auth";

function App() {
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    async function getUser() {
      const result = await me();
      setUser(result);
    }
    getUser();
  }, [setUser]);

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
    {user ? (
      <div>
        <CreateTask addTask={addTask} />
        <Tasks tasks={tasks} toggleCompleted={toggleCompleted} />
      </div>
    ) : (
      <Auth setUser={setUser} />
    )}
  </div>
}

export default App;