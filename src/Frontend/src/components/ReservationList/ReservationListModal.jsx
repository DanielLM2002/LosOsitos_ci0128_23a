import { useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Buttons/Button";
import AxiosClient from "../../config/AxiosClient";
import InputButton from "../Buttons/InputButton";
import DropDownSelect from "../Buttons/DropDownSelect";
import DatePickerButton from "../Buttons/DatePickerButton";
import ReservationListAddVehicles from "./ReservationListAddVehicles";
import {
  formatDateDTDDMMYYYY,
  getHoursMinutesFromISOFormat,
  createHoursWithIntervals,
  changeDateInISOFormat,
  changeHourInISOFormat,
} from "../../helpers/formatDate";

const ReservationListModal = ({
  mainRecordInfo,
  setMainRecordInfo,
  viewModal,
  setViewModal,
}) => {
  // State that controls the modify button in the popup
  const [modifyButton, setModifyButton] = useState("Modify");
  // State that controls the elements availability in the popup
  const [disabledElements, setDisabledElements] = useState(true);

  // Method that inserts a new vehicle
  const insertNewVehicle = async () => {
    try {
      const { ID, Reservation_Date, NewVehicles } = mainRecordInfo;
      const url = '/reservation-list/insertVehicle';
      await Promise.all(
        NewVehicles.map(async (vehicle, index) => {
          await AxiosClient.post(url, {
            ID,
            Reservation_Date,
            ID_Vehicle: mainRecordInfo.NewVehicles[index],
          });
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  // Method that updates the services
  const updateServices = async () => {
    try {
      const { ID, Reservation_Date, Services } = mainRecordInfo;
      const url = `/reservation-list/getServicesByReservationID/${ID}/${Reservation_Date}`;
      const { data } = await AxiosClient.get(url);
      const url2 = "/reservation-list/updateService";
      await Promise.all(
        data.map(async (service, index) => {
          await AxiosClient.put(url2, {
            ID,
            Reservation_Date,
            Name_Service: service.Name_Service,
            Schedule: mainRecordInfo.Services[index].Schedule,
          });
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  // Method that updates the tickets
  const updateTickets = async () => {
    try {
      const { ID, Reservation_Date, Tickets } = mainRecordInfo;
      const url = `/reservation-list/getTicketsByReservationID/${ID}/${Reservation_Date}`;
      const { data } = await AxiosClient.get(url);
      let parsedTickets = [];
      Tickets.map((ticket) => {
        ticket.Age_Range = parseInt(ticket.Age_Range);
        ticket.Demographic_Group = parseInt(ticket.Demographic_Group);
        ticket.Amount = parseInt(ticket.Amount);
        parsedTickets.push(ticket);
      });
      const url2 = "/reservation-list/updateTicket";
      await Promise.all(
        data.map(async (ticket, index) => {
          await AxiosClient.put(url2, {
            ID,
            Reservation_Date,
            Age_Range: ticket.Age_Range,
            Amount: ticket.Amount,
            Demographic_Group: ticket.Demographic_Group,
            newAmount: parsedTickets[index].Amount,
          });
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  // Method that updates the spots
  const updateSpots = async () => {
    try {
      const { ID, Reservation_Date, Spots } = mainRecordInfo;
      const url = `/reservation-list/getSpotsByReservationID/${ID}/${Reservation_Date}`;
      const { data } = await AxiosClient.get(url);
      let oldSpots = [];
      let spotsToChange = [];
      data.map((spot, index) => oldSpots.push(spot.Location_Spot));
      Spots.map((spot, index) => {
        if (!oldSpots.includes(parseInt(spot.Location_Spot)))
          spotsToChange.push(index);
      });
      const url2 = "/reservation-list/updateSpot";
      await Promise.all(
        spotsToChange.map(async (spot) => {
          await AxiosClient.put(url2, {
            ID,
            Reservation_Date,
            oldLocation_Spot: oldSpots[spot],
            newLocation_Spot: parseInt(Spots[spot].Location_Spot),
          });
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  // Method that updates the vehicles
  const updateVehicles = async () => {
    try {
      const { ID, Reservation_Date, Vehicles } = mainRecordInfo;
      const url = `/reservation-list/getVehiclesByReservationID/${ID}/${Reservation_Date}`;
      const { data } = await AxiosClient.get(url);
      let oldVehicles = [];
      let vehiclesToChange = [];
      data.map((vehicle, index) => oldVehicles.push(vehicle.ID_Vehicle));
      Vehicles.map((vehicle, index) => {
        if (!oldVehicles.includes(vehicle)) vehiclesToChange.push(index);
      });
      const url2 = "/reservation-list/updateVehicle";
      await Promise.all(
        vehiclesToChange.map(async (vehicle) => {
          await AxiosClient.put(url2, {
            ID,
            Reservation_Date,
            oldID_Vehicle: oldVehicles[vehicle],
            newID_Vehicle: Vehicles[vehicle],
          });
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  // Method that updates the costumer data
  const updatePersonData = async () => {
    try {
      const {
        ID,
        Reservation_Date,
        Name,
        LastName1,
        LastName2,
        Email,
        Country_Name,
      } = mainRecordInfo;
      const url = "/reservation-list/updatePersonData";
      await AxiosClient.put(url, {
        ID,
        Reservation_Date,
        Name,
        LastName1,
        LastName2,
        Email,
        Country_Name,
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  // Method that updates the data of a camping dates
  const updateStartEndDates = async () => {
    try {
      const { ID, Reservation_Date, Start_Date, End_Date } = mainRecordInfo;
      const url = "/reservation-list/updateStartEndDates";
      await AxiosClient.put(url, {
        ID,
        Reservation_Date,
        Start_Date,
        End_Date,
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  // Method that updates the data of a camping dates
  const updateState = async () => {
    try {
      const { ID, Reservation_Date, State } = mainRecordInfo;
      const url = "/reservation-list/updateState";
      await AxiosClient.put(url, {
        ID,
        Reservation_Date,
        State,
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  // Method that handles what happen when the modify button is clicked
  const modifyHandleClick = () => {
    setDisabledElements(!disabledElements);
    modifyButton === "Modify"
      ? setModifyButton("Save changes")
      : setModifyButton("Modify");
  };

  // Method tha formats the ticket information
  const formatTicket = (ticket) => {
    const { Age_Range, Demographic_Group } = ticket;
    const resultAgeRange = Age_Range == 0 ? "Children" : "Adult";
    const resultDemographicGroup =
      Demographic_Group == 0 ? "National" : "Foreign";
    return Demographic_Group != 2
      ? resultDemographicGroup + ", " + resultAgeRange
      : "Special Visitor";
  };

  // Method that puts the element in its initial state
  const restartModal = () => {
    setViewModal(false);
    setDisabledElements(true);
    setModifyButton("Modify");
  };

  // Method that validates what part of the state to modify
  const changeRecordInfo = (type, value) => {
    const newRecord = { ...mainRecordInfo };
    if (Array.isArray(type)) {
      if (type[0] === "vehicles") {
        const newVehicles = [...newRecord.Vehicles];
        newVehicles[type[1]] = value;
        newRecord.Vehicles = newVehicles;
      } else if (type[0] === "services") {
        const newServices = [...newRecord.Services];
        type[1] === "date"
          ? (newServices[type[2]].Schedule = changeDateInISOFormat(
              value,
              newServices[type[2]].Schedule
            ))
          : (newServices[type[2]].Schedule = changeHourInISOFormat(
              value,
              newServices[type[2]].Schedule
            ));
      } else if (type[0] === "tickets") {
        const newTickets = [...newRecord.Tickets];
        if (type[1] == "ticketType") {
          if (value === "Foreign, Adult") {
            newTickets[type[2]].Demographic_Group = 1;
            newTickets[type[2]].Age_Range = 1;
          } else if (value === "Foreign, Children") {
            newTickets[type[2]].Demographic_Group = 1;
            newTickets[type[2]].Age_Range = 0;
          } else if (value === "National, Adult") {
            newTickets[type[2]].Demographic_Group = 0;
            newTickets[type[2]].Age_Range = 1;
          } else if (value === "National, Children") {
            newTickets[type[2]].Demographic_Group = 0;
            newTickets[type[2]].Age_Range = 0;
          } else if (value === "Special Visitor") {
            newTickets[type[2]].Demographic_Group = 2;
            newTickets[type[2]].Age_Range = 1;
          }
        } else {
          newTickets[type[2]].Amount = value;
        }
        newRecord.Tickets = newTickets;
      } else if (type[0] === "spots") {
        const newSpots = [...newRecord.Spots];
        newSpots[type[1]].Location_Spot = value;
        newRecord.Spots = newSpots;
      }
    } else {
      if (type === "ID") {
        newRecord.ID = value;
      } else if (type === "Name") {
        newRecord.Name = value;
      } else if (type === "Lastname1") {
        newRecord.LastName1 = value;
      } else if (type === "Lastname2") {
        newRecord.LastName2 = value;
      } else if (type === "Email") {
        newRecord.Email = value;
      } else if (type === "Country_Name") {
        newRecord.Country_Name = value;
      } else if (type === "Start_Date") {
        newRecord.Start_Date = changeDateInISOFormat(
          value,
          newRecord.Start_Date
        );
      } else if (type === "End_Date") {
        newRecord.End_Date = changeDateInISOFormat(value, newRecord.End_Date);
      } else if (type === "State") {
        newRecord.State = value === "Pending" ? 0 : 1;
      }
    }
    setMainRecordInfo(newRecord);
  };

  return (
    <Modal state={viewModal} setState={restartModal} title="Reservation Data">
      <div className="my-3">
        {
          <Button
            text={modifyButton}
            onclickFunction={() => {
              modifyHandleClick();
              if (modifyButton === "Save changes") {
                updatePersonData();
                updateServices();
                updateTickets();
                updateState();
                insertNewVehicle();
                if (mainRecordInfo.Reservation_Type == 1) updateStartEndDates();
                if (mainRecordInfo.Vehicles) updateVehicles();
                if (mainRecordInfo.Spots) updateSpots();
              }
            }}
          />
        }
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2 mt-6 mb-8">
        <InputButton
          text="Reservation Date"
          placeholderText={formatDateDTDDMMYYYY(
            mainRecordInfo.Reservation_Date
          )}
          disabled={true}
        />
        <DropDownSelect
          text="State"
          options={["Pending", "Approved"]}
          selectedOption={mainRecordInfo.State === 0 ? "Pending" : "Approved"}
          disabled={disabledElements}
          typeChange="State"
          onChangeFunction={changeRecordInfo}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2 my-7">
        <InputButton
          text="Type"
          placeholderText={
            mainRecordInfo.Reservation_Type == 0 ? "Picnic" : "Camping"
          }
          disabled={true}
        />
        <InputButton
          text="Method"
          placeholderText={
            mainRecordInfo.Reservation_Method == 0 ? "Online" : "In site"
          }
          disabled={true}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2">
        <InputButton
          text="Customer ID"
          type="ID"
          placeholderText={mainRecordInfo.ID}
          disabled={true}
          onChangeFunction={changeRecordInfo}
        />
        <InputButton
          text="Name"
          type="Name"
          placeholderText={mainRecordInfo.Name}
          disabled={disabledElements}
          onChangeFunction={changeRecordInfo}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2 mt-6">
        <InputButton
          text="Lastname 1"
          type="Lastname1"
          placeholderText={mainRecordInfo.LastName1}
          disabled={disabledElements}
          onChangeFunction={changeRecordInfo}
        />
        <InputButton
          text="Lastname 2"
          type="Lastname2"
          placeholderText={mainRecordInfo.LastName2}
          disabled={disabledElements}
          onChangeFunction={changeRecordInfo}
        />
      </div>
      <div className="mt-6">
        <InputButton
          text="Email"
          type="Email"
          placeholderText={mainRecordInfo.Email}
          disabled={disabledElements}
          onChangeFunction={changeRecordInfo}
        />
      </div>
      <div className="mt-6 mb-8">
        <InputButton
          text="Nationality"
          type="Country_Name"
          placeholderText={mainRecordInfo.Country_Name}
          disabled={disabledElements}
          onChangeFunction={changeRecordInfo}
        />
      </div>
      {mainRecordInfo.Reservation_Type === 1 ? (
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2 mb-8">
          <span className="">
            <DatePickerButton
              text="Start Date"
              typeClass="2"
              type="Start_Date"
              disabled={disabledElements}
              selectedDate={new Date(mainRecordInfo.Start_Date)}
              onChangeFunction={changeRecordInfo}
            />
          </span>
          <span className="mr-2">
            <DatePickerButton
              text="End Date"
              typeClass="2"
              type="End_Date"
              disabled={disabledElements}
              selectedDate={new Date(mainRecordInfo.End_Date)}
              onChangeFunction={changeRecordInfo}
            />
          </span>
        </div>
      ) : (
        <div></div>
      )}
      <label className="block text-xl font-semibold leading-6 text-gray-900">
        Tickets
      </label>
      <div className="grid grid-cols-1 mt-2">
        {mainRecordInfo.Tickets &&
          mainRecordInfo.Tickets.map((ticket, index) => (
            <div key={index} className="flex">
              <div className="bg-gray-100 w-[500px] rounded-sm my-2">
                <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-1 mb-2">
                  <div className="mt-1 mb-1.5 sm:-mb-4">
                    <InputButton
                      key={index}
                      placeholderText={formatTicket(ticket)}
                      disabled={true}
                    />
                  </div>
                  <div className="mt-1 mb-1.5 sm:mt-0">
                    <InputButton
                      key={index}
                      type={["tickets", "amount", index]}
                      placeholderText={ticket.Amount}
                      disabled={disabledElements}
                      onChangeFunction={changeRecordInfo}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {mainRecordInfo.Spots && mainRecordInfo.Spots.length != 0 ? (
        <label className="block text-xl font-semibold leading-6 text-gray-900 mt-5">
          Spots
        </label>
      ) : (
        <label className="block text-xl font-semibold leading-6 text-gray-900 mt-5"></label>
      )}
      <div className="grid grid-cols-2 mt-2 mb-3">
        {mainRecordInfo.Spots &&
          mainRecordInfo.Spots.map((spot, index) => (
            <span key={index} className="mx-1">
              <InputButton
                key={index}
                type={["spots", index]}
                placeholderText={spot.Location_Spot}
                disabled={disabledElements}
                onChangeFunction={changeRecordInfo}
              />
            </span>
          ))}
      </div>
      {mainRecordInfo.Reservation_Type === 0 ? (
        <label className="block text-xl font-semibold leading-6 text-gray-900">
          Services
        </label>
      ) : (
        <label className="block mt-7 text-xl font-semibold leading-6 text-gray-900">
          Services
        </label>
      )}
      {mainRecordInfo.Services &&
        mainRecordInfo.Services.map((service, index) => (
          <div key={index} className="flex">
            <div className="bg-gray-100 w-full rounded-sm my-2">
              <label className="block text-lg font-semibold ml-3 leading-6 mt-2 text-gray-900">
                {service.Name_Service}
              </label>
              <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-1 mb-2">
                <span className="mr-2 sm:mr-7">
                  <DatePickerButton
                    text=""
                    typeClass="2"
                    disabled={disabledElements}
                    type={["services", "date", index]}
                    selectedDate={new Date(service.Schedule)}
                    onChangeFunction={changeRecordInfo}
                  />
                </span>
                <div className="mt- sm:-mt-4">
                  <DropDownSelect
                    options={createHoursWithIntervals(8, 16, 30)}
                    selectedOption={getHoursMinutesFromISOFormat(
                      service.Schedule
                    )}
                    disabled={disabledElements}
                    typeChange={["services", "hour", index]}
                    onChangeFunction={changeRecordInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      <label className="block mt-7 text-xl font-semibold leading-6 text-gray-900">
        Vehicles
      </label>
      <ReservationListAddVehicles
        disabledElements={disabledElements}
        mainRecordInfo={mainRecordInfo}
        setMainRecordInfo={setMainRecordInfo}
      />
      <div className="grid grid-cols-2 mb-5">
        {mainRecordInfo.Vehicles &&
          mainRecordInfo.Vehicles.map((vehicle, index) => (
            <InputButton
              key={index}
              type={["vehicles", index]}
              placeholderText={vehicle}
              disabled={disabledElements}
              onChangeFunction={changeRecordInfo}
            />
          ))}
      </div>
    </Modal>
  );
};

export default ReservationListModal;