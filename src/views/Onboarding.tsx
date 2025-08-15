import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApplication } from '../context/ApplicationContext';
import './Onboarding.css';

interface IFiles {
    ineFrontal: File | null;
    ineTrasero: File | null;
    selfie: File | null;
}

const Onboarding = () => {
    const { saveOnboarding } = useApplication();
    const navigate = useNavigate();


    const [files, setFiles] = useState<IFiles>({ ineFrontal: null, ineTrasero: null, selfie: null });
    const [salary, setSalary] = useState<string>('');
    const [agreedToCreditCheck, setAgreedToCreditCheck] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof IFiles;
        const file = e.target.files?.[0];

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Tipo de archivo no permitido.');
                e.target.value = '';
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                toast.error('El archivo no debe pesar más de 2MB.');
                e.target.value = '';
                return;
            }

            setFiles(prev => ({ ...prev, [name]: file }));
        }
    };

    useEffect(() => {
        const filledFiles = Object.values(files).filter(f => f !== null).length;
        setProgress((filledFiles / 3) * 100);
    }, [files]);

    const handleSubmit = () => {
        if (Object.values(files).some(f => f === null) || !salary || !agreedToCreditCheck) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }

        setIsLoading(true);


        setTimeout(() => {
            const resultStatus = Math.random() < 0.5 ? 'aprobado' : 'rechazado';


            saveOnboarding({ salary: Number(salary), resultStatus });


            navigate('/resultado');
        }, 2000);
    };

    return (
        <div className="onboarding-container">
            <h2>Onboarding: Verificación de Identidad</h2>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="file-upload-section">
                <div className="file-upload-wrapper">
                    <label htmlFor="ineFrontal" className="file-upload-label">
                        <span>INE Frontal</span>
                        {files.ineFrontal && <span className="file-name">{files.ineFrontal.name}</span>}
                    </label>
                    <input id="ineFrontal" type="file" name="ineFrontal" onChange={handleFileChange} accept=".jpeg,.jpg,.png,.pdf" />
                </div>

                <div className="file-upload-wrapper">
                    <label htmlFor="ineTrasero" className="file-upload-label">
                        <span>INE Trasero</span>
                        {files.ineTrasero && <span className="file-name">{files.ineTrasero.name}</span>}
                    </label>
                    <input id="ineTrasero" type="file" name="ineTrasero" onChange={handleFileChange} accept=".jpeg,.jpg,.png,.pdf" />
                </div>

                <div className="file-upload-wrapper">
                    <label htmlFor="selfie" className="file-upload-label">
                        <span>Selfie con tu INE</span>
                        {files.selfie && <span className="file-name">{files.selfie.name}</span>}
                    </label>
                    <input id="selfie" type="file" name="selfie" onChange={handleFileChange} accept=".jpeg,.jpg,.png,.pdf" />
                </div>
            </div>

            <input
                type="number"
                placeholder="Ingresa tu sueldo mensual neto"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
            />

            <div className="credit-check-container">
                <input type="checkbox" id="creditCheck" checked={agreedToCreditCheck} onChange={() => setAgreedToCreditCheck(!agreedToCreditCheck)} required />
                <label htmlFor="creditCheck">Acepto la consulta de mi historial en el Buró de Crédito.</label>
            </div>


            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span className="spinner"></span>
                        Evaluando...
                    </>
                ) : (
                    'Finalizar Solicitud'
                )}
            </button>
        </div>
    );
};

export default Onboarding;