import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';

const style = {
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function OtpModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if(reason === 'backdropClick')
      return
    setOpen(false)
  };
  const [isLoading, setIsLoading] = React.useState(false);
  
  function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const otp = formData.get('otp');
    prompt(otp);
  }
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
    sx={[{
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }, style]}
    >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
        Verification
    </Typography>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12} alignItems={'center'}>
            <TextField
            name="otp"
            required
            fullWidth
            id="otp"
            label="Email OTP"
            autoFocus
            type='number'
            InputProps={{ inputProps: { maxLength: 6 }, disableTouchRipple: true, disableIncrement: true, disableDecrement: true }}
            />
        </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
          <Button
            variant='outlined'
            fullWidth
            onClick={handleClose}
            >
            Cancel
          </Button>
        </Box>
    </Box>
     {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
        </Container>
    </Modal>
  );
}