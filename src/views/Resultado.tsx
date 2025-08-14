import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Resultado.css';


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


    const { status: initialStatus, salary } = (location.state as LocationState) || { status: 'rechazado', salary: 0 };

    const [status, setStatus] = useState<'aprobado' | 'rechazado'>(initialStatus);


    const maxRent = salary * 0.30;

    const carOptions: ICarOption[] = [
        { name: 'Nissan Versa', rent: 4500, img: 'https://via.placeholder.com/150' },
        { name: 'Kia Rio', rent: 5000, img: 'https://via.placeholder.com/150' },
        { name: 'VW Jetta', rent: 7000, img: 'https://via.placeholder.com/150' }
    ];

    const AprobadoView = () => (
        <div className="result-content">
            <h2>¡Felicidades! Tu solicitud ha sido autorizada.</h2>
            <p>Con base en tu perfil, tu renta mensual máxima es de: <strong>${maxRent.toFixed(2)}</strong></p>
            <h3>Te sugerimos estas opciones:</h3>
            <div className="car-options">
                {carOptions.map(car => (
                    <div className="car-card" key={car.name}>
                        <img src={car.img} alt={car.name} />
                        <h4>{car.name}</h4>
                        <p>Renta mensual: ${car.rent.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setStatus('rechazado')}>Ver catálogo completo</button>
        </div>
    );

    const RechazadoView = () => (
        <div className="result-content">
            <h2>Lo sentimos</h2>
            <p>En esta ocasión no fue posible autorizar tu trámite.</p>
            <img src="https://via.placeholder.com/200" alt="Coche" style={{ margin: '1rem 0' }} />
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