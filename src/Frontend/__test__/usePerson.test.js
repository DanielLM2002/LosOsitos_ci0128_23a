import { renderHook } from "@testing-library/react-hooks";
import usePerson from "../src/hooks/usePerson.jsx";

it("Test that the person's information is seted correctly", () => {
  const personData = [
    {
      Name: "John",
      LastName1: "Doe",
      LastName2: "Smith",
      Gender: 0,
      Email: "johndoe@gmail.com",
      Country_Name: "Costa Rica",
      State: "San José",
      Birth_Date: "1990-01-01",
    },
  ];
  const reservation = { ID: 1 };
  const setReservation = jest.fn();
  const { setPersonData } = usePerson();
  setPersonData(personData, reservation, setReservation);
  expect(setReservation).toHaveBeenCalledWith({
    ID: 1,
    Name: "John",
    LastName1: "Doe",
    LastName2: "Smith",
    Gender: 0,
    Email: "johndoe@gmail.com",
    Country_Name: "Costa Rica",
    State: "San José",
    Birth_Date: "1990-01-01",
  });
});

it("Test that the person's information is modified correctly", () => {
  const reservation = {
    ID: 1,
    Name: "John",
    LastName1: "Doe",
    LastName2: "Smith",
    Gender: 0,
    Email: "johndoe@example.com",
    Country_Name: "Costa Rica",
    State: "San José",
    Birth_Date: "1990-01-01",
  };
  const { modifyPersonData } = usePerson();
  const result = modifyPersonData("gender", "Female", reservation);
  expect(result).toEqual({
    ID: 1,
    Name: "John",
    LastName1: "Doe",
    LastName2: "Smith",
    Gender: 1,
    Email: "johndoe@example.com",
    Country_Name: "Costa Rica",
    State: "San José",
    Birth_Date: "1990-01-01",
  });
});