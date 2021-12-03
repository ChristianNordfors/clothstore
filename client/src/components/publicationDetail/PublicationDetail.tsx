import React, { useEffect, useState } from 'react';
import { Avatar, Button, Container, FormControl, Grid, MenuItem, Select, Typography, Rating, CircularProgress, Divider } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import Reviews from './reviews/Reviews';
import NavBar from '../HomePage/Header/NavBar/NavBar';
import QAndA from './qAndA/QAndA';
// import { Publication } from '../../redux/reducer/stateTypes';


export interface Publication {
  _id: string;
  name: string;
  images?: { public_id: string, url: string }[];
  stock: number;
  mark: string;
  detail?: string;
  price: number;
  categorie: string;
  author: string;
  gender: "Hombre" | "Mujer" | "Niños";
  reviews: any[];
  qAndAs: any[];
  __v: number;
}


export default function PublicationDetail(): JSX.Element {

  const [publication, setPublication] = useState<Publication | undefined>();

  const [imageShow, setImageShow] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const { publicationId } = useParams();


  useEffect(() => {
    if (publicationId && publicationId.length > 0) {
      axios.get('http://localhost:3001/publication', {
        params: { publicationId: publicationId }
      }).then(({ data }) => {
        setPublication(data);
        setImageShow(data.images[0].url)
        setLoading(false);
      });
    }
  }, []);


  function imageToShow(img: string): void {
    setImageShow(img)
  }

  const scoreAverage = (): number | undefined => {
    if (publication) {
      const sum = publication?.reviews.reduce((partial_sum, r) => partial_sum + r.score, 0);
      return Math.round(sum / publication?.reviews?.length);
    }
};


  return (<>

    <Box sx={{ backgroundColor: '#eeeeee', minHeight: '140vh', height: 'max-content' }}>
      <NavBar></NavBar>
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '30vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

        </Box>
      </Box>

      <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>

        <Container sx={{ mt: -18, position: 'absolute' }}>



          <Grid item component="div"

            container
            // boxShadow={1} sx={{ backgroundColor: 'white', borderRadius: 2, justifyContent: 'center' }}>
            boxShadow={1} sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>

            {loading ? <CircularProgress sx={{ p: 25, mx: 'auto' }} /> : <>

              <Grid item
                xs={1}
                sx={{
                  my: 4, cursor: 'pointer'
                  // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                }}

              >
                {publication && publication?.images?.map(img => {
                  return <span key={img.public_id} onMouseEnter={() => imageToShow(img.url)}>
                    <Avatar sx={{ mt: 2, width: 50, height: 50, '&:hover': { boxShadow: 5 } }} src={img.url} variant="square">

                    </Avatar>
                  </span>
                })
                }

              </Grid>

              <Grid item
                xs={7}
                sx={{
                  '& > :not(style)': { my: 5 },
                  // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                }}

              >
                {imageShow && <Avatar src={imageShow} variant="square" sx={{ width: 470, height: 470, borderRadius: 1 }} alt="" />

                }




              </Grid>

              {/* <Divider orientation="vertical" light flexItem sx={{ my: 3, mx: 5 }} /> */}


              <Grid item xs={4}
                sx={{
                  mt: 5, boxShadow: 2, px: 3, pt: 2, pb: 3, minHeight: 'max-content', height: 'max-content'
                  // '& > :not(style)': { mt: 5 },
                }}>

                <Typography variant="h5" component="p" sx={{}}>
                  {publication && publication?.mark}
                </Typography>

                <Typography component="p" sx={{ mt: 1, color: 'gray' }}>
                  {publication && publication?.categorie}
                </Typography>

                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={10}>
                    <Typography variant="h6" component="h6">
                      {publication?.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={2} sx={{ justifyContent: 'right', display: 'flex', cursor: 'pointer' }}>
                    <FavoriteBorderOutlined></FavoriteBorderOutlined>
                  </Grid>
                </Grid>

                <Box component="div" sx={{ alignItems: 'center', display: 'flex', mt: 0.2 }}>
                  <Reviews>
                    <Rating name="read-only" value={scoreAverage()} readOnly />
                  </Reviews>
                  <Typography component="span" sx={{ fontSize: '10px', color: 'gray', ml: 1 }}>
                    {publication?.reviews.length} opiniones
                  </Typography>
                </Box>

                <Typography component="p" sx={{ mt: 2 }}>
                  {publication && publication?.detail}
                </Typography>

                <Typography variant="h5" component="h5" sx={{ py: 3, color: 'gray' }}>
                  $ {publication?.price}
                </Typography>

                {publication && publication?.stock > 0 ?
                  <Grid item container component="div"
                    sx={{
                      alignItems: 'center'
                      // '& > :not(style)': { mt: 5 },
                    }}>

                    <Grid item xs={6}
                      sx={{

                        // '& > :not(style)': { mt: 5 },
                      }}>

                      <Typography component="p" >
                        Stock disponible
                      </Typography>

                    </Grid>


                    <Grid item xs={6}
                      sx={{
                        justifyContent: 'right', display: 'flex'
                        // '& > :not(style)': { mt: 5 },
                      }}>

                      <FormControl variant="standard">
                        {/* <InputLabel id="demo-simple-select-standard-label">Cantidad</InputLabel> */}
                        <Select defaultValue={1}
                          // onChange={handleForm}
                          // value={gender}
                          // name="gender"
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Categoría"
                        >
                          {
                            Array.from(Array(publication?.stock).keys()).map((s) => {
                              return <MenuItem key={s} value={s + 1}>{s + 1}</MenuItem>
                            })
                          }

                        </Select>
                      </FormControl>

                    </Grid>
                    <Button variant="outlined" fullWidth sx={{ mt: 4 }}>
                      Añadir al carrito
                    </Button>
                  </Grid>
                  :

                  <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                      Sin stock
                    </Typography>
                  </Grid>

                }


              </Grid>


            </>}
                <Divider sx={{ width: '100%', my: 4 }}></Divider>

                <QAndA></QAndA>

          </Grid>
        </Container>

      </Box>
    </Box>
  </>)
}