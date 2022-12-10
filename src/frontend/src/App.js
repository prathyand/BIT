import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
// import UserProfile from './components/Profile/UserProfile';
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import constants from "./constants";
import MoviePage from "./pages/MoviePage";
import TheatreMoviePage from "./pages/TheatrePage";
import TheatreMovieBooking from "./components/MovieBooking/TheatreMovieBooking";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import InPersonTheaterPage from "./pages/InPersonTheaterPage";
import Success from "./pages/SuccessPage";
import Failure from "./pages/FailurePage";
import CustomerServiceEmployeePage from "./pages/CustomerServiceEmployeePage";
import CustomerServicePage from "./pages/CustomerServicePage";
import CustomerServiceSearchPage from "./pages/CustomerServiceSearchPage";

function App(props) {
  const clientId = constants.CLIENT_ID;
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} exact></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/movie" element={<MoviePage />}></Route>
        <Route path="/theatrepage" element={<TheatreMoviePage />}></Route>
        <Route path="/theatremovie" element={<TheatreMovieBooking />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/customerservice" element={<CustomerServicePage />}></Route>
        <Route path="/bookingsuccess" element={<Success />}></Route>
        <Route path="/bookingfail" element={<Failure />}></Route>
      </Route>
      <Route
        path="/customerserviceemployee"
        element={<CustomerServiceEmployeePage />}>
      </Route>
      <Route
        path="/customerservicesearch"
        element={<CustomerServiceSearchPage />}>
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/adhoc" element={<InPersonTheaterPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
