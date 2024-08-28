'use client';
import { Button, Container, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { PieChart } from "@mui/x-charts";
import { LineChart } from '@mui/x-charts/LineChart';

export default function Page() {
    return (
        <Container component="main" maxWidth="md">
            <Grid container>
                <Grid>
                    <Paper sx={{ padding: 1}}>
                        <Typography fontWeight="bold">Évènements</Typography>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'En attente', color: '#B20D30' },
                                        { id: 1, value: 15, label: 'Valider', color: '#EF9C42' },
                                        { id: 2, value: 4, label: 'Publier', color: '#84B59F'},
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}