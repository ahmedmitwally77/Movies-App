/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import image from "../../assets/images/img.jpg";
import "./ActorDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getActorDetails } from "@/components/customized/Controller/APIController/ActorDetailsHandler";
import { PacmanLoader } from "react-spinners";
export default function ActorDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Access query string
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [loadingme, setloadingme] = useState(true);

  const load = async () => {
    setloadingme(true);
    let response = await getActorDetails(queryParams.get("person"));
    setResult(response);
    setloadingme(false);
  };
  const GoToMedia = () => {
    navigate(
      "/result/" +
        "person" +
        "/?" +
        "person=" +
        result.id +
        "&name=" +
        result.name
    );
  };
  useEffect(() => {
    load();
  }, []);
  const s1 = () => {
    return result === null ? { display: "" } : {};
  };
  const s2 = () => {
    return result !== null ? { display: "none" } : {};
  };
  return (
    <>
      {!loadingme ? (<div className="ActorDetails  rounded-2xl overflow-hidden pb-20" style={s1()}>
        <div className="BackGroundImage flex justify-center overflow-hidden" style={{}}>
          <img
            src={
              result && "https://image.tmdb.org/t/p/w780/" + result.profile_path
            }
            alt={result && result.name}
            
          />
          <div className="ActorContent">
            <div className="Left">
              <div className="leftContainer">
                <img
                  src={
                    result &&
                    "https://image.tmdb.org/t/p/w500/" + result.profile_path
                  }
                  alt=""
                  className="rounded-full"
                />
                
              </div>
            </div>
            <div className="Right">
              <div className="rightContainer">
                <h3 className="name text-5xl font-bold">{result && result.name}</h3>
                <p className="my-4 pb-20">{result && result.biography}</p>
                <div className="personDetails">
                  <span className="!text-md">BirthDate: {result && result.birthday}</span>
                  <span className="!text-md">Country: {result && result.place_of_birth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button">
          <button onClick={GoToMedia} className="hover:!bg-[#211E42] p-3 hover:text-white transition-all duration-500  bg-white text-[#211E42] border rounded-full">Show Media</button>
        </div>
      </div>) : (<div className="loading bg-red-500 vh-100">
        <PacmanLoader color="#44406f" size={45} />
      </div>)}
      <div className="WrongActorPage" style={s2()}>
        <h1>You Have requested wrong Actor/Actress Details &#128546;</h1>
      </div>
    </>
  );
}
