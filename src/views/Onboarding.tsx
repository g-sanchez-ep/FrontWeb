import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

// Interfaz para el estado de los archivos
interface IFiles {
    ineFrontal: File | null;
    ineTrasero: File | null;
    selfie: File | null;
}

const Onboarding = () => { // Se elimina : JSX.Element
    const [files, setFiles] = useState<IFiles>({ ineFrontal: null, ineTrasero: null, selfie: null });
    const [salary, setSalary] = useState<string>('');
    const [agreedToCreditCheck, setAgreedToCreditCheck] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof IFiles;
        const file = e.target.files?.[0];

        if (file) {
            // Validación de tipo de archivo
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert('Tipo de archivo no permitido. Solo se aceptan .jpeg, .png, .pdf.');
                e.target.value = ''; // Limpiar el input
                return;
            }

            // Validación de tamaño de archivo (máximo 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('El archivo no debe pesar más de 2MB.');
                e.target.value = ''; // Limpiar el input
                return;
            }

            const newFiles = { ...files, [name]: file };
            setFiles(newFiles);
            updateProgress(newFiles);
        }
    };

    // Actualiza la barra de progreso
    const updateProgress = (currentFiles: IFiles) => {
        const filledFields = Object.values(currentFiles).filter(f => f !== null).length;
        setProgress((filledFields / 3) * 100);
    };

    const handleSubmit = () => {
        if (Object.values(files).some(f => f === null) || !salary || !agreedToCreditCheck) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Lógica de resultado aleatorio
        const resultStatus = Math.random() < 0.5 ? 'aprobado' : 'rechazado';

        navigate('/resultado', {
            state: { status: resultStatus, salary: Number(salary) }
        });
    };

    return (
        <div className="onboarding-container">
            <h2>Onboarding: Verificación de Identidad</h2>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="file-upload-section">
                <label>INE Frontal</label>
                <input type="file" name="ineFrontal" onChange={handleFileChange} accept=".jpeg,.jpg,.png,.pdf" required />
                <label>INE Trasero</label>
                <input type="file" name="ineTrasero" onChange={handleFileChange} accept=".jpeg,.jpg,.png,.pdf" required />
                <label>Selfie con tu INE</label>
                <input type="file" name="selfie" onChange={handleFileChange} accept=".jpeg,.jpg,.png,.pdf" required />
            </div>

            <input
                type="number"
                placeholder="Ingresa tu sueldo mensual neto"
                value={salary}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalary(e.target.value)}
                required
            />

            <div className="credit-check-container">
                <input type="checkbox" id="creditCheck" checked={agreedToCreditCheck} onChange={() => setAgreedToCreditCheck(!agreedToCreditCheck)} required />
                <label htmlFor="creditCheck">Acepto la consulta de mi historial en el Buró de Crédito.</label>
            </div>

            <button onClick={handleSubmit}>Continuar</button>
        </div>
    );
};

export default Onboarding;