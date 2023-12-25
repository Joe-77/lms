import { useMutation } from "react-query";
import { auth, db } from "../firbase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const updateVideo = () => {
  const update = async (data: any) => {
    const userId = auth.currentUser?.uid;
    const videoId = data?.id.integerValue;

    const dataRef = doc(db, `${userId}`, videoId);

    const docData = {
      ...data,
      isCompleted: true,
    };

    await updateDoc(dataRef, docData);
  };

  return useMutation({
    mutationFn: (data) => update(data),
  });
};

export const updates = () => {
  const done = async (videoId: any) => {
    const userId = auth.currentUser?.uid;
    const dataRef = doc(db, `${userId}`, videoId);

    const docData = {
      isCompleted: true,
    };
    await updateDoc(dataRef, docData);
  };

  return useMutation({
    mutationFn: (videoId) => done(videoId),
  });
};
