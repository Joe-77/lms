import Filter from "../filters/Filter";
import Nav from "../nav/Nav";
import SideBar from "../sideBar/SideBar";
import { useContext } from "react";
import { Context } from "../../context api/context";
import { Link } from "react-router-dom";
import { queryAllData } from "../../data/getAllData";
import { CircleLoader } from "react-spinners";

const Home = () => {
  const { data, isLoading, isError }: any = queryAllData();
  const { search, category } = useContext(Context);
  const allData = data?.map((e: any) => e._document.data.value.mapValue.fields);

  return (
    <div className="min-h-screen flex w-full">
      <SideBar />
      <div className="w-full">
        <Nav />
        <Filter />
        {isLoading && (
          <span className="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <CircleLoader size={50} color="blue" />
          </span>
        )}
        {isError ? (
          <span className="block capitalize text-center my-20 text-red-500 italic text-2xl animate-pulse">
            no found data
          </span>
        ) : (
          <div className="px-2 sm:px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
            {allData
              ?.filter((e: any) => {
                return search.toLowerCase() === ""
                  ? e
                  : e?.title.stringValue
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .filter((item: any) => {
                return category === ""
                  ? item
                  : item.category.stringValue === category;
              })
              .map((e: any, id: number) => (
                <Link
                  to={`/video/${e.title.stringValue}`}
                  state={e}
                  className="card bg-white shadow-lg py-3 rounded-md cursor-pointer"
                  key={id}
                >
                  <img
                    className="w-full rounded-md"
                    src={e.logo.stringValue}
                    alt=""
                  />
                  <p className="font-bold pt-2 px-2">{e.title.stringValue}</p>
                  <p className="px-2 py-1 text-xs capitalize italic text-gray-400">
                    {e.category.stringValue}
                  </p>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
