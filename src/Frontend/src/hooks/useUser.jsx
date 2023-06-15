import React from "react";
import { useState, useEffect } from "react";
import AxiosClient from "../config/AxiosClient";

const useUser = () => {
  const [users, setUsers] = useState([]);

  const createUser = () => {
    return {
      ID: "",
      Name: "",
      LastName1: "",
      LastName2: "",
      Gender: 0,
      Email: "",
      Country_Name: "Costa Rica",
      Birth_Date: new Date().toISOString(),
      State: "",
      Username: "",
      Password: "",
      Type: 0
    };
  };

  const modifyUserData = (type, value, user) => {
    const newUser = {...user};
    if (type === "usertype") {
      if (value === "Admin") {
        newUser.Type = 0;
      } else {
        newUser.Type = 1;
      }
    } else if (type === "username") {
      newUser.Username = value;
    } else if (type === "userpassword") {
      newUser.Password = value;
    }
    return newUser;
  };

  const fetchUsers = async (user) => {
    try {
      const url = "/employee";
      const { data } = await AxiosClient.get(url);
      await setUsers(data);
    } catch (exception) {
      console.log(exception);
    }
  };

  const insertPerson = async (user) => {
    try {
      const {
        ID,
        Name,
        LastName1,
        LastName2,
        Gender,
        Birth_Date,
        Email,
        Country_Name,
        State
      } = user;
      const url = "/person";
      await AxiosClient.post(url, {
        ID,
        Name,
        LastName1,
        LastName2,
        Gender,
        Birth_Date,
        Email,
        Country_Name,
        State: Country_Name === "Costa Rica" ? State : null
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  const insertUser = async (user) => {
    try {
      const {
        ID,
        Username,
        Password,
        Type
      } = user;
      const url = "/employee";
      await AxiosClient.post(url, {
        ID,
        Username,
        Password,
        Type
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  const deleteUser = async (user) => {
    try {
      const { Username } = user;
      const url = `/employee/${Username}`;
      await AxiosClient.delete(url);
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => fetchUsers, []);

  return {
    users,
    createUser,
    modifyUserData,
    fetchUsers,
    insertPerson,
    insertUser,
    deleteUser
  };
};

export default useUser;