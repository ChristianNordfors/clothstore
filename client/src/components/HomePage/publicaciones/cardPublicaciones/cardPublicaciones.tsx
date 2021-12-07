import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import React, { useEffect } from "react";
import "./cardPublication.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import IconButton from '@mui/material/IconButton'
import IconButton from "@mui/material/IconButton";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import Grid from "@mui/material/Grid";
import { CartItemType, CartType, CartItemTypeDB } from "../../../../pages/CartScreen";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { cartLength } from "../../../../redux/actions/publicationActions";
import { RootState } from "../../../../redux/store/store";
import { putCarrito } from "../../../../redux/actions/carritoAction";
import { useAuth } from "../../../../hooks/useAuth";

type Props = {
  name: string;
  images: any[];
  stock: number;
  mark: string;
  detail: string;
  price: number;
  categorie: string;
  author: string;
  gender: string;
  key: string;
  id: string;
};
export default function CardPublicacion(props: Props) {
  const [cart, setCart] = useLocalStorage<CartType | undefined>("cart", []);
  const { name, images, price, categorie, id, stock } = props;
  const dispatch = useDispatch();
  const carrito: any = useSelector((state: RootState) => state.carrito.carrito);
  const auth = useAuth()

  

  const item: CartItemType = {
    id,
    amount: stock,
    price,
    image: images[0]?.url,
    title: name,
    category: categorie,
  };
  useEffect(() => {
    dispatch(cartLength());
  }, [cart, dispatch]);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCart(() => {
      let aux: any = localStorage.getItem("cart");
      console.log(typeof aux);
      if (typeof aux === "string") aux = JSON.parse(aux);
      const isItemInCart = aux.find((item: any) => item.id === clickedItem.id);
      if (isItemInCart) {
        isItemInCart.amount += 1;
        return aux;
      }
      console.log(clickedItem);
      return [...aux, { ...clickedItem, amount: 1 }];
    });
  };

  const handleAddToCartDB = (email: string | null | undefined, id: string):void => {
    dispatch(putCarrito(email, id))
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={4}>
      <Card
        className="cardMain"
        sx={{
          height: { lg: "400px", xl: "400px" },
          width: { lg: 195, xl: "260px" },
          borderBottom: "2px solid #00c2cb",
        }}
      >
        <CardMedia
          className="showButton_Cart_Info"
          sx={{ overflow: "hidden", height: "75%" }}
        >
          <Carousel
            className="Carousel-root-1 CarouselItem"
            autoPlay={false}
            navButtonsProps={{
              style: {
                backgroundColor: "transparent",
                borderRadius: "0",
              },
            }}
          >
            {images.length === 0 ? (
              <Item
                style={{
                  width: '100%'
                }}
                item={
                  "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-no-image-available-icon-flat.jpg"
                }
              />
            ) : (
              images.map((item, i) => <Item key={i} item={item} />)
            )}
          </Carousel>

          <Box
            className="noshowButton_Cart_Info"
            sx={{ position: 'relative', zIndex: '1',  display: "flex", justifyContent: "center" }}
          >
            <IconButton
              aria-label="Add to Cart"
              size="medium"
              color="primary"
              onClick={ !auth.user ? () => handleAddToCart(item) : () => handleAddToCartDB(auth.user && auth?.user?.email, id)}
            >
              <ShoppingCartIcon />
            </IconButton>
            <Link to={`/publication/${id}`}>
              <IconButton color="primary" size="medium">
                <InfoIcon />
              </IconButton>
            </Link>
          </Box>
        </CardMedia>
        <CardContent>
          <Typography
            sx={{ fontSize: "19px", textAlign: "center" }}
            variant="h5"
          >
            {name}
          </Typography>
          <Typography
            sx={{ fontSize: "17px", textAlign: "center" }}
            variant="body2"
          >
            $ {`  ${price}`}
          </Typography>
          <Typography variant="body1">{categorie}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function Item(props: any) {
  return (
    <Box>
      <Box
        sx={{
          height: { lg: "100%", xl: "100%" },
          width: { lg: "93%", xl: "93%" },
          padding: "4px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={
            props.item.url ||
            "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-no-image-available-icon-flat.jpg"
          }
          alt="productoImage"
          sx={{
            height: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "280px",
              xl: "280px",
            },
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "230px",
              xl: "230px",
            },
            borderRadius: "3px",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
}
