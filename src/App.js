import "./App.css";
import { useEffect } from "react";
import { useNote } from "./useNote";
import { Signup } from "./utilities/Signup";
import { useAuthProvider } from "./authProvider";
import { LabelsPage } from "./utilities/Labels";
import { LoginPage } from "./utilities/LoginPage";
import { TrashPage } from "./utilities/TrashPage";
import { LandingPage } from "./utilities/LandingPage";
import { ArchivePage } from "./utilities/ArchivePage";
import { PrivateRoute } from "./utilities/PrivateRoute";
import { ProfilePage } from "./utilities/ProfilePage";
import { LOGIN_STATUS } from "./utilities/authActionTypes";
import { Routes, Route } from "react-router-dom";
import { getCall } from "./utilities/resuableFunctions";
import { GET_NOTES } from "./utilities/noteActionTypes";

function App() {
  const { dispatch: authDispatch, state: authState } = useAuthProvider();
  const { dispatch } = useNote();
  const token = localStorage.getItem("encodedToken");

  useEffect(async () => {
    if (token) {
      authDispatch({ type: LOGIN_STATUS, payload: true });

    } 
    else {
      authDispatch({ type: LOGIN_STATUS, payload: false });
    }

    const data = await getCall("/api/notes");
    dispatch({ type: GET_NOTES, payload: data.notes });
  }, [token, dispatch, authDispatch]);

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route path="/trash" element={<TrashPage />} />
        <Route path="/labels" element={<PrivateRoute />}>
          <Route path="/labels" element={<LabelsPage />} />
        </Route>
        <Route path="/archive" element={<PrivateRoute />}>
          <Route path="/archive" element={<ArchivePage />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
