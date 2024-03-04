import React from 'react';

export default function Hero() {
    return (
        <div className="position-relative">
            <div className="p-5 text-center bg-image" style={{ backgroundImage: 'url("https://media.istockphoto.com/id/1435226158/photo/circuit-board-background-computer-data-technology-artificial-intelligence.webp?b=1&s=170667a&w=0&k=20&c=d-gHg6uCV5JEaKJCpxhJ01Ab19m032daRC8vDo8NzDI=")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
                <div className="mask" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="mb-4 display-4 fw-bold text-light">Welcome to TechWeb</h1>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
