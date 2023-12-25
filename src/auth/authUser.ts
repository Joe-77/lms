import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firbase/firebaseConfig"

const getUser = () => {
  const [currentUser, setCurrentUser] : any = useState(null)

  useEffect(()=> {

    onAuthStateChanged(auth , (user)=>{

      setCurrentUser(user)

    })
    
  },[])

  return currentUser;
}

export default getUser