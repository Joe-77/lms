import { useContext } from "react";
import {
  MdAccountBalance,
  MdComputer,
  MdLinkedCamera,
} from "react-icons/md";
import { Context } from "../../context api/context";
import { RiMiniProgramFill } from "react-icons/ri";


const Filter = () => {
  let switchLi = document.querySelectorAll(".switch li");

  switchLi.forEach((li) => {
    li.addEventListener("click", removeActiveClass);
  });

  function removeActiveClass(this: HTMLLIElement) {
    switchLi.forEach((li) => {
      li.classList.remove("activeLi");
      this.classList.add("activeLi");
    });
  }


  const { setCategory } = useContext(Context);

  return (
    <ul className="px-2 sm:pl-5 my-7 flex items-center flex-wrap gap-4 switch">
      <li
        onClick={() => setCategory("accounting")}
        className="flex items-center gap-1 text-sm md:text-lg text-orange-500 bg-white shadow-md duration-500 hover:shadow-gray-500 w-fit py-1 px-2 rounded-md cursor-pointer select-none"
      >
        <MdAccountBalance />
        <p className="capitalize text-black">accounting</p>
      </li>
      <li
        onClick={() => setCategory("computer")}
        className="flex items-center gap-1 text-sm md:text-lg text-black bg-white shadow-md duration-500 hover:shadow-gray-500 w-fit py-1 px-2 rounded-md cursor-pointer select-none"
      >
        <MdComputer />
        <p className="capitalize text-black">computer science</p>
      </li>
      <li
        onClick={() => setCategory("programming")}
        className="flex items-center gap-1 text-sm md:text-lg text-orange-500 bg-white shadow-md duration-500 hover:shadow-gray-500 w-fit py-1 px-2 rounded-md cursor-pointer select-none"
      >
        <RiMiniProgramFill />
        <p className="capitalize text-black">Programming</p>
      </li>
      <li
        onClick={() => setCategory("photography")}
        className="flex items-center gap-1 text-sm md:text-lg text-blue-500 bg-white shadow-md duration-500 hover:shadow-gray-500 w-fit py-1 px-2 rounded-md cursor-pointer select-none"
      >
        <MdLinkedCamera />
        <p className="capitalize text-black">photography</p>
      </li>
    </ul>
  );
};

export default Filter;
