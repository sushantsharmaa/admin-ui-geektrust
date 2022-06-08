import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Home } from "./components/Home/Home";
import { getUsers } from "./features/users/usersSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="app">
      <Home />
    </div>
  );
}

export default App;
