import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { SideBarItem } from './'

export const SideBar = ({ drawerWidth = 240 }) => {
    const { displayName } = useSelector(state => state.authSlice)
    const { notes } = useSelector(state => state.journal)
    console.log(notes);
    return (
        <Box
            component='nav'
            sx={{ width: { sm: { drawerWidth } }, flexShrink: { sm: 0 }, pl: 30 }}
        >

            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {
                        notes.map(note => (


                            <SideBarItem {...note} key={note.id} />

                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
