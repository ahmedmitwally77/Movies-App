/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";

// import imageNotFound from "./public/images/notfound.jpeg"
export default function NotFound() {
  return (
    <div className="not-found pt-12 md:mt-0 min-h-[78.5vh] p-8 bg-gray-100">
      <div className="flex flex-wrap w-full  lg:w-1/2 mx-auto h-full items-center justify-center">
        <div className="image md:w-1/4">
          <img className="w-full" src="https://lumiere-a.akamaihd.net/v1/images/error-500_aa3dde6a.png?region=0%2C0%2C164%2C228" alt="not found image " />
        </div>
        <div className="text text-black w-full lg:w-3/4 md:pl-8 pt-8">
          <h3 className="md:text-6xl text-4xl font-bold mb-8">Oops! Page Not Found.</h3>
          <p className="md:text-2xl text-xl text-gray-600">You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for.</p>
        </div>
        <Link to="/" ><button className="btn px-4 py-2 btn-primary">Go Back</button></Link>
      </div>
    </div>
  )
}
