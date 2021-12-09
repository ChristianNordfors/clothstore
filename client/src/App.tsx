import React, { useEffect } from "react";
import { ProvideAuth } from "./hooks/useAuth";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import AdminPage from "./components/adminPage/adminPage";
import UsuariosAdmPage from "./components/adminPage/components/usuarios/usuarios";
import EmployeePage from "./components/adminPage/employeePage";
import theme from "./components/controllers/themeConfig";
import CreatePublication from "./components/createPublication/CreatePublication";
import Homepage from "./components/HomePage/Homepage";
import PerfilUsuario from "./components/PerfilUsuario";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";
import { useAuth } from "./hooks/useAuth";
import CartScreen from "./pages/CartScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import { getCarrito } from "./redux/actions/carritoAction";
import {
  cartLength,
  putPublications,
} from "./redux/actions/publicationActions";
import { RootState } from "./redux/store/store";
import PublicacionesAdmPage from "./components/adminPage/components/publicaciones/pubicaciones";

// const user = useSelector((state: RootState) => state.userSignin.userInfo)

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const { name, order, page, mark, category, gender, price, author } =
    useSelector((state: RootState) => state.publicationList);

  const auth = useAuth();
  useEffect(() => {
    console.log("holaaaaaaaa auth", auth);
    if (auth?.user && auth.user.email) {
      dispatch(getCarrito(auth.user.email));
    }
  }, [dispatch, auth]);
  useEffect(() => {
    dispatch(
      putPublications({
        name: name,
        order: order,
        page: page,
        mark: mark,
        category: category,
        gender: gender,
        price: price,
        author: author,
      })
    );
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
    // <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="employee" element={<EmployeePage />} />
        <Route path="/admin/usuarios" element={<UsuariosAdmPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/nueva-publicacion" element={<CreatePublication />} />
        <Route
          path="/actualizar-publicacion/:publicationId"
          element={<CreatePublication />}
        />
        <Route
          path="/publication/:publicationId"
          element={<PublicationDetail />}
        />
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route path="/perfil/*" element={<PerfilUsuario />}>
          <Route path="detalles" />
          <Route path="compras" />
          <Route path="ventas" />
          <Route path="deseos" />
        </Route>
      </Routes>
    </MuiThemeProvider>
    // </StylesProvider>
  );
};

export default App;

/*{ <MuiThemeProvider theme={theme}>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/publicaciones" element={<PublicacionesAdmPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/employee/publicaciones" element={<PublicacionesAdmPage />} />
        <Route path="/admin/usuarios" element={<UsuariosAdmPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/nueva-publicacion" element={<CreatePublication />} />
        <Route
          path="/actualizar-publicacion/:publicationId"
          element={<CreatePublication />}
        />
        <Route
          path="/publication/:publicationId"
          element={<PublicationDetail />}
        />
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route path="/perfil" element={<PefilUsuario />}>
          <Route path="detalles" />
          <Route path="compras" />
          <Route path="ventas" />
          <Route path="deseos" />

        </Route>
      </Routes>
    </MuiThemeProvider> }*/
