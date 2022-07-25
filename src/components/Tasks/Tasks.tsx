import { FC } from "react";
import { ITask } from "../../@types/Task";
import Task from "../Task/Task";

interface IProps {
  tasks: ITask[],
  toggleCompleted: (id: ITask) => Promise<void>
}

const Tasks: FC<IProps> = ({ tasks, toggleCompleted }): JSX.Element => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} toggleCompleted={toggleCompleted} />
      ))}
    </ul>
  );
}

export default Tasks