import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "../firbase/firebaseConfig";

export const queryAllData = () => {
  const getAllData = async () => {
    const querySnapshot = await getDocs(collection(db, "allData"));

    const data = querySnapshot?.docs.map((item) => ({ ...item, id: item.id }));

    return data;
  };

  return useQuery({
    queryKey: ["allData"],
    queryFn: getAllData,
  });
};


