
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {toast} from 'react-toastify'
const firebaseConfig = {
  apiKey: "AIzaSyBjGF7CM6vW64Kr5YGtL865QjAYK3aDBu8",
  authDomain: "chat-app-ace18.firebaseapp.com",
  projectId: "chat-app-ace18",
  storageBucket: "chat-app-ace18.appspot.com",
  messagingSenderId: "158019635542",
  appId: "1:158019635542:web:7d018b32ab05e28de62ef7",
  measurementId: "G-QV3JQLJN9T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    
const auth=getAuth(app)
const db=getFirestore(app);

const signup=async(username,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user;
        await setDoc(doc(db,'users',user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Heey i'm using chat-app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}
const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}
const logout=async()=>{
     try {
        await signOut(auth);
     } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
     }
}
export{signup,login,logout,auth,db}