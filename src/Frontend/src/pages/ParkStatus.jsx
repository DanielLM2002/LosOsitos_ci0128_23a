import Title from "../components/Title";
import NavMenu from "../components/NavMenu/NavMenu";
import Container from "../components/Containers/Container";
import BoxContainer from "../components/ParkStatus/BoxContainer";
import DatePickerButton from "../components/Buttons/DatePickerButton";
import authContext from "../context/auth/authContext";
import AuthToken from "../config/AuthToken";
import AxiosClient from "../config/AxiosClient";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import { useState, useEffect, useContext } from "react";

const ParkStatus = () => {
  const AuthContext = useContext(authContext);
  const { token } = AuthContext;
  const [statusData, setStatusData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const changeSelectedDate = (type, value) => {
    setSelectedDate(value);
  };

  const getStatusData = async () => {
    try {
      const url = "/Ocupation";
      await AuthToken(token);
      const res = await AxiosClient.post(url, {
        "dateReq": selectedDate,
      });
      setStatusData(res.data);
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    getStatusData();
  },[selectedDate]);

  

  return (
    <>
      <NavMenu />
      <Container>
        <Title name="Park Status" />
        <div className="block text-center">
          <DatePickerButton
          className="text-center"
          datacy="DatePicker-Park-Status"
          onChangeFunction={changeSelectedDate}
          selectedDate={selectedDate}
          ></DatePickerButton>
        </div>
        <div className="flex gap-4 flex-wrap place-content-center my-2">
          <BoxContainer>
            <span className="flex justify-center my-1">
              <BsIcons.BsPersonFill size={50} color="#21295c"/>
            </span> 
            <Title name="People" />
            <Title 
            datacy="Title-People-Amount"
            name={statusData.peopleInDate}/>
          </BoxContainer>
          <BoxContainer>
            <span className="flex justify-center my-1">
              <BsIcons.BsCarFrontFill size={50} color="#21295c"/>
            </span> 
            <Title name="Vehicles" />
            <Title name={statusData.vehiclesInDate}/>
          </BoxContainer>
          <BoxContainer>
            <span className="flex justify-center my-1">
              <GiIcons.GiCampingTent size={50} color="#21295c"/>
            </span> 
            <Title name="Camping" />
            <Title name={statusData.peopleInDateCamping}/>
          </BoxContainer>
          <BoxContainer>
            <span className="flex justify-center my-1">
              <RiIcons.RiShoppingBasketFill size={50} color="#21295c"/>
            </span> 
           <Title name="Picnic" />
            <Title name={statusData.peopleInDatePicnic}/>
          </BoxContainer>
          <BoxContainer>
            <span className="flex justify-center my-1">
              <MdIcons.MdPark size={50} color="#21295c"/>
            </span> 
           <Title name="People In Park" />
            <Title name={statusData.PeopleInPark}/>
          </BoxContainer>
        </div>
      </Container>
    </>
  );
};

export default ParkStatus;
