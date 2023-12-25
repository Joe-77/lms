import { createContext, useState } from "react";
import {
  createUserWithMailAndPass,
  forgetPass,
  loginUser,
  updateInformation,
} from "../auth/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleFirebaseAuthErrors } from "../utility/firebaseError";
import { deleteUser, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../firbase/firebaseConfig";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { watch } from "../watchedData/watch";
import { updateVideo, updates } from "../updateVideo/videoUpdate";

export const Context = createContext<any>(undefined);

export const AuthContextProvider = ({ children }: any) => {
  const [isLogin, setIsLogin]: any = useState(localStorage.getItem("isLogin"));
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const signUpNewUser = createUserWithMailAndPass();
  const signInNewUser = loginUser();
  const forgetPassword = forgetPass();
  const updateProfile = updateInformation();
  const videoCompleted = updateVideo();
  const updateShowVideo = updates();

  const d = watch();

  const done = (data: any) => {
    d.mutateAsync(data, {
      onSuccess: () => {
        console.log("done");
      },
      onError: () => {
        console.log("err");
      },
    });
  };
  // Auth

  const signUp = (data: any) => {
    signUpNewUser.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Account Created Successfully !");
        navigate("/login");
      },
      onError: (error) => {
        handleFirebaseAuthErrors(error);
      },
    });
  };

  const signInNow = (data: any) => {
    signInNewUser.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Login Successfully");
        navigate("/");
        setIsLogin(true);
      },
      onError: (error) => {
        handleFirebaseAuthErrors(error);
      },
    });
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(async (data: any) => {
        const user = data.user;
        const userRef = doc(db, "users", user.uid);

        await setDoc(userRef, {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          join: new Date(),
          country: "Egypt",
        });

        toast.success("Login Successfully");
        navigate("/");
        localStorage.setItem("isLogin", "true");
        setIsLogin(true);
      })
      .catch((error: any) => {
        handleFirebaseAuthErrors(error);
      });
  };
  const resetPass = (email: any) => {
    forgetPassword.mutateAsync(email, {
      onSuccess: () => {
        toast.info("check your mail to reset password");
        navigate("/login");
      },
      onError: (error) => {
        handleFirebaseAuthErrors(error);
      },
    });
  };
  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        toast.success("sign out successfully");
        localStorage.removeItem("isLogin");
        setIsLogin(false);
      })
      .catch((error: any) => {
        handleFirebaseAuthErrors(error);
      });
  };

  const handleDeleteUser = async () => {
    const user: any = auth.currentUser;

    await deleteDoc(doc(db, "users", user.uid));
    await deleteUser(user)
      .then(() => {
        toast.success("Account Deleted Successfully");
        navigate("/login");
        localStorage.removeItem("isLogin");
        setIsLogin(true);
      })
      .catch(() => {
        toast.error("Error! Try Again Later");
      });
  };

  const handleUpdateUser = async (data: any) => {
    await updateProfile
      .mutateAsync(data)
      .then(() => {
        toast.success("Account Updated Successfully");
        navigate("/");
      })
      .catch(() => {
        toast.error("Error!! Try again later");
      });
  };

  const handleCompletedVideo = async (data: any) => {
    await videoCompleted.mutateAsync(data, {
      onSuccess: () => {
        toast.success("video completed successfully");
      },
    });
  };

  const handleUpdatesVideo = async (videoId: any) => {
    await updateShowVideo.mutateAsync(videoId, {
      onSuccess: () => {
        toast.success("video completed successfully");
      },
    });
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        signUp,
        signInNow,
        loginWithGoogle,
        resetPass,
        handleSignOut,
        handleDeleteUser,
        handleUpdateUser,
        setSearch,
        search,
        category,
        setCategory,
        done,
        handleCompletedVideo,
        handleUpdatesVideo,
      }}
    >
      {children}
    </Context.Provider>
  );
};
