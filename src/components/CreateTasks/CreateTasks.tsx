import { FC, useState } from "react";

interface IProps {
  addTask: (taskText: string) => void
}

const CreateTask: FC<IProps> = ({ addTask }): JSX.Element => {
  const [task, setTask] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="TODO"
        value={task}
        onChange={handleChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateTask