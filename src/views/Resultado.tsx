import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Resultado.css';

import versaImg from '../assets/images/nissan-versa.png';
import rioImg from '../assets/images/kia-rio.png';
import jettaImg from '../assets/images/vw-jetta.png';
import rejectedImg from '../assets/images/coche-silueta.png';



type LocationState = {
    status: 'aprobado' | 'rechazado';
    salary: number;
};

interface ICarOption {
    name: string;
    rent: number;
    img: string;
}

const Resultado = () => {
    const location = useLocation();

    // --- LÓGICA VERIFICADA ---
    // Si location.state no existe, se usará el objeto por defecto '{ status: 'rechazado' }'.
    // Esto asegura que siempre tengamos un estado inicial válido.
    const { status: initialStatus, salary } = (location.state as LocationState) || { status: 'rechazado', salary: 0 };

    const [status, setStatus] = useState<'aprobado' | 'rechazado'>(initialStatus);

    // TIP DE DEBUGGING: Descomenta la siguiente línea para ver en la consola qué estado está llegando.
    // console.log("Estado recibido:", location.state);

    const maxRent = salary * 0.30;

    const carOptions: ICarOption[] = [
    { name: 'Nissan Versa', rent: 4500, img: versaImg },
    { name: 'Kia Rio', rent: 5000, img: rioImg },
    { name: 'VW Jetta', rent: 7000, img: jettaImg }


];

    const AprobadoView = () => (
        <div className="result-content approved">
            <h2>¡Felicidades! Tu solicitud ha sido autorizada.</h2>
            <p>Con base en tu perfil, tu renta mensual máxima es de: <strong>${maxRent.toFixed(2)}</strong></p>
            <h3>Te sugerimos estas opciones:</h3>
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
            <button onClick={() => setStatus('rechazado')}>Ver catálogo completo</button>
        </div>
    );

    const RechazadoView = () => (
    <div className="result-content rejected">
        <h2>Lo sentimos</h2>
        <p>En esta ocasión no fue posible autorizar tu trámite.</p>
        <img src={rejectedImg} alt="Vehículo no autorizado" className="rejected-img" />
        <p>Te invitamos a intentarlo nuevamente en otra ocasión.</p>
        <button onClick={() => setStatus('aprobado')}>Contactar para petición especial</button>
    </div>
);

    return (
        <div className="resultado-container">
            {status === 'aprobado' ? <AprobadoView /> : <RechazadoView />}
        </div>
    );
};

export default Resultado;