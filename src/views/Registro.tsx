import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '../components/Modal';
import CarModel from '../components/CarModel';
import { useApplication } from '../context/ApplicationContext';
import './Registro.css';
import './ModalVerification.css';

const schema = z.object({
  email: z.string().min(1, { message: "El correo es requerido." }).email({ message: "El formato del correo no es válido." }),
  phone: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos." }),
  password: z.string()
    .min(8, { message: "Debe tener al menos 8 caracteres." })
    .regex(/[A-Z]/, { message: "Debe contener al menos una mayúscula." })
    .regex(/[a-z]/, { message: "Debe contener al menos una minúscula." })
    .regex(/\d/, { message: "Debe contener al menos un dígito." })
    .regex(/[!@#$%^&*]/, { message: "Debe contener un carácter especial." }),
  confirmPassword: z.string(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos y condiciones.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

type FormFields = z.infer<typeof schema>;

const Registro = () => {
  const { saveRegistration } = useApplication();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [formData, setFormData] = useState<Pick<FormFields, 'email' | 'phone'>>();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setFormData({ email: data.email, phone: data.phone });
    setVerificationModalOpen(true);
  };
  const handleContinueToOnboarding = () => { if (formData) { saveRegistration(formData); setInfoModalOpen(false); navigate('/onboarding'); } };
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => { const value = e.target.value; if (isNaN(Number(value))) return; const newCode = [...verificationCode]; newCode[index] = value.slice(-1); setVerificationCode(newCode); if (value && index < 3) inputRefs.current[index + 1]?.focus(); };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => { if (e.key === 'Backspace' && e.currentTarget.value === '' && index > 0) { inputRefs.current[index - 1]?.focus(); } };
  const handleVerificationSubmit = () => { setVerificationModalOpen(false); setInfoModalOpen(true); };

  return (
    <>
      <div className="registration-page-container">
        <div className="left-pane">
          <div className="logo-container">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"></path></svg>
            <span>AutoRenta</span>
          </div>
          <div className="hero-text">
            <h1>El auto de tus sueños, a tu alcance.</h1>
            <p>Completa tu registro en minutos y descubre las opciones de renta personalizadas que tenemos para ti.</p>
          </div>
          <div className="hero-3d-model-wrapper">
            <CarModel />
          </div>
        </div>
        <div className="right-pane">
          <div className="form-card">
            <h2>Crea tu cuenta</h2>
            <p className="subtitle">Comienza tu solicitud hoy mismo.</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <input type="email" placeholder="Correo electrónico" className={errors.email ? 'input-error' : ''} {...register("email")} />
                <p className="error-message">{errors.email?.message}</p>
                <input type="tel" placeholder="Teléfono celular" className={errors.phone ? 'input-error' : ''} {...register("phone")} />
                <p className="error-message">{errors.phone?.message}</p>
                <input type="password" placeholder="Crea una contraseña" className={errors.password ? 'input-error' : ''} {...register("password")} />
                <p className="error-message">{errors.password?.message}</p>
                <input type="password" placeholder="Confirma tu contraseña" className={errors.confirmPassword ? 'input-error' : ''} {...register("confirmPassword")} />
                <p className="error-message">{errors.confirmPassword?.message}</p>
                <div className="terms-container">
                    <input type="checkbox" id="terms" {...register("agreedToTerms")} />
                    <label htmlFor="terms">Acepto los<span className="terms-link" onClick={() => setTermsModalOpen(true)}>Términos y Condiciones</span></label>
                </div>
                <p className="error-message">{errors.agreedToTerms?.message}</p>
                <button type="submit">Crear Cuenta</button>
            </form>
          </div>
        </div>
      </div>

      <Modal isOpen={isTermsModalOpen} onClose={() => setTermsModalOpen(false)}>
        <h2>Términos y Condiciones</h2>
        <p>Aquí va el texto completo de los términos y condiciones del servicio...</p>
      </Modal>
      <Modal isOpen={isVerificationModalOpen} onClose={() => setVerificationModalOpen(false)}>
        <h2>Verifica tu Teléfono</h2>
        <p>Ingresa el código de 4 dígitos que enviamos a tu teléfono.</p>
        <div className="code-inputs">
          {verificationCode.map((digit, index) => (
            <input key={index} ref={(el) => { inputRefs.current[index] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleCodeChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="code-input" />
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
