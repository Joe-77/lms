import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useMutation, useQuery } from "react-query"
import { auth, db } from "../firbase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


export const createUserWithMailAndPass = ()=> {


  const createNewUser = async(user : any)=>{ 

    const { userName, email, password } = user;

    await createUserWithEmailAndPassword (auth,email,password).then(async(data)=> {
    
      const user = data.user;
      const userRef = doc(db, "users" , user.uid);


      const userDoc = {
        id : user.uid,
        displayName : userName,
        email : user.email,
        join : new Date(),
        country : 'Egypt',
      }
      

    await setDoc(userRef,userDoc)

    })
  }
  return useMutation({
    mutationFn : async(user)=> createNewUser(user),
  })
}

export const loginUser = ()=> {

  const signInUser = async (data : any)=>{

    const { email , password } = data;

    await signInWithEmailAndPassword(auth,email,password).then(()=> {
      localStorage.setItem('isLogin' , "true")
    })
  }

  return useMutation({
    mutationFn : async(data)=> signInUser(data) 
  })
}

export const forgetPass = ()=> {

  const ResetPass = async (data : any)=> {

    const {email} = data;

    await sendPasswordResetEmail(auth , email)
  }

  return useMutation({
    mutationFn : async(email)=> ResetPass(email )
  })
}

export const getUserData = ()=>{

  const getUserData = async()=> {

    const userId : any = auth.currentUser?.uid;

    const userRef = doc(db , 'users' , userId);
    const userSnap = await getDoc(userRef)

    return userSnap.data();
  }

  return useQuery({
    queryKey : ['data'],
    queryFn : getUserData
  })
}


export const updateInformation = ()=> {


  const updateUserInformation = async(data : any)=> {

    const {updateName , country} = data;

    const userId : any = auth.currentUser?.uid;
    const userRef = doc (db , 'users' , userId);

    await updateDoc(userRef , {
      displayName : updateName || auth.currentUser?.displayName,
      country : country,
    })
  }


  return useMutation({
    mutationFn : async(data)=> updateUserInformation(data)
  })
}