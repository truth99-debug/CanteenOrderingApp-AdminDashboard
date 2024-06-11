import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Header from "../../components/Header";
import OrderTable from "../../components/OrderTable";
import OrderList from "../../components/OrderList";
import Sidebar from "../../components/Sidebar";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const DashBoard = () => {
    const location = useLocation();

    useEffect(() => {
        console.log("location" , location)
    }, [location])

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }} component={'section'}>
                <Header />
                <Sidebar user={location.state.user}/>
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        px: { xs: 2, md: 6 },
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3,
                        },
                        pb: { xs: 2, sm: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                    }}>
                    <Box component={'section'}
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}>
                        <Typography level="h2" component="h1">
                            Dashboard
                        </Typography>
                        <Button
                            color="primary"
                            startDecorator={<DownloadRoundedIcon />}
                            size="sm"
                        >
                            Download PDF
                        </Button>
                    </Box>
                    <OrderTable />
                    <OrderList />
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default DashBoard
