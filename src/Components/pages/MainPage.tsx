import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { InfinitySpin } from "react-loader-spinner";
import Products from "../sections/Products";
import Filters from "../sections/Filters";
import Add from "../sections/Add";

const MainPage: React.FC = (): JSX.Element | null => {
  const appContext = useContext(DataContext);

  if (!appContext) return null;
  const { loading } = appContext;

  return (
    <>
      {loading ? null : (
        <div className="container_practicas container_green">
          <div className="fixed_width_productos">
            <h1 className="main_text">Sentences</h1>
            {loading ? (
              <InfinitySpin width="200" color="#f0f5f3" />
            ) : (
              <>
                <Filters />
                <Add />
                <Products />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
