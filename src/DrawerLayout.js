import React, { useState, useCallback } from 'react'
import { AppBar, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography, useMediaQuery, Hidden } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { useTheme, makeStyles } from '@material-ui/core/styles'

const drawerWidth = 250
const cutoff = 'md'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  drawer: {
    [theme.breakpoints.up(cutoff)]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up(cutoff)]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(cutoff)]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  drawerContent: {
    padding: theme.spacing(2)
  },
  drawerPaper: {
    width: drawerWidth
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 1
  }
}))

export default function DrawerLayout (props) {
  const { title, subtitle, drawerTitle, mainContent, drawerContent } = props

  const classes = useStyles()
  const theme = useTheme()
  const isMobile = !useMediaQuery(theme.breakpoints.up(cutoff))

  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(open => !open)
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            {title}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Hidden xsDown>
            <Typography variant='subtitle1'>
              {subtitle}
            </Typography>
          </Hidden>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          anchor={isMobile ? 'left' : undefined}
          open={drawerOpen || !isMobile}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        >
          <div className={classes.drawerHeader}>
            <Typography variant='h6' noWrap>{drawerTitle}</Typography>
          </div>
          <Divider />
          <div className={classes.drawerContent}>
            {drawerContent}
          </div>
        </Drawer>
      </nav>

      <main className={classes.contentContainer}>
        <div className={classes.toolbar} />
        <div className={classes.content}>
          {mainContent}
        </div>
      </main>
    </div>
  )
}
