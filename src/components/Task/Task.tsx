import { FC, useState } from "react";
import { ITask } from "../../@types/Task";

interface IProps {
  task: ITask,
  toggleCompleted: (id: ITask) => Promise<void>
}

const Task: FC<IProps> = ({ task, toggleCompleted }): JSX.Element => {
  const [completed, setCompleted] = useState(task.completed)

  return (
    <li className={completed ? "completed" : "incompleted"}>
      <span>{task.text}</span>
      <input
        type="checkbox"
        checked={completed}
        onClick={() => toggleCompleted(task)}
        onChange={() => setCompleted(!task.completed)}
        readOnly
      />
    </li>
  )
}

export default Task