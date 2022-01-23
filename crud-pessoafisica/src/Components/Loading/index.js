import { Box, CircularProgress } from '@mui/material';
import { withStyles } from '@material-ui/styles';


const styles = {
    root: {
        zIndex: 9999,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: "#F9F0F0",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.23,
    },
};

function Loading({classes}) {
    return (
        <Box className={classes.root} sx={{ display: 'flex', }}>
            <CircularProgress size={100} />
        </Box>

    );
}

export default withStyles(styles)(Loading);