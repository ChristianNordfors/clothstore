import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Badge,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  Tooltip,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { Box } from '@mui/system';
import axios from 'axios';
import FileUpload from '../fileUpload/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from 'react-router';
import { ImageNotSupportedOutlined } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import NavBar from '../HomePage/Header/NavBar/NavBar';

interface CreatePublicationForm {
  name: string;
  detail: string;
  mark: string;
  category: string;
  gender: string;
  stock: 0;
  price: 0;
  images: { public_id: string; url: string }[];
  id: string | undefined;
}

const useStyles = makeStyles({
  typography1: {
    padding: 6,
  },
  container: {
    marginTop: -18,
    marginBottom: 10,
  },
  gridForm: {
    backgroundColor: "white",
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 2,
    justifyContent: "center",
    boxShadow: "1",
  },
  gridItem: {
    "& > :not(style)": { width: "45ch", marginTop: 3, marginBottom: 3 },
  },
  divider: {
    margin: "3 5",
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 1,
    marginTop: 2,
    boxShadow: "5",
    borderRadius: 0.5,
  },
});

export default function CreatePublication() {
  const user = useSelector((state: RootState) => state?.userSignin?.userInfo);

  const classes = useStyles();

  const [form, setForm] = useState<CreatePublicationForm>({
    name: "",
    detail: "",
    mark: "",
    category: "",
    gender: "",
    stock: 0,
    price: 0,
    images: [],
    id: user?._id || "",
  });

  const [loadingImage, setLoadingImage] = useState(false);

  const { name, detail, mark, stock, price, category, gender, images } = form;

  // const auth = useAuth();

  const { publicationId } = useParams();

  const navigate = useNavigate();

  // useEffect(() => {
  //   setForm({...form, id: user?._id});
  //   console.log(form);

  // }, [form, user?._id]);

  useEffect(() => {
    if (publicationId && publicationId.length > 0) {
      axios.get('/publication', {
        params: { publicationId: publicationId }
      }).then(({ data }) => {
        setForm({ ...data })
      });
    }
  }, [publicationId]);

  function handleForm(e: BaseSyntheticEvent) {
    if (e.target.value < 0) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitForm(e: BaseSyntheticEvent) {
    e.preventDefault();

    axios.post('/publications/new', form, { params: { publicationId } }).then(({ data }) => {

      navigate(`/publication/${data}`)

    });
  }

  function removeImage(imageId: string) {
    axios
      .post("/removeimage", { imageId })
      .then(({ data }) => {
        setForm({
          ...form,
          images: images.filter((img: any) => img.public_id !== imageId),
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "#eeeeee",
          minHeight: "100vh",
          height: "max-content",
        }}
      >
        <NavBar></NavBar>
        <Box sx={{ minHeight: "15vh" }}>
          {/* <Box sx={{ display: "flex", justifyContent: "center" }}> */}
          <Typography
            variant="h4"
            component="h4"
            // sx={{ p: 6 }}
            className={classes.typography1}
          >
            {publicationId ? "Actualiza tu producto" : "Publica tu producto"}
            <Tooltip title="Debes completar los campos y subir al menos una imagen para realizar la publicación">
              <HelpOutlineIcon
                color="primary"
                fontSize="large"
                sx={{ cursor: "help", ml: 2 }}
              ></HelpOutlineIcon>
            </Tooltip>
          </Typography>
          {/* </Box> */}
        </Box>

        <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
          <Container
            // sx={{ mt: -18, mb: 10 }}
            className={classes.container}
          >
            <Grid
              item
              component="form"
              onSubmit={submitForm}
              noValidate
              autoComplete="off"
              container
              // boxShadow={1}
              // sx={{
              //   backgroundColor: "white",
              //   px: 3,
              //   borderRadius: 2,
              //   justifyContent: "center",
              // }}
              className={classes.gridForm}
            >
              <Grid
                item
                xs={5}
                className={classes.gridItem}
              >
                <TextField
                  onChange={handleForm}
                  value={name}
                  name="name"
                  id="standard-basic"
                  label="Nombre del producto"
                  variant="standard"
                />

                <TextField
                  onChange={handleForm}
                  value={mark}
                  name="mark"
                  id="standard-basic"
                  label="Marca"
                  variant="standard"
                />

                <TextField
                  onChange={handleForm}
                  value={detail}
                  name="detail"
                  id="standard-textarea"
                  label="Descripción"
                  multiline
                  variant="standard"
                />

                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">
                    Precio
                  </InputLabel>
                  <Input
                    onChange={handleForm}
                    value={price}
                    name="price"
                    id="standard-adornment-amount"
                    type="number"
                    inputProps={{ min: 0 }}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">
                    Stock
                  </InputLabel>
                  <Input
                    onChange={handleForm}
                    value={stock}
                    name="stock"
                    id="standard-adornment-amount"
                    type="number"
                    inputProps={{ min: 0 }}
                  />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">
                    Categoría
                  </InputLabel>
                  <Select
                    onChange={handleForm}
                    value={category}
                    name="category"
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Categoría"
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    <MenuItem value={"Remera"}>Remera</MenuItem>
                    <MenuItem value={"Patanlon"}>Pantalón</MenuItem>
                    <MenuItem value={"Zapatillas"}>Zapatillas</MenuItem>
                    <MenuItem value={"Zapatos"}>Zapatos</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">
                    ¿Para quién es este producto?
                  </InputLabel>
                  <Select
                    onChange={handleForm}
                    value={gender}
                    name="gender"
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Categoría"
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    <MenuItem value={"Hombre"}>Hombre</MenuItem>
                    <MenuItem value={"Mujer"}>Mujer</MenuItem>
                    <MenuItem value={"Niños"}>Niños</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Divider
                orientation="vertical"
                light
                flexItem
                // sx={{ my: 3, mx: 5 }}
                className={classes.divider}
              />

              <Grid
                item
                // xs={6} sx={{ mt: 4 }}
                xs={6}
                style={{ marginTop: 4 }}
              >
                <Grid
                  item
                  // xs={12} sx={{ ml: 1 }}
                  xs={12}
                  style={{ marginLeft: 1 }}
                >
                  {loadingImage ? (
                    <CircularProgress
                      // sx={{ ml: 5 }}
                      style={{ marginLeft: 5 }}
                    />
                  ) : (
                    <FileUpload
                      form={form}
                      setForm={setForm}
                      setLoadingImage={setLoadingImage}
                    />
                  )}
                </Grid>

                {form.images.length > 0 ? (
                  form.images.map((image: any) => {
                    return (
                      <Badge
                        key={image.public_id}
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        badgeContent={
                          <CancelIcon
                            onClick={() => removeImage(image.public_id)}
                            sx={{
                              cursor: "pointer",
                              ml: 1.5,
                              mt: 0.5,
                              color: "red",
                            }}
                          ></CancelIcon>
                        }
                      >
                        <a
                          href={image.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Avatar
                            alt="image"
                            src={image.url}
                            className={classes.avatar}
                            // sx={{
                            //   width: 150,
                            //   height: 150,
                            //   m: 1,
                            //   mt: 2,
                            //   boxShadow: 5,
                            //   borderRadius: 0.5,
                            // }}
                            variant="square"
                          />
                        </a>
                      </Badge>
                    );
                  })
                ) : (
                  <Box component="div" sx={{ mt: 10 }}>
                    <Box
                      component="h3"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      Aún no has subido imágenes
                    </Box>
                    <Box
                      component="div"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <ImageNotSupportedOutlined
                        fontSize="large"
                        color="disabled"
                        sx={{ fontSize: "200px", display: "flex" }}
                      ></ImageNotSupportedOutlined>
                    </Box>
                  </Box>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                // sx={{ justifyContent: "center", display: "flex" }}
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Button
                  disabled={
                    !name ||
                    !mark ||
                    !detail ||
                    price < 1 ||
                    images.length < 1 ||
                    !gender ||
                    !category
                  }
                  type="submit"
                  // sx={{ backgroundColor: "primary", my: 7 }}
                  style={{
                    backgroundColor: "primary",
                    marginTop: 7,
                    marginBottom: 7,
                  }}
                >
                  {publicationId ? "Actualizar publicación" : "Publicar"}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
