import React, { useEffect, useState } from 'react'
import { Card, CardMedia, CardContent, Typography, CardActionArea ,Box, Grid} from '@mui/material';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../config/Firebase';
import { useSection } from '../config/ContextApi';
import { AiFillProduct } from "react-icons/ai";
const Products = () => {
  let [ProdName, setProdName] = useState('');
  let [price, setPrice] = useState('');
  let [ShortDesc, setShortDesc] = useState('');
  let [productList, setProductList] = useState([])
  let [imageFile, setImageFile] = useState(null)
  let { setTotalProd, totalProd } = useSection() //context api state
  let imgUrl;

  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    setTotalProd(productList.length);
  }, [productList]);

  const getProducts = async () => {
    try {
      let list = []
      const querySnapshot = await getDocs(collection(db, "Products"));
      querySnapshot.forEach(async (doc) => {
        list.push({ 'id': doc.id, ...doc.data() })
      });
      setProductList(list)
    } catch (error) {
      console.log(error)
    }
  }
  const prodHandleBtn = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "Hackathon");
    data.append("cloud_name", 'dfpqio2ff');

    const res = await fetch("https://api.cloudinary.com/v1_1/dfpqio2ff/image/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    imgUrl = result.secure_url;
    try {
    let obj = {
      name: ProdName,
      price: price,
      shortDescription: ShortDesc,
      image: imgUrl
    }
    const docRef = await addDoc(collection(db, "Products"), obj);
    console.log("Document written with ID: ", docRef.id);
    await getProducts()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div className='ProdParent'>
      <div className='ProdChild1'>
        <input type="text" placeholder='Product Name' onChange={(e) => setProdName(e.target.value)} />
        <input type="text" placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
        <input type="file" accept='.jgeg,.png,.gif' onChange={(e) => setImageFile(e.target.files[0])} />
        <br />
        <input type="text" id='ShortDesc' placeholder='Short Description' onChange={(e) => setShortDesc(e.target.value)} />
        <button onClick={prodHandleBtn}>Submit</button>
      </div>
      <div className="ProdChild2">
        <Grid container spacing={2} justifyContent="flex-start" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 200, background: '#f5f5f5', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Total Products <AiFillProduct />
              </Typography>
              <Typography variant="h4" align="center" color="primary">
                {totalProd}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

        <div className="ProdList">
          {productList == null ? '' :
            productList.map((v, i) => {
              console.log(v)
              return (
                <div className="CardsContainer">
                  <div className="cardParent">
                    <img src={v.image} alt="" />
                    <h2>{v.title}</h2>
                    <b>{v.price}</b>
                    <p>{v.shortDescription}</p>
                    <button style={{marginLeft:"10px"}} id={v.id}>Update</button>
                    <button style={{marginLeft:"10px"}} id={v.id}>Delete</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Products