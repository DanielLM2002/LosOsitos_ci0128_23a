import { Router } from "express";
import { 
  getReservations,
  getRecordsServices,
  getServicesOptions,
  getAllSpots,
  getAllVehicles,
  getAllTickets,
  getAllServices,
  updatePersonData,
  updateStartEndDates,
  getVehiclesByReservationID,
  updateVehicle,
  getSpotsByReservationID,
  updateSpot,
  getTicketsByReservationID,
  updateTicket,
  getServicesByReservationID,
  updateService,
  getStateByReservationID,
  updateState,
  insertNewVehicle
 } from "../models/reservationListModel.js";

const router = Router();

router.get("/getAllRecords", getReservations);
router.get("/getServicesOptions", getServicesOptions);
router.get("/getRecordsServices", getRecordsServices);
router.get("/getAllSpots", getAllSpots);
router.get("/getAllVehicles", getAllVehicles);
router.get("/getAllTickets", getAllTickets);
router.get("/getAllServices", getAllServices);
router.get("/getVehiclesByReservationID/:ID/:Reservation_Date", getVehiclesByReservationID);
router.get("/getSpotsByReservationID/:ID/:Reservation_Date", getSpotsByReservationID);
router.get("/getTicketsByReservationID/:ID/:Reservation_Date", getTicketsByReservationID);
router.get("/getServicesByReservationID/:ID/:Reservation_Date", getServicesByReservationID);
router.get("/getStateByReservationID/:ID/:Reservation_Date", getStateByReservationID);
router.post("/insertVehicle", insertNewVehicle);
router.put("/updatePersonData", updatePersonData);
router.put("/updateStartEndDates", updateStartEndDates);
router.put("/updateVehicle", updateVehicle);
router.put("/updateSpot", updateSpot);
router.put("/updateTicket", updateTicket);
router.put("/updateService", updateService);
router.put("/updateState", updateState);

export default router;