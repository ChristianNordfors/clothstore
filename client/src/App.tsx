import React, { useEffect, useState } from "react";
import { ProvideAuth, useAuth } from "./hooks/useAuth";
import "./App.css";
import { Route, Routes } from "react-router";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import CartScreen from "./pages/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  cartLength,
  putPublications,
} from "./redux/actions/publicationActions";
import CreatePublication from "./components/createPublication/CreatePublication";
// import { ThemeProvider } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./components/controllers/themeConfig";
import Homepage from "./components/HomePage/Homepage";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";
import HomeUsuarios from "./components/HomeUsuarios/HomeUsuarios";
import { getCarrito } from "./redux/actions/carritoAction";
import { RootState } from "./redux/store/store";
import RequireAuth from "./components/RequireAuth";

// const user = useSelector((state: RootState) => state.userSignin.userInfo)

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const { name, order, page, mark, category, gender, price, author } = useSelector((state: RootState) => (state.publicationList))


  const auth = useAuth()
  useEffect(() => {
    console.log('holaaaaaaaa auth', auth)
    if (auth?.user && auth.user.email) {
      dispatch(getCarrito(auth.user.email))
    }
  }, [dispatch, auth])
  useEffect(() => {
    dispatch(putPublications({ "name": name, "order": order, "page": page, "mark": mark, "category": category, "gender": gender, "price": price, "author": author }));
  }, []);

  useEffect(() => {
    dispatch(cartLength());
  }, [dispatch]);

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      if (!Array.isArray(cart)) {
        localStorage.setItem("cart", "[]");
      }
    } else {
      localStorage.setItem("cart", "[]");
    }
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nueva-publicacion" element=
        {
            <RequireAuth>
              <CreatePublication />
             </RequireAuth>
          } />
        <Route
          path="/actualizar-publicacion/:publicationId"
          element={
            <RequireAuth>
              <CreatePublication />
            </RequireAuth>
          }
        />
        <Route
          path="/publication/:publicationId"
          element={<PublicationDetail />}
        />
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route
          path="/perfil"
          element={
            <RequireAuth>
              <HomeUsuarios />
            </RequireAuth>
          }
        />
      </Routes>
    </MuiThemeProvider>
  );
};

export default App;
