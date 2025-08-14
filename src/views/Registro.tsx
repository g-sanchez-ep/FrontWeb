import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';


type PasswordErrors = {
    [key: string]: string;
};

const Registro = () => {
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
    const [errors, setErrors] = useState<PasswordErrors>({});

    const navigate = useNavigate();

    const validatePassword = (): boolean => {
        const newErrors: PasswordErrors = {};

        if (password.length < 8) newErrors.length = 'Debe tener al menos 8 caracteres.';
        if (!/[A-Z]/.test(password)) newErrors.uppercase = 'Debe contener al menos una mayúscula.';
        if (!/[a-z]/.test(password)) newErrors.lowercase = 'Debe contener al menos una minúscula.';
        if (!/\d/.test(password)) newErrors.digit = 'Debe contener al menos un dígito.';
        if (!/[!@#$%^&*]/.test(password)) newErrors.special = 'Debe contener un carácter especial (!@#$%^&*).';
        if (password !== confirmPassword) newErrors.match = 'Las contraseñas no coinciden.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Tipamos el evento del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }
        if (validatePassword()) {
            alert("¡Registro exitoso! Serás redirigido al onboarding.");
            navigate('/onboarding');
        }
    };

    return (
        <div className="form-container">
            <h2>Creación de Cuenta</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Correo" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
                <input type="tel" placeholder="Teléfono" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} required />

                <div className="password-errors">
                    {Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}
                </div>

                <div className="terms-container">
                    <input type="checkbox" id="terms" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
                    <label htmlFor="terms">Acepto los <a href="#" onClick={() => alert('Modal de Términos y Condiciones')}>Términos y Condiciones</a></label>
                </div>

                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Registro;