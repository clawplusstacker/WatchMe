import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Protected from "./Components/Protected";
import EditDetails from "./Pages/EditDetails/EditDetails";
import FailPage from "./Pages/FailPage/FailPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SuccessPage from "./Pages/SuccessPage/SuccessPage";
import {doc, getDoc } from "@firebase/firestore";
import { UserAuth } from "./contexts/AuthContext";
import db from './firebase'
import { Spin } from "antd";


function App() {

  const {user} = UserAuth();
  const [data, setData] = useState()
  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false);



  useEffect(() => {
        
    const fetchUserData = async() => {

      if(user){
          setLoading(true)
          var docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef)
          setData(docSnap.data());
          setLoading(false)
      }
    }

    fetchUserData();
  }, [user, refetch]);


  function getNavigate(data){

    if(!data){
      return "/fail"
    }


    if(new Date(data.completed).getDate() - new Date().getDate() == 1){
      return "/editDetails"
    }else if(new Date(data.completed).toLocaleDateString() === new Date().toLocaleDateString()){
      return "/congrats"
    }else{
      return "/editDetails"
    }
  }


  return (

    <>
      <NavBar />

      {loading  ? 
        
        <div style={{height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Spin/> 
        </div>
      :

        <>
          <Routes>
            <Route path ="/login" element={<LoginPage />}></Route>
            <Route path="/" element={
              !user ? 
                <Navigate to='/login' /> 
              : 
                <Navigate to={getNavigate(data)} />
            }></Route>
            <Route path="/editDetails" element={
              <Protected>
                <EditDetails data={data} refetch={() => setRefetch(!refetch)}/>
              </Protected>
            }></Route>
            <Route path="/congrats" element={
              <Protected>
                <SuccessPage />
              </Protected>
            }></Route>
            <Route path="/fail" element={
              <Protected>
                <FailPage />
              </Protected>        
            }></Route>
          </Routes>
        </>

      }
    </>
  
  );
}

export default App;
