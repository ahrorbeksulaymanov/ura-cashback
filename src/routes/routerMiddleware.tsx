import { Route, Routes } from "react-router-dom";
import { all_routes } from ".";
import SiderDemo from "../components/layout";
import NonLayout from "../components/nonLayout";
import NotFound from "../components/notFound";

const RoutesMiddleware = () => {
  const createComponent = (name: any) => {
    const NewComponent = name;
    return <NewComponent />;
  };
  return (
    <Routes>
      {all_routes.length &&
        all_routes.map((item, index) => {
          return (
            <Route
              key={index}
              path={item?.path}
              element={
                item.config.structure === "layout" ? (
                  <SiderDemo>{createComponent(item.component)}</SiderDemo>
                ) : (
                  <NonLayout>{createComponent(item.component)}</NonLayout>
                )
              }
            />
          );
        })}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
export default RoutesMiddleware;
