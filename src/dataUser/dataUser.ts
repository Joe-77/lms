import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "../firbase/firebaseConfig";
import { getUserData } from "../auth/auth";

export const fetchVideoOfUser = () => {
  const userId = getUserData().data?.id;

  const getDataOfUser = async () => {
    const querySnapshot = await getDocs(collection(db, userId));
    const data = querySnapshot?.docs.map((item) => ({
      ...item,
      id: item.id,
    }));

    return data;
  };

  return useQuery({
    queryKey: ["fetchVideoOfUser"],
    queryFn: getDataOfUser,
  });
};
