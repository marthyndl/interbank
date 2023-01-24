import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import "./Filters.scss";

const Filters: React.FC = (): JSX.Element | null => {
  const appContext = useContext(DataContext);

  if (!appContext) return null;
  const { onFilterChange } = appContext;

  return (
    <div className="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder="Search... Title"
        onChange={(e) => onFilterChange(e.target.value)}
        name="name"
        id="name"
      />
      <label htmlFor="name" className="form__label">
        Search... Title
      </label>
    </div>
  );
};

export default Filters;
