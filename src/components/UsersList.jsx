import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  query,
  orderBy,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, orderBy("name", "asc"));

  const getUsers = async () => {
    const { docs } = await getDocs(usersQuery);
    const usersData = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers(usersData);
  };

  const onDeleteHandler = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const callback = (snapshot) => {
      const usersData = snapshot.docs.map((docs) => ({
        ...docs.data(),
        id: docs.id,
      }));
      setUsers(usersData);
    };

    const unsubscribe = onSnapshot(usersRef, callback);

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Users List</h1>
      <ul className="flex flex-col gap-3">
        {users.map((user) => (
          <li key={user.id} className="flex gap-5 mx-auto w-fit">
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <button
              className="w-6 h-6 border border-black rounded-full "
              onClick={() => onDeleteHandler(user.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
