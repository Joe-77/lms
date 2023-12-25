import ReactPlayer from "react-player";
import Nav from "../nav/Nav";
import SideBar from "../sideBar/SideBar";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context api/context";
import { queryAllData } from "../../data/getAllData";

const Video = () => {
  const { handleCompletedVideo, done } = useContext(Context);

  const location = useLocation().state;
  const category = location?.category?.stringValue;
  const { data } = queryAllData();
  const allData = data?.map((e: any) => e._document.data.value.mapValue.fields);
  const filterData = allData?.filter(
    (e: any) =>
      e?.category?.stringValue === category &&
      e?.id?.integerValue !== location?.id?.integerValue
  );


  const completedVideo = () => {
    handleCompletedVideo(location);
  };

  // console.log(location)

  return (
    <div className="min-h-screen flex w-full">
      <SideBar />
      <div className="w-full">
        <Nav />
        <div className="mx-5 lg:mx-0 lg:ml-5 flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-1/2 my-5">
            <ReactPlayer
              width={"full"}
              onPlay={() => done(location)}
              onEnded={completedVideo}
              controls
              url={location.video.stringValue}
            />
            <div className="my-8">
              <span className="text-xl font-bold italic relative">
                Description{" "}
                <span className=" absolute w-1/3 h-[1px] bg-gray-400 bottom-0 left-0"></span>
              </span>
              <p className="my-3 text-sm leading-6">
                {location?.description.stringValue}
              </p>
            </div>
          </div>
          <div className="lg:h-[90vh] mr-1 bg-white shadow-xl shadow-gray-400 lg:w-60 overflow-y-auto scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-neutral-600">
            <h2 className="px-2 pt-5 text-xl italic font-bold font-mono">
              Overview
            </h2>
            {filterData?.map((e, id) => (
              <Link
                className="mt-5 block"
                key={id}
                state={e}
                to={`/video/${e?.title.stringValue}`}
              >
                <img className="w-full" src={e.logo.stringValue} alt="" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
