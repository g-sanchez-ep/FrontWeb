import React, { useState } from 'react';
import { useApplication } from '../context/ApplicationContext'; // -> 1. Importa el hook del contexto
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
    const { application } = useApplication(); // -> 2. Lee los datos del contexto global

    // Obtiene los datos del estado global, con valores por defecto por si se accede a la URL directamente
    const { resultStatus, salary } = application;

    // El estado local 'status' sigue siendo útil para los botones que cambian la vista internamente
    const [status, setStatus] = useState(resultStatus || 'rechazado');

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
            <p>En esta ocasión no fue posible autorizar tu solicitud de renta.</p>
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
