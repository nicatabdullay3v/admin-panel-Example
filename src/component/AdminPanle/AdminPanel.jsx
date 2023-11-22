import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [editID, seteditID] = useState(0);
  useEffect(() => {
    axios("https://6554da4d63cafc694fe71b29.mockapi.io/categories/users").then(
      (res) => {
        setData(res.data);
      }
    );
  }, []);
  console.log(data);
  return (
    <>
      <div className="admin-panel">
        {data.map((elem, i) => {
          return (
            <div style={{ display: "flex", gap: "20px" }} key={i}>
              <li>{elem.name}</li>
              <button
                id={elem.id}
                onClick={() => {
                  seteditID(elem.id);
                  setname(elem.name);
                  setpassword(elem.password);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();

            let obj = {
              name: name,
              password: password,
            };
            axios
              .post(
                `https://6554da4d63cafc694fe71b29.mockapi.io/categories/users`,
                obj
              )
              .then((res) => {
                setData([...data, res.data]);
              });

            setname("");
            setpassword("");
          }}
          action=""
        >
          <input
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            type="text"
          />
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
          />
          <input type="submit" />
        </form> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let obj = {
              name: name,
              password: password,
            };
            axios
              .put(
                `https://6554da4d63cafc694fe71b29.mockapi.io/categories/users/${editID}`,
                obj
              )
              .then((res) => {
                const updatedData = data.map((item) =>
                  item.id === editID ? res.data : item
                );
                setname("");
                setpassword("");
                setData(updatedData);
                seteditID(null);
              });
          }}
          action=""
        >
          <input
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            type="text"
          />
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default AdminPanel;
