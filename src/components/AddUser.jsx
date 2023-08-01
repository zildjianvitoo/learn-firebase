import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";

export default function AddUser() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const usersRef = collection(db, "users");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      age: +age,
    };
    await addDoc(usersRef, data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-black"
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="name">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-black"
        />
      </div>
      <button type="submit" className="mt-5 border border-black rounded-lg">
        Add User
      </button>
    </form>
  );
}
