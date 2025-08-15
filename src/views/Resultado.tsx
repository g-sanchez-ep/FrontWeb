import React, { useState } from 'react';
import { useApplication } from '../context/ApplicationContext';
import './Resultado.css';

// Importaciones de imágenes locales
import versaImg from '../assets/images/nissan-versa.png';
import rioImg from '../assets/images/kia-rio.png';
import jettaImg from '../assets/images/vw-jetta.png';
import rejectedImg from '../assets/images/coche-silueta.png';

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
                <div className="result-icon approved">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <h2>¡Felicidades! Solicitud autorizada.</h2>
                <p className="subtitle">Basado en tu perfil, tu renta mensual máxima es de: <strong>${maxRent.toFixed(2)}</strong></p>
            </div>
            <div className="car-options">
                {carOptions.map(car => (
                    <div className="car-card" key={car.name}>
                        <img src={car.img} alt={car.name} />
                        <div className="car-card-info">
                            <h4>{car.name}</h4>
                            <p>Renta: ${car.rent.toFixed(2)}/mes</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="result-actions">
                <button className="secondary-action" onClick={() => setStatus('rechazado')}>Ver otras opciones</button>
            </div>
        </div>
    );

    const RechazadoView = () => (
        <div className="result-content rejected">
            <div className="result-header">
                <div className="result-icon rejected">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h2>Solicitud no autorizada</h2>
            </div>

            {/* --- NUEVO LAYOUT DE DOS COLUMNAS --- */}
            <div className="rejected-layout">
                <div className="rejected-image-container">
                    <img src={rejectedImg} alt="Vehículo no autorizado" className="rejected-img" />
                </div>
                <div className="rejected-text-content">
                    <p>Lo sentimos, en esta ocasión no fue posible realizar su trámite. Te invitamos a intentarlo nuevamente en otra ocasión.</p>
                    <div className="result-actions">
                        <button className="primary-action" onClick={() => setStatus('aprobado')}>Contactar para petición especial</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="page-container">
            <div className="content-card">
                {status === 'aprobado' ? <AprobadoView /> : <RechazadoView />}
            </div>
        </div>
    );
};

export default Resultado;
