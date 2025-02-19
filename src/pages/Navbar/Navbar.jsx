import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import icon from "../../assets/download-removebg-preview.png";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Search", to: "/result" },
  { name: "Actors", to: "result/people" },
  { name: "Upcoming", to: "result/upcoming" },
  { name: "Favorites", to: "FavoritePage" },
];

// eslint-disable-next-line react/prop-types, no-unused-vars
const Navbar = ({ searchBox }) => {
  return (
    <>
      <Disclosure as="nav" className="bg-[#211E42] p-1 pt-2 pb-10 relative">
        <div className="mx-auto container max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
          
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <div className="flex flex-shrink-0 items-center">
                <img alt="Your Company" src={icon} className="h-9 w-auto" />
              </div>
              <div className="hidden sm:ml-6 sm:block mt-1">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="text-gray-300 hover:bg-gray-700 transition-all duration-300 hover:text-white rounded-md px-3 py-2 text-md font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <h2 className="text-white text-center mt-3 md:text-[36px] text-[24px] font-semibold pb-2">
          Find Movies, TV shows and more
        </h2>
        
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
};

export default Navbar;
