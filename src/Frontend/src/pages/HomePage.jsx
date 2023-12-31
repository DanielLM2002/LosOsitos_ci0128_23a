import { useState } from "react";
import Footer from "../components/Footer/Footer";
import NavMenu from "../components/NavMenu/NavMenu";
import Container from "../components/Containers/Container";
import playaDev from "../assets/images/wallpaper.jpg";
import Button from "../components/Buttons/Button";
import {Link} from "react-router-dom"

const HomePage = () => {
  return (
    <>
      <NavMenu />
      <div className="w-full h-screen relative">
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        <img className="float-left h-full w-full blur-xs" src={playaDev} />
        <div className="relative h-screen">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full text-center text-white">
              <h1 className="text-6xl font-semi-bold mb-3">ASO JUNQUILLAL</h1>
              <p className="text-3xl font-demi-bold mb-3">An unforgetable experience </p>
              <p className="text-2xl font-demi-bold mb-2">
                Welcome to the best place to relax and enjoy the nature
              </p>
              <div className="mx-60% flex justify-center space-x-10">
                <Link to="/reservation" className="bg-white bg-opacity-50 text-black font-semi-bold py-4 px-12 rounded-full hover:bg-gray-300 transition-colors duration-300">
                  Book now
                </Link>
                <Link to="/contact-us" className="bg-white bg-opacity-50 text-black font-semi-bold py-4 px-12 rounded-full hover:bg-gray-300 transition-colors duration-300">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
