import React, { useState } from 'react'
import { Box, Button, Grid, Link, MenuItem, Select, TextField, Typography, Paper } from '@mui/material';

export default function Buy() {
    const [sendData, setSendData] = useState({ name: '', surname: '', email: '', telephone: '', model: 'Mercedes 520i', message: '' });

    function handleChange(event) {
        var selectData = {}
        selectData[event.target.name] = event.target.value

        const mergedObject = {
            ...sendData,
            ...selectData,
        };
        setSendData(mergedObject)
    }

    function jsonConcat(o1, o2) {
        for (var key in o2) {
            o1[key] = o2[key];
        }
        return o1;
    }

    return (
        <div>
            <Paper sx={{ p: 2, margin: 'auto', maxWidth: '60%', flexGrow: 1 }}>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
                            Adı
                        </Typography>
                        <TextField fullWidth name="name" required variant="outlined" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
                            Soyadı
                        </Typography>
                        <TextField fullWidth name="surname" required variant="outlined" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
                            Email *
                        </Typography>
                        <TextField fullWidth name="email" type="email" required variant="outlined" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
                            Telefon Numarası
                        </Typography>
                        <TextField fullWidth name="Telephone" required type="tel" variant="outlined" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
                            Model
                        </Typography>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="model"
                            value={sendData.model}
                            onChange={(e) => {
                                handleChange(e)
                            }}
                        >
                            <MenuItem value={'Mercedes 520i'}>Mercedes 520i</MenuItem>
                            <MenuItem value={'BMW 3 Sedan'}>BMW 3 Sedan</MenuItem>
                        </Select>

                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" sx={{ mt: 3 }} variant="body2">
                            Uzunluk 3 den büyükse MyTransactions tablosuna eklerken hata verir. Eklediği Buy tablosunu da geri alır.
                        </Typography>
                        <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
                            Not
                        </Typography>
                        <TextField fullWidth name="message" required multiline rows={6} variant="outlined" onChange={handleChange} />

                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}>
                    <Button color="primary" fullWidth size="large" variant="contained" onClick={() => {
                        fetch('http://localhost:6528/api/Buy', {
                            method: 'POST',
                            body: JSON.stringify({
                                "Name": sendData.name,
                                "Surname": sendData.surname,
                                "Email": sendData.email,
                                "Telephone": sendData.telephone,
                                "Model": sendData.model,
                                "Message": sendData.message
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                            .then(response => response.json())
                            .then(json => {
                                console.log('1 ', json)
                                if (json.success) {
                                    alert("İşlem Başarılı Şekilde Tamamlandı")
                                } else {
                                    alert("İşlem Başarısız")
                                }
                            })

                            .catch(err => {
                                console.log('123456 ', err)
                            });
                    }}>
                        Satın Al
                    </Button>
                </Box>
                <Typography color="textSecondary" sx={{ mt: 3 }} variant="body2">
                    Bizi tercih ettiğiniz için teşekkür ederiz.
                </Typography>
            </Paper>
        </div>
    )
}
