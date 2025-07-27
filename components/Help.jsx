import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { IoIosHelpCircleOutline } from "react-icons/io";
const Help = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'help'));
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setOrderList(list);     
    } catch (e) {
      console.error(e);
    }
  };
  const handlestatus = async (id,status) => {
    const update = await updateDoc(doc(db,'help',id),{status:status})
    getAppointments()
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} justifyContent="flex-start" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 200, background: '#f5f5f5', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Total Requests <IoIosHelpCircleOutline />
              </Typography>
              <Typography variant="h4" align="center" color="primary">
                {orderList.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {orderList.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ m: 2 }}>
              No orders found.
            </Typography>
          </Grid>
        ) : (
          orderList.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card sx={{height:250,width:400 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order ID: {order.id}
                  </Typography>
                  {Object.entries(order)
                    .filter(([key]) => key !== 'id')
                    .map(([key, value]) => (
                      <Typography key={key} variant="body2">
                        <b>{key}:</b>{' '}
                        {typeof value === 'object'
                          ? JSON.stringify(value)
                          : value}
                      </Typography>
  
                    ))}
                <button style={{backgroundColor:"green",color:"white",borderRadius:"5px",padding:"5px",border:"none",outline:"none",width:"40%"}} id={order.id} onClick={()=>handlestatus(order.id,'approved')}>Approve</button>
                <button style={{backgroundColor:"red",color:"white",borderRadius:"5px",padding:"5px",margin:"5px",border:"none",outline:"none",width:"40%"}} id={order.id} onClick={()=>handlestatus(order.id,'rejected')}>Reject</button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      
    </Box>
  );
};

export default Help;
