import React from 'react';

interface WarningsProps {
    warnings: string[]; // Taulukko varoitusviesteistä
}

// Warnings-komponentti näyttää käyttäjälle varoituksia teknologioiden yhteensopivuuksista
const Warnings: React.FC<WarningsProps> = ({ warnings }) => {
    return (
        <div>
            <h3>Varoitukset:</h3>

            {/* Jos varoituksia löytyy */}
            {warnings.length > 0 ? (
                <ul>
                    {warnings.map((warning, index) => (
                        <li key={index} style={{ color: "#F4FFF8" }}>
                            {warning} {/* Näytä jokainen varoitus listana */}
                        </li>
                    ))}
                </ul>
            ) : (
                // Jos ei varoituksia
                <p>Ei varoituksia</p>
            )}
        </div>
    );
};

export default Warnings;