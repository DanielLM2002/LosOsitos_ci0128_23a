import { isDateAfterISO8601, getDateRange } from "../helpers/formatDate.js";
import AxiosClient from "../config/AxiosClient";

const useValidations = (reservation) => {
  
  // Method that validates the remaining capacity
  const getRemainingCapacity = async (date) => {
    let result = [];
    try {
      const capacityRoute = reservation.Reservation_Type == 0 ? "/getPicnicCapacity" : "/getCampingCapacity";
      const { data } = await AxiosClient.get(`${capacityRoute}/${date}`);
      result = data;
    } catch (exception) {
      console.error(exception);
    }
    return result;
  }

  // Method that validates the capacity for camping reservation
  const validateCapacityForCamping = async () => {
    let result = true;
    let persons = 0;
    const days = getDateRange(reservation.Start_Date, reservation.End_Date);
    await Promise.all(
      days.map(async (day) => {
        const capacities = await getRemainingCapacity(day);
        const onlineCapacicty = capacities[0].Remaining_Capacity;
        const insiteCapacity = capacities[1].Remaining_Capacity;
        if (reservation.NewTickets) {
          reservation.NewTickets.map((ticket) => persons += parseInt(ticket.Amount));
        }
        if (reservation.Reservation_Method === 0) {
          if (onlineCapacicty < persons) {
            result = false;
          }
        } else {
          if (insiteCapacity < persons) {
            result = false;
          }
        }
        console.log(persons);
        persons = 0;
      }
    ));
    return result;
  };

  // Method that validates the capacity for picnic reservation
  const validateCapacityForPicnic = async () => {
    let result = false;
    let persons = 0;
    const capacities = await getRemainingCapacity(reservation.Picnic_Date);
    const onlineCapcicty = capacities[0].Remaining_Capacity;
    const insiteCapacity = capacities[1].Remaining_Capacity;

    if (reservation.NewTickets) {
      reservation.NewTickets.map((ticket) => persons += parseInt(ticket.Amount));
    }

    if (reservation.Reservation_Method === 0) {
      if (onlineCapcicty >= persons) {
        result = true;
      }
    } else {
      if (insiteCapacity >= persons) {
        result = true;
      }
    }
    return result;
  };

  // Method that validates the capacity for picnic reservation
  const validateCapacity = async () => {
    let result = false;
    if (reservation.Reservation_Type === 0) {
      console.log("Picnic");
      result = await validateCapacityForPicnic();
    } else {
      console.log("Camping");
      result = await validateCapacityForCamping();
    }
    console.log(result);
    return result;
  };

  // Method that validates the personal data
  const validatePersonalData = () => {
    let result = false;
    if (
      reservation.ID !== "" &&
      reservation.Name !== "" &&
      reservation.LastName1 !== "" &&
      reservation.LastName2 !== "" &&
      reservation.Birth_Date !== "" &&
      reservation.Email !== "" &&
      reservation.Gender !== "" &&
      reservation.Country_Name !== ""
    ) {
      result = true;
      console.log("Personal data");
    }
    return result;
  };
  
  // Method that validates dates
  const validateDates = () => {
    let result = false;
    if (reservation.Reservation_Type === 0) {
      if (reservation.Picnic_Date !== "") {
        result = true;
        console.log("Dates");
      }
    } else {
      if (
        reservation.Start_Date !== "" &&
        reservation.End_Date !== "" &&
        isDateAfterISO8601(reservation.Start_Date, reservation.End_Date)
      ) {
        result = true;
        console.log("Dates");
      }
    }
    return result;
  };
  
  // Method that validates new tickets
  const validateNewTickets = () => {
    let result = false;
    reservation.NewTickets.map((ticket) => {
      if (
        ticket.Amount !== "" &&
        parseInt(ticket.Amount) !== 0
      ) {
        result = true;
      }
    });
    if (reservation.Tickets && reservation.NewTickets.length === 0) {
      result = true;
    }
    return result;
  };
  
  // Method that validates tickets
  const validateTickets = () => {
    let result = false;
    reservation.Tickets.map((ticket) => {
      if (
        ticket.Amount !== "" &&
        parseInt(ticket.Amount) !== 0
        ) {
        result = true;
        console.log("Ticket");
      }
    });
    return result;
  };
  
  // Method that validates new services
  const validateNewServices = () => {
    let result = true;
    if (reservation.NewServices.length !== 0) {
      reservation.NewServices.map((service) => {
        if (
          service.Quantity === "" ||
          parseInt(service.Quantity) === 0
        ) {
          result = false;
          console.log("No Services");
        }
      });
    }
    return result;
  };
  
  // Method that validates services
  const validateServices = () => {
    let result = true;
    if (reservation.Services) {
      reservation.Services.map((service) => {
        if (
          service.Quantity === "" ||
          parseInt(service.Quantity) === 0
        ) {
          result = false;
          console.log("No service");
        }
      });
    }
    return result;
  };
  
  // Method that validates the spots
  const validateNewSpots = () => {
    let result = true;
    if (reservation.Reservation_Type === 1) {
      if (reservation.NewSpots.length === 0) {
        console.log("No spots");
        result = false;
      }
    }
    return result;
  };
  
  // Method that validates new reservation
  const validateInsertReservation = () => {
    let result = false;
    if (
      validatePersonalData() &&
      validateDates() &&
      validateNewTickets() &&
      validateNewSpots() &&
      validateNewServices()
    ) {
      result = true;
    }
    return result;
  };
  
  // Method that validates new reservation
  const validateUpdateReservation = () => {
    let result = false;
    if (
      validatePersonalData() &&
      validateDates() &&
      validateNewTickets() &&
      validateNewServices() &&
      validateTickets() &&
      validateServices()
      ) {
      result = true;
    }
    return result;
  };
  
  return {
    validatePersonalData,
    validateCapacity,
    validateInsertReservation,
    validateUpdateReservation
  };
}

export default useValidations;
