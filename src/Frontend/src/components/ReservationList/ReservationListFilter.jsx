import { useState } from "react";
import InputButton from "../Buttons/InputButton";
import DropDownSelect from "../Buttons/DropDownSelect";
import FiltersContainer from "../Containers/FiltersContainer";

const ReservationListFilter = ({ reservationData, setReservationRecords }) => {
  // State that controls the filters that there are apply
  const [filters, setFilters] = useState({
    type: null,
    method: null,
    service: null,
    customerId: null,
  });

  // Method that changes the filters that will be applied
  const changeFiltersState = (type, value) => {
    const updatedFilters = { ...filters };
    if (type === "type") {
      value !== ""
        ? (updatedFilters.type = value)
        : (updatedFilters.type = null);
    } else if (type === "method") {
      value !== ""
        ? (updatedFilters.method = value)
        : (updatedFilters.method = null);
    } else if (type === "service") {
      value !== ""
        ? (updatedFilters.service = value)
        : (updatedFilters.service = null);
    } else if (type === "customerId") {
      value !== ""
        ? (updatedFilters.customerId = value)
        : (updatedFilters.customerId = null);
    }
    setFilters(updatedFilters);
  };

  // Method that returns an intersection between two filters
  const intersection = (filter1, filter2) => {
    return filter1.reduce((acc, curr) => {
      const match = filter2.find(
        (record) => record.reservationId == curr.reservationId
      );
      if (match) acc.push(curr);
      return acc;
    }, []);
  };

  // Method that applys the filters
  const applyFilters = (filter) => {
    const typeFilterResults =
      filters.type !== null
        ? reservationData.filter((record) => record.type === filters.type)
        : reservationData;
    const methodFilterResults =
      filters.method !== null
        ? reservationData.filter((record) => record.method === filters.method)
        : reservationData;

    const customerIdFilterResults =
      filters.customerId !== null
        ? reservationData.filter(
            (record) => record.customerId == filters.customerId
          )
        : reservationData;

    const serviceFilterResults =
      filters.service !== null
        ? reservationData.filter((record) =>
            record.services.some((service) => service.name === filters.service)
          )
        : reservationData;

    const intersectionTM = intersection(typeFilterResults, methodFilterResults);
    const intersectionTMS = intersection(intersectionTM, serviceFilterResults);
    const intersectionTMSR = intersection(
      intersectionTMS,
      customerIdFilterResults
    );

    setReservationRecords(intersectionTMSR);
  };
  return (
    <>
      <FiltersContainer applyFunction={applyFilters}>
        <span className="sm:mr-3">
          <DropDownSelect
            text="Type"
            disabled={false}
            options={["", "Picnic", "Camping"]}
            typeChange="type"
            onChangeFunction={changeFiltersState}
          />
        </span>
        <span className="mx-4 sm:mx-0 sm:ml-3">
          <DropDownSelect
            text="Method"
            disabled={false}
            options={["", "Online", "In site"]}
            typeChange="method"
            onChangeFunction={changeFiltersState}
          />
        </span>
        <span className="sm:mt-6 sm:mr-3">
          <DropDownSelect
            text="Service"
            disabled={false}
            options={["", "Kayak", "Bicycle"]}
            typeChange="service"
            onChangeFunction={changeFiltersState}
          />
        </span>
        <span className="sm:mt-2 sm:ml-3">
          <InputButton text="Start Date" />
        </span>
        <span className="mx-4 sm:mx-0 sm:mr-3">
          <InputButton text="End Date" />
        </span>
        <span className="sm:ml-3">
          <InputButton
            type="customerId"
            text="Costumer Id"
            onChangeFunction={changeFiltersState}
          />
        </span>
      </FiltersContainer>
    </>
  );
};

export default ReservationListFilter;
