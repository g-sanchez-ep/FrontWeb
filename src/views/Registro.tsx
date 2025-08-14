import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import './Registro.css';
import './ModalVerification.css';

type PasswordErrors = { [key: string]: string };

const Registro = () => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<PasswordErrors>({});

  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
    if (validatePassword()) {
      setVerificationModalOpen(true);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newCode = [...verificationCode];
    newCode[index] = value.slice(-1);
    setVerificationCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && e.currentTarget.value === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerificationSubmit = () => {
    console.log("Código enviado:", verificationCode.join(''));
    setVerificationModalOpen(false);
    setInfoModalOpen(true);
  };

  const handleContinueToOnboarding = () => {
    setInfoModalOpen(false);
    navigate('/onboarding');
  };

  return (
    <>
      <div className="form-container">
        <h2>Creación de Cuenta</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                <div className="password-errors">
                    {Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}
                </div>

                <div className="terms-container">
                    <input type="checkbox" id="terms" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
                    <label htmlFor="terms">Acepto los <span className="terms-link" onClick={() => setTermsModalOpen(true)}>Términos y Condiciones</span></label>
                </div>

                <button type="submit">Crear Cuenta</button>
            </form>
      </div>

      <Modal isOpen={isTermsModalOpen} onClose={() => setTermsModalOpen(false)}>
        <h2>Términos y Condiciones</h2>
        <p>Aquí va el texto completo de los términos y condiciones del servicio de arrendamiento...</p>
      </Modal>

      <Modal isOpen={isVerificationModalOpen} onClose={() => setVerificationModalOpen(false)}>
        <h2>Verifica tu Teléfono</h2>
        <p>Ingresa el código de 4 dígitos que enviamos a tu teléfono.</p>
        <div className="code-inputs">
          {verificationCode.map((digit, index) => (
            <input
              key={index}


              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="code-input"
            />
          ))}
        </div>
        <button onClick={handleVerificationSubmit} className="modal-button">Verificar</button>
      </Modal>

      <Modal isOpen={isInfoModalOpen} onClose={() => setInfoModalOpen(false)}>
        <h2>Ya casi terminamos</h2>
        <p>A continuación, validaremos tu identidad y consultaremos tu buró de crédito. Por favor, ten tu INE a la mano.</p>
        <button onClick={handleContinueToOnboarding} className="modal-button">Continuar</button>
      </Modal>
    </>
  );
};

export default Registro;
