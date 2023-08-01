import { useEffect } from "react";
import "./App.css";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";

function App() {
  return (
    <div className="flex justify-center gap-20">
      <UsersList />
      <AddUser />
    </div>
  );
}

export default App;
