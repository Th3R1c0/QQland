import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { database } from '../firebase.js';
import { ref, set, onValue, runTransaction } from 'firebase/database';
import { useState, useEffect } from 'react';
import React from 'react';

const MainApp = () => {
  const [pinkcount, setPinkCount] = useState(0);
  const [bluecount, setBlueCount] = useState(0);
  const [canClick, setCanClick] = useState(true);
  const [voted, didVote] = useState(false);
  const pinkRef = ref(database, '/pink');
  const blueRef = ref(database, '/blue');
  useEffect(() => {
    onValue(blueRef, (snapshot) => {
      const data = snapshot.val();
      setBlueCount(data);
    });
    onValue(pinkRef, (snapshot) => {
      const data = snapshot.val();
      setPinkCount(data);
    });
  }, []);
  const vote = (color: string) => {
    didVote(true);
    runTransaction(ref(database, '/' + color), (count) => {
      count++;
      return count;
    });
    const delaybtn = () => {
      setCanClick(false);
      setTimeout(() => {
        setCanClick(true);
      }, 3000);
    };
    delaybtn();
  };

  return (
    <div className="w-screen h-full items-center align-center flex flex-col">
      <div className="w-screen h-1/3 flex justify-center items-center bg-red-50">
        <h1 className=" w-max p-10 border-black border-b-2 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-red-600">
          vote for the future
        </h1>
      </div>
      <div className="flex items-center align-center justify-center content-center w-screen bg-red-100">
        <div className="flex flex-col w-1/2 items-center">
          <h1 className="m-2 w-max text-transparent font-bold text-3xl bg-clip-text bg-gradient-to-br from-purple-500 to-red-600">
            Team pink
          </h1>
          <div>
            <button
              disabled={!canClick}
              onClick={() => vote('pink')}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium   text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                vote for pink
              </span>
            </button>
          </div>
          <div className="w-full h-full bg-red-200 flex flex-col justify-center items-center">
            <p className="font-semibold text-md p-2">Total votes: </p>
            <h1 className="m-2 w-max text-transparent font-bold text-6xl bg-clip-text bg-gradient-to-br from-purple-500 to-red-600">
              {pinkcount}
            </h1>
          </div>
        </div>

        <div className="flex flex-col w-1/2 items-center">
          <h1 className=" m-2 w-max text-transparent font-bold text-3xl bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-500">
            Team Blue
          </h1>
          <div>
            <button
              disabled={!canClick}
              onClick={() => vote('blue')}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                vote for blue
              </span>
            </button>
          </div>
          <div className="w-full h-full bg-red-200 flex flex-col justify-center items-center">
            <p className="font-semibold text-md p-2">Total votes:</p>
            <h1 className="m-2 w-max text-transparent font-bold text-6xl bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-500">
              {bluecount}
            </h1>
          </div>
        </div>
      </div>
      <Stats stat={pinkcount + bluecount} voted={voted} canClick={canClick} />
    </div>
  );
};

const Stats = (props) => {
  return (
    <div className="w-screen flex-1 flex flex-col justify-between items-center bg-red-100">
      <p>
        {props.voted && !props.canClick
          ? 'wait 3 seconds to vote again'
          : 'make your vote'}
      </p>
      <p>
        {' '}
        - total people voted: <b>{props.stat} </b>-{' '}
      </p>
    </div>
  );
};

const Navbar = () => {
  return (
    <div>
      <div className="bg-red-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              QQland
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              random button
            </button>
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-4"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  servers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="">
      <footer className="p-4 bg-red-50 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{' '}
          <a href="https://flowbite.com" className="hover:underline">
            Goofy ahhhh productions™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 ">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>QQland</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-between h-screen w-screen">
        <Navbar />
        <MainApp />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
