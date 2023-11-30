import React, { useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Header, Sidebar } from '../components/index.js';
import { Outlet } from 'react-router-dom';

function Home() {
  const closeRef = useRef();
  const openMenu = () => {
    const menu = document.getElementById('menu');
    const header = document.getElementById('header');
    header.classList.add('hidden');
    menu.classList.remove('hidden');
  };
  const closeMenu = () => {
    const menu = document.getElementById('menu');
    const header = document.getElementById('header');
    header.classList.remove('hidden');
    menu.classList.add('hidden');
  };
  return (
    <div className="flex flex-wrap min-h-screen max-w-[100vw]">
      <div className="w-full block">
        <div className="grid md:grid-cols-12 grid-cols-1">
          <div className="hidden md:flex md:col-span-3 md:col-start-1 min-h-screen bg-[#14131a] w-full justify-center text-white">
            <Sidebar />
          </div>
          <div
            className="md:hidden flex justify-between items-center col-span-1 col-start-1 bg-[#14131a] text-gray-100 sticky top-0 z-50 px-4 py-2"
            id="header"
          >
            <h1>tweeter</h1>
            <button className="" onClick={openMenu}>
              <Menu />
            </button>
          </div>
          <div
            className="md:hidden hidden min-h-screen bg-[#14131a] text-gray-200 w-full px-8 py-8"
            id="menu"
          >
            <div className="relative float-right mb-4">
              <button
                ref={closeRef}
                onClick={closeMenu}
                className="cursor-pointer"
              >
                <X />
              </button>
            </div>
            <div className="flex flex-col justify-center w-full mx-auto text-center  space-y-4">
              <Header close={closeMenu} />
            </div>
          </div>
          <div className="md:flex md:col-span-9 md:col-start-4 col-span-1 col-start-1 h-[100vh] overflow-y-scroll py-8 w-full justify-center px-[8px] bg-[#1c1b23]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
