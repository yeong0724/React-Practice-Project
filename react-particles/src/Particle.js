import React from 'react';
import Particles from 'react-particles-js';
import './Particle.css';

const Particle = () => {
    return (
        <>
            <Particles
                className="particles particles-box"
                params={{
                    particles: {
                        shape: {
                            type: 'images',
                        },
                        ine_linked: {
                            shadow: {
                                enable: true,
                                color: '#eee',
                                blur: 100,
                            },
                        },
                        number: {
                            value: 250,
                        },
                        size: {
                            value: 5,
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'repulse',
                            },
                        },
                    },
                }}
                height="100vh"
                style={{
                    opacity: 0.4,
                }}
            />
        </>
    );
};

export default Particle;
