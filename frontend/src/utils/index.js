import {jwtDecode} from 'jwt-decode';

export const token_decode = (token) => {
    if (token) {
        try {
            const decoded = jwtDecode(token);
            const expTime = new Date(decoded.exp * 1000);

            if (new Date() > expTime) {
                localStorage.removeItem('user_token');
                return null; // Token-ul a expirat
            } else {
                return decoded; // Returnează datele decodificate
            }
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    } else {
        return null; // Nu există token
    }
}