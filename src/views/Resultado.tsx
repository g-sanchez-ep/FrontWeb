import React, { useState } from 'react';
import { useApplication } from '../context/ApplicationContext';
import './Resultado.css';

// Importaciones de imágenes locales
import versaImg from '../assets/images/nissan-versa.png';
import rioImg from '../assets/images/kia-rio.png';
import jettaImg from '../assets/images/vw-jetta.png';

interface ICarOption {
    name: string;
    rent: number;
    img: string;
}

const Resultado = () => {
    const { application } = useApplication();
    const { resultStatus, salary } = application;
    const [status, setStatus] = useState(resultStatus || 'rechazado');
    const maxRent = salary * 0.30;
    const carOptions: ICarOption[] = [
        { name: 'Nissan Versa', rent: 4500, img: versaImg },
        { name: 'Kia Rio', rent: 5000, img: rioImg },
        { name: 'VW Jetta', rent: 7000, img: jettaImg }
    ];

    const AprobadoView = () => (
        <div className="result-content approved">
            <div className="result-header">
                <div className="result-icon-wrapper approved">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <h2>¡Felicidades! Tu solicitud ha sido autorizada</h2>
                <p className="subtitle">Hemos preparado algunas opciones de vehículos que se ajustan a tu perfil.</p>
            </div>
            <div className="rent-highlight-box">
                <p>Tu renta mensual máxima autorizada es de:</p>
                <p className="rent-amount">${maxRent.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
            <div className="car-options-grid">
                {carOptions.map(car => (
                    <div className="car-card" key={car.name}>
                        <img src={car.img} alt={car.name} />
                        <div className="car-card-info">
                            <h4>{car.name}</h4>
                            <p>Desde ${car.rent.toLocaleString()}/mes</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="result-actions">
                <button className="secondary-action" onClick={() => setStatus('rechazado')}>No me interesan, ver otras opciones</button>
            </div>
        </div>
    );

    const RechazadoView = () => (
        <div className="result-content rejected">
            <div className="result-header">
                <div className="result-icon-wrapper rejected">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h2>Solicitud no autorizada por ahora</h2>
                <p className="subtitle">En esta ocasión no fue posible completar tu trámite, pero no te preocupes, hay otras opciones.</p>
            </div>
            <div className="rejected-layout">
                <div className="rejected-illustration">
                    <svg width="100%" height="100%" viewBox="0 0 221 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="35.5" y="27.5" width="150" height="156" rx="11.5" fill="#F8FAFC" stroke="#E2E8F0"/>
                        <path d="M56 61H166" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M56 81H166" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M56 101H121" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="55.5" cy="15.5" r="15.5" fill="#F1F5F9"/>
                        <path d="M55.5 8.5V15.5H62.5" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="165.5" cy="129.5" r="55.5" fill="#FFFFFF" stroke="#E2E8F0"/>
                        <circle cx="165.5" cy="129.5" r="45.5" fill="#F8FAFC"/>
                        <path d="M165.498 111V130.333" stroke="#6A5ACD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M184.167 129.5H146.833" stroke="#6A5ACD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="rejected-text-content">
                    <h3>No te desanimes, estamos para ayudarte.</h3>
                    <p>A veces, las solicitudes automáticas no cuentan toda la historia. Te invitamos a intentarlo de nuevo en 3 meses o a contactarnos directamente para una revisión especial de tu caso.</p>
                    <div className="result-actions">
                        <button className="primary-action" onClick={() => setStatus('aprobado')}>Solicitar revisión especial</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="result-page-container">
            {/* --- Las burbujas animadas viven aquí, en el fondo --- */}
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>

            <div className="result-content-wrapper">
                <div className="result-card">
                    {status === 'aprobado' ? <AprobadoView /> : <RechazadoView />}
                </div>
            </div>
        </div>
    );
};

export default Resultado;
