import React, { useEffect, useState } from 'react'
import { db } from '../config/Firebase';
import { collection, getDocs ,deleteDoc,doc} from 'firebase/firestore';
import { Card, CardMedia, CardContent, Typography, CardActionArea ,Box, Grid} from '@mui/material';
import { CiShoppingCart } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
const Users = () => {
  let [userList,setUserList] = useState([])
  let [userdetail,setUserDetail] = useState(null)
  useEffect(()=>{
    getUsers()
  },[])
  useEffect(()=>{

    setUserDetail(userList.length)
  },[userList])
  const deleteUser = async (id) => {
    await deleteDoc(doc(db,"Users",id))
    getUsers()
  }
  const getUsers = async ( ) => {
    let list = []
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach(async (doc) => {
        list.push({'id' : doc.id,...doc.data()})
      });
      setUserList(list)
  }
  return (
    <div>
           <Grid container spacing={2} justifyContent="flex-start" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 200, background: '#f5f5f5', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Total Users <FaUser />
              </Typography>
              <Typography variant="h4" align="center" color="primary">
                {userdetail}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className="userList">
        {
          userList.map((v,i)=>{
            return(
              <div className="userCardParent">
              <div className="userCard">
                <b>Email:{v.email}</b>
                <b>Name:{v.name}</b>
                <button id={v.id} onClick={()=>deleteUser(v.id)}>Delete</button>
                </div>
                </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Users