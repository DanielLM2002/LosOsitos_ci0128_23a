import { getConnection, sql } from "../config/db.js";

// Method that inserts a reservation
const insertReservation = async (req, res) => {
  try {
    const {
      ID_Client,
      Reservation_Date,
      Payment_Method,
      State,
      Payment_Prof
    } = req.body;
    const pool = await getConnection();
    await pool.query(
      `INSERT INTO Reservation VALUES (${ID_Client}, '${Reservation_Date}', ${Payment_Method}, ${State}, '${Payment_Prof}')`
    );
    res.status(200);
    res.send('The insert to the Reservation was successful');
    console.log("The insert to the Reservation was successful");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export { insertReservation };