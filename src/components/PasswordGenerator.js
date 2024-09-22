import React, { useState } from 'react';

import {
    Box,
    Button,
    Slider,
    Snackbar,
    Checkbox,
    Container,
    TextField,
    Typography,
    FormControlLabel,
} from '@mui/material';
import styles from './page.module.scss';

export const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(false);


    const generatePassword = () => {
        const numbers = '0123456789';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let charset = '';
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;
        if (includeLowercase) charset += lowercase;
        if (includeUppercase) charset += uppercase;

        if (charset === '') {
            setToastMessage('At least one character set must be selected.');
            setToastVisible(true);
            return;
        }

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex];
        }

        setToastMessage('Password Generated with success.');
        setToastVisible(true);
        setPassword(generatedPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setToastMessage('Password copied to clipboard!');
        setToastVisible(true);
    };

    const handleToastClose = () => {
        setToastMessage('');
        setToastVisible(false);
    };

    return (
        <Container className={styles.passwordGeneratorContainer} maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Password Generator
                </Typography>
                <Snackbar
                    open={toastVisible}
                    message={toastMessage}
                    autoHideDuration={3000}
                    onClose={handleToastClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    sx={{
                        '& .MuiSnackbarContent-root': {
                            backgroundColor: '#3490dc',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                        disabled
                        fullWidth
                        value={password}
                        variant="outlined"
                        label="Generated Password"
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={copyToClipboard}
                        style={{ marginLeft: '10px' }}
                    >
                        Copy
                    </Button>
                </Box>
                <Typography gutterBottom>
                    Password Length: {length}
                </Typography>
                <Slider

                    min={6}
                    max={32}
                    value={length}
                    valueLabelDisplay="auto"
                    aria-labelledby="password-length-slider"
                    onChange={(e, newValue) => setLength(newValue)}

                />
                <Box mt={2} mb={2}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includeLowercase}
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                            />
                        }
                        label="Include Lowercase"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                            />
                        }
                        label="Include Uppercase"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                            />
                        }
                        label="Include Numbers"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                            />
                        }
                        label="Include Symbols"
                    />
                </Box>

                {/* Generate Button */}
                <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    onClick={generatePassword}
                >
                    Generate Password
                </Button>
            </Box>
        </Container>
    );
};
