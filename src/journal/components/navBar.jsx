import { LogoutOutlined, ManOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { OnLogout, logout } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { clearSlice } from "../../store/journal/journalSlices";

export const NavBar = ({ drawerWidth = 240 }) => {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(clearSlice());
        dispatch(OnLogout());
    }
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography
                        variant="h6"
                        noWrap
                        component='div'
                    >Journald App</Typography>

                    <IconButton color='error' onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>

                </Grid>
            </Toolbar>
        </AppBar >
    )
}