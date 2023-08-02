import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  query,
  orderBy,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, orderBy("name", "asc"));

  useEffect(() => {
    const getUsers = async () => {
      const { docs } = await getDocs(usersQuery);
      const usersData = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersData);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const callback = (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersData);
    };

    const unsubscribe = onSnapshot(usersQuery, callback);

    return () => unsubscribe();
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  const onIncreaseAgeHandler = async (id, age) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, {
      age: age + 1,
    });
  };

  const onDecreaseAgeHandler = async (id, age) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, {
      age: age - 1,
    });
  };

  if (users.length === 0) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Users List</h1>
      <ul className="flex flex-col gap-3">
        {users.map((user) => (
          <li key={user.id} className="flex gap-5 mx-auto w-fit">
            {users.length > 1 && (
              <button
                className="grid w-6 h-6 border border-black rounded-full "
                onClick={() => onDeleteHandler(user.id)}
              >
                X
              </button>
            )}

            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <div className="flex gap-2">
              {" "}
              <button
                className="grid px-3 border border-black rounded-full "
                onClick={() => onIncreaseAgeHandler(user.id, user.age)}
              >
                + Age
              </button>
              <button
                className="grid px-3 border border-black rounded-full "
                onClick={() => onDecreaseAgeHandler(user.id, user.age)}
              >
                - Age
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
