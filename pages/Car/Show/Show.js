import React, { useEffect, useState } from 'react'
import { Box, Grid, Button, Typography, CardMedia, Avatar } from '@mui/material';
import * as signalR from "@microsoft/signalr"
import { useRouter } from 'next/router'

export default function Show() {
    const router = useRouter()
    const [photo, setPhoto] = useState('/img/all.jpg')

    useEffect(() => {
        try {
            let connection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:6528/carhub")
                .build();

            connection.on("receiveMessage", entity => {
                if (entity.front && entity.back) {
                    setPhoto("/img/all.jpg")
                } else if (entity.front) {
                    setPhoto("/img/front.jpg")
                }
                else if (entity.back) {
                    setPhoto("/img/back.jpg")
                }
                else {
                    setPhoto("/img/close.jpg")
                }

            })

            connection.start()
        } catch (error) {
            console.log('Error SignalR ', error)
        }

    }, [])




    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columns={{ xs: 4, sm: 3, md: 12 }}
                        alignItems="center" flexDirection="column" >

                        <Box
                            sx={{
                                width: '100%',
                                height: 510
                            }}

                        >
                            <CardMedia
                                sx={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                                component="img"
                                image={photo}

                            />

                        </Box>
                        <Button sx={{ mt: 1 }} onClick={() => {
                            router.push({
                                pathname: '/Car/Buy',
                            })
                        }} variant="contained" fullWidth style={{ textTransform: 'none', fontSize: 20, fontWeight: 'bold' }}>Çantaya Ekle</Button>

                    </Grid>
                </Box>
            </div>
        </>
    )
}
