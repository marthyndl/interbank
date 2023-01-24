import React, { useContext, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { Product } from "../../Context/types";
import "./Add.scss";

const Add: React.FC = (): JSX.Element | null => {
  const [disabledValue, setDisabled] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Product>({
    id: 99,
    userId: "",
    title: "",
    body: "",
  });
  const { userId, title, body } = newTask;
  const appContext = useContext(DataContext);

  if (!appContext) return null;
  const { productosFromFetch, addSentence } = appContext;

  const handleChange = (e: any) => {
    e.persist();
    const value = e.target.value;
    const inputType = e.target.name;
    setNewTask({
      ...newTask,
      [inputType]: value,
    });
  };

  const handleAdd = () => {
    const newTask1: Product = {
      id: productosFromFetch.length + 1,
      userId: userId,
      title: title,
      body: body,
    };
    addSentence(newTask1);
  };

  return (
    <div>
      <div className="box-3" onClick={() => setDisabled(!disabledValue)}>
        <div className="btn btn-three">
          <span>Crear sentence</span>
        </div>
      </div>
      {disabledValue ? (
        <>
          <div>
            <div>
              <select
                className="select-css"
                name="userId"
                onChange={(e) => handleChange(e)}
                value={userId}
              >
                <option value="1">userId 1</option>
                <option value="2">userId 2</option>
                <option value="3">userId 3</option>
                <option value="4">userId 4</option>
              </select>
            </div>
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="Title"
                onChange={(e) => handleChange(e.target.value)}
                name="title"
                id="title"
              />
              <label htmlFor="title" className="form__label">
                Write Title
              </label>
            </div>
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="body"
                onChange={(e) => handleChange(e.target.value)}
                name="body"
                id="body"
              />
              <label htmlFor="body" className="form__label">
                Write Body
              </label>
            </div>
          </div>
          <button
            className="button"
            disabled={
              userId === "" || title === "" || body === "" ? true : false
            }
            onClick={handleAdd}
          >
            Save sentence
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Add;
