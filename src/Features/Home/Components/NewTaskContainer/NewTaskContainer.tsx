import botImage from "../../../../assets/images/bot.png";
import Loader from "../../../../Components/AnimatedComponents/Loader/Loader";
import { ArrowIcon } from "../../../../Constants/Icons/arrow_icon";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import { writeTask, readTasks } from "../../../Home/Redux/HomeReducer";
import "./NewTaskContainer.css";

export default function NewTaskContainer() {
  const { writeLoading } = useAppSelector((state) => state.home);

  const dispatch = useAppDispatch();

  const [description, setDescription] = useState("");

  const handleTaskWrite = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      writeTask({ id: 0, title: "", description: description, date: "" }),
    );

    if (writeTask.fulfilled.match(result)) {
      dispatch(readTasks());
      setDescription("");
    }
  };

  return (
    <div className="div1 animated-border">
      <img src={botImage} alt="" />
      <h4>
        Hello, what is on your <br />
        mind today?
      </h4>
      <div className="note-form">
        <input
          type="text"
          className="description-field"
          placeholder="Type something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="note-submit-button" onClick={handleTaskWrite}>
          {writeLoading ? (
            <Loader large={true} />
          ) : (
            ArrowIcon({ color: "#fff", size: 32 })
          )}
        </button>
      </div>
    </div>
  );
}
