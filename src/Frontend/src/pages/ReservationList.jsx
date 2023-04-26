import { useEffect, useState } from "react";

import Title from "../components/Title";
import Modal from "../components/Modal";
import Table from "../components/Table/Table";
import Container from "../components/Container";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import NavMenu from "../components/NavMenu/NavMenu";
import TableItem from "../components/Table/TableItem";
import InputButton from "../components/Buttons/InputButton";
import DropDownSelect from "../components/Buttons/DropDownSelect";

import AvailabilityTestData from "../data/ReservationTestData";

const ReservationList = () => {
  // State that controls the popup window
  const [viewModal, setViewModal] = useState(false);
  // State that constrols the modal information
  const [recordInfo, setRecordInfo] = useState({});
  // State that constrols the modify button in the popup
  const [modifyButton, setModifyButton] = useState("Modify");
  // State that controls the elements availability in the popup
  const [disabledElements, setDisabledElements] = useState(true);
  // Table column
  const tableColumns = [
    "Id",
    "Customer",
    "Reservation date",
    "Start date",
    "End date",
    "Services",
    "Pay",
    "",
    "",
  ];

  // Method that puts the element in its initial state
  const restartModal = () => {
    setViewModal(false);
    setDisabledElements(true);
    setModifyButton("Modify");
  };

  // Method that shows the information of a row in the popup
  const setModalDataStatus = (itemID) => {
    const itemSelected = AvailabilityTestData.filter(
      (item) => item.reservationId == itemID
    );
    setRecordInfo(itemSelected[0]);
    setViewModal(true);
  };

  // Method that handles what happen when the modify button is clicked
  const modifyHandleClick = () => {
    setDisabledElements(!disabledElements);
    modifyButton === "Modify"
      ? setModifyButton("Save changes")
      : setModifyButton("Modify");
  }

  // Method that gets the names of the services of a row
  const getServicesNames = (services) => {
    return services.map((service) => service.name);
  };

  return (
    <>
      <NavMenu />
      <Container>
        {/* Modal elements */}
        <Modal
          state={viewModal}
          setState={restartModal}
          title="Reservation Data"
        >
          <div className="my-3">
            {
              <Button
                text={modifyButton}
                onclickFunction={modifyHandleClick}
              />
            }
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2">
            <InputButton
              text="Reservation ID"
              placeholderText={recordInfo.reservationId}
              disabled={true}
            />
            <InputButton
              text="Costumer ID"
              placeholderText={recordInfo.customerId}
              disabled={disabledElements}
            />
          </div>
          <InputButton
            text="Name"
            placeholderText={recordInfo.customer}
            disabled={disabledElements}
          />
          <InputButton
            text="Nationality"
            placeholderText={recordInfo.nationality}
            disabled={disabledElements}
          />
          <InputButton
            text="Reservation Date"
            placeholderText={recordInfo.reservationDate}
            disabled={disabledElements}
          />
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2 mb-2">
            <InputButton
              text="Start Date"
              placeholderText={recordInfo.startDate}
              disabled={disabledElements}
            />
            <InputButton
              text="End Date"
              placeholderText={recordInfo.endDate}
              disabled={disabledElements}
            />
          </div>
          <label className="block text-xl font-semibold leading-6 text-gray-900">
            People ({recordInfo.peopleQuantity})
          </label>

          <div className="grid grid-cols-2 mt-2 mb-3">
            {recordInfo.peopleType &&
              recordInfo.peopleType.map((person, index) => (
                <span key={index} className="mx-1">
                  <DropDownSelect
                    disabled={disabledElements}
                    options={[
                      "Foreign, Adult",
                      "Foreign, Child",
                      "National, Adult",
                      "National, Child",
                      "Special Visitor",
                    ]}
                  />
                </span>
              ))}
          </div>
          <label className="block text-xl font-semibold leading-6 text-gray-900">
            Services
          </label>
          {recordInfo.services &&
            recordInfo.services.map((service, index) => (
              <div key={index} className="flex">
                <div className="bg-gray-100 w-full rounded-sm my-2">
                <label className="block text-lg font-semibold ml-3 leading-6 mt-2 text-gray-900">
                  {service.name}
                </label>
                <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-1 mb-2">
                  <InputButton
                    text=""
                    placeholderText={service.date}
                    disabled={disabledElements}
                  />
                  <DropDownSelect
                    disabled={disabledElements}
                    options={[
                      service.hour,
                      "10:30",
                      "11:30",
                      "12:30",
                      "13:30",
                    ]}
                  />
                </div>
                </div>
              </div>
            ))}
          <label className="block text-xl font-semibold leading-6 text-gray-900">
            Plate Numbers
          </label>
          <div className="grid grid-cols-2 mb-3">
            {recordInfo.services &&
              recordInfo.plateNumbers.map((plateNumber, index) => (
                <InputButton
                  key={index}
                  placeholderText={plateNumber}
                  disabled={disabledElements}
                />
              ))}
          </div>
          <InputButton
            text="Total price"
            placeholderText={recordInfo.totalPrice}
            disabled={disabledElements}
          />
        </Modal>

        {/* Table elements */}
        <Title name="Reservation List" />
        <Table colums={tableColumns}>
          {AvailabilityTestData.map((record, index) => (
            <TableItem
              key={index}
              number={index}
              data={[
                record.customerId,
                record.customer,
                record.reservationDate,
                record.startDate,
                record.endDate,
                getServicesNames(record.services),
                record.totalPrice,
                <Button
                  text="View"
                  onclickFunction={(e) =>
                    setModalDataStatus(record.reservationId)
                  }
                />,
              ]}
            />
          ))}
        </Table>
      </Container>
      <Footer />
    </>
  );
};

export default ReservationList;
