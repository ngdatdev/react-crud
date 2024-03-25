import TableUsers from "../TableUsers";
import Login from "../Login";
import Home from "../Home"
import { Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { NotFound } from "./NotFound";

const AppRoute = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/users" element={
        <PrivateRoute>
            <TableUsers/>
        </PrivateRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
