import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import CompletedToday from "./Pages/CompletedToday.jsx/CompletedToday";
import EditDetails from "./Pages/EditDetails/EditDetails";
import FailPage from "./Pages/FailPage/FailPage";
import SuccessPage from "./Pages/SuccessPage/SuccessPage";

function App() {


  return (

    <>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <Navigate to="/answer"></Navigate>
        }></Route>
        <Route path="/answer" element={
          <CompletedToday />
        }></Route>
        <Route path="/editDetails" element={<EditDetails />}></Route>
        <Route path="/congrats" element={<SuccessPage />}></Route>
        <Route path="/fail" element={<FailPage />}></Route>
      </Routes>
    </>
  );
}

export default App;


/**

/answer
/editDetails
/success
/fail


 */