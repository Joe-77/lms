import { doc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { db } from "../firbase/firebaseConfig";
import { getUserData } from "../auth/auth";

export const watch = () => {
  const idUser = getUserData().data?.id;
  const addVideo = async (data: any) => {
    const dataRef = doc(db, idUser, data?.id.integerValue);

    const docData = {
      ...data,
      isCompleted: false,
    };

    await setDoc(dataRef, docData);
  };

  return useMutation({
    mutationFn: async (data) => addVideo(data),
  });
};
