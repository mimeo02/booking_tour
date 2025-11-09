import { Box, Button, TextField, Typography } from "@mui/material"

const Login = () => {
    const handleLogin = () => {
        // todo: call api
        const payload = {
            email: '',
            password: ''
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }} >
            <Typography variant="h5">Login</Typography>
            <TextField
                required
                id="outlined-required"
                label="Email"
                placeholder="Enter email"
            />
            <TextField
                required
                id="outlined-required"
                label="Password"
                placeholder="Enter password"
            />
            <Button onClick={handleLogin}>Login</Button>
        </Box >
    )
}

export default Login