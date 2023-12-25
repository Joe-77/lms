import { CircleLoader } from "react-spinners";
import { fetchVideoOfUser } from "../../dataUser/dataUser";
import Nav from "../nav/Nav";
import SideBar from "../sideBar/SideBar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context api/context";

const Dashboard = () => {
  const { search } = useContext(Context);
  const { data, isLoading, isError } = fetchVideoOfUser();
  const allData: any = data?.map(
    (e: any) => e._document.data.value.mapValue.fields
  );

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <Nav />
        <h2 className="px-2 sm:px-5 my-4 text-xl first-letter:capitalize">
          my learning
        </h2>
        {isLoading && (
          <span className="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <CircleLoader size={50} color="blue" />
          </span>
        )}
        {isError || allData?.length === 0 ? (
          <span className="block capitalize text-center my-20 text-red-500 italic text-2xl animate-pulse">
            no found data
          </span>
        ) : (
          <div className="px-2 sm:px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
            {allData !== undefined &&
              allData
                ?.filter((e: any) => {
                  return search.toLowerCase() === ""
                    ? e
                    : e.title?.mapValue.fields.stringValue.stringValue
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .map((e: any, id: number) => (
                  <Link
                    to={`/learning/${e?.title.mapValue.fields.stringValue.stringValue}}`}
                    state={e}
                    className="card bg-white shadow-lg py-3 rounded-md cursor-pointer"
                    key={id}
                  >
                    <img
                      className="w-full rounded-md"
                      src={e.logo?.mapValue?.fields?.stringValue?.stringValue}
                      alt=""
                    />
                    <p className="font-bold pt-2 px-2">
                      {e.title?.mapValue?.fields?.stringValue?.stringValue}
                    </p>
                    <p className="px-2 py-1 text-xs capitalize italic text-gray-400">
                      {e.category?.mapValue?.fields?.stringValue?.stringValue}
                    </p>
                    <div className="px-2 py-3 flex items-center justify-between gap-1">
                      <span
                        className={`${
                          e?.isCompleted.booleanValue
                            ? "bg-blue-500"
                            : "bg-slate-300"
                        }  w-10/12 h-1`}
                      ></span>

                      <span className="text-xs">
                        {e?.isCompleted.booleanValue ? "100%" : "0%"}
                      </span>
                    </div>
                  </Link>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
