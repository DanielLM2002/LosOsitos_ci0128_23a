import { useState, useEffect, useContext } from "react";
import axiosClient from "./config/AxiosClient";
import AuthToken from "./config/AuthToken";
import {
  countryRoute,
  ticketPricesRoute,
  servicesPricesRoute,
  incomeReporteRoute,
  visitationReportRoute,
  campingCapacityRoute, 
  picnicCapacityRoute,
} from "./config/Routes";


export const getCountries = async () => {
  let result = [];
  try {
    await AuthToken(token);
    const { data } = await axiosClient.get(countryRoute);
    result = data;
  } catch (exception) {
    console.error(exception);
  }
  return result;
};

export const postCountries = async () => {
  try {
    await AuthToken(localStorage.getItem('auth-token'));
    await axiosClient.post(countryRoute, {
      Name: "Canada",
    });
  } catch (exception) {
    console.error(exception);
  }
};

export const getTicketPrices = async () => {
  let result = [];
  try {
    await AuthToken(localStorage.getItem('auth-token'));
    const { data } = await axiosClient.get(ticketPricesRoute);
    result = data;
  } catch (exception) {
    console.error(exception);
  }
  return result;
};

export const getKayakPrices = async () => {
  let result = [];
  try {
    await AuthToken(localStorage.getItem('auth-token'));
    const { data } = await axiosClient.get(servicesPricesRoute);
    result = data;
  } catch (exception) {
    console.error(exception);
  }
  return result;
};
export const getIncomeData = async (startDate, endDate) => {
  let result = [];
  const config = {method: "GET", responseType: "blob"};

  try {
    await AuthToken(localStorage.getItem('auth-token'));
    const { data } = await axiosClient.get(`${incomeReporteRoute}/${startDate}/${endDate}`, config);    
    result = data;
  } catch (exception) {
    console.error(exception);
  }
  return result;
}
export const getRemainingCapacity = async (date, reservationType) => {
  let result = [];
  try {
    const capacityRoute = reservationType == 0 ? picnicCapacityRoute : campingCapacityRoute;
    await AuthToken(localStorage.getItem('auth-token'));
    const { data } = await axiosClient.get(`${capacityRoute}/${date}`);

    result = data;
  } catch (exception) {
    console.error(exception);
  }
  return result;
};

export const getVisitationData = async (startDate, endDate) => {
  let result = [];
  let config = {method: "GET", responseType: "blob"};

  try {
    await AuthToken(localStorage.getItem('auth-token'));
    const { data } = await axiosClient.get(`${visitationReportRoute}/${startDate}/${endDate}`, config);
    result = data;
  } catch (exception) {
    console.error(exception);
  }

  return result;
};

// plantilla miedo
const getFromDB = async (route) => {
  let result = [];
  try {
    await AuthToken(localStorage.getItem('auth-token'));
    const { data } = await axiosClient.get(route);
    result = data;
  } catch (exception) {
    console.error(exception);
  }
  return result;
};
