import { useState, useEffect } from "react";

import * as tasksLib from "./lib/tasks";
import { ITask } from "./@types/Task";
import "./App.css";
import Auth from "./components/Auth/Auth";
import CreateTask from "./components/CreateTasks/CreateTasks";
import Tasks from "./components/Tasks/Tasks";
import { me } from "./lib/auth";

function App() {
  const [user, setUser] = useState<any>();
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    async function getUser() {
      const result = await me();
      setUserFetchTasks(result);
    }
    getUser();
  }, [setUser, setTasks]);


  const addTask = async (task: string) => {
    const newTask = await tasksLib.create(task, user.id);
    if (!newTask) return;
    const temp = [...tasks];
    temp.push(newTask);
    setTasks(temp);
  };

  const toggleCompleted = async (task: ITask) => {
    const updatedTask = await tasksLib.update(task);
    if (!updatedTask) return;
    let temp = [...tasks];
    const i = temp.findIndex((t) => t.id === updatedTask.id);
    temp[i] = updatedTask;
    setTasks(temp);
  };

  const setUserFetchTasks = async (user: any) => {
    setUser(user);
    if (!user) return;
    const result = await tasksLib.getAll(user.id);
    setTasks(result);
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