import React, { useState } from "react";

interface SuggestionsProps {
    onGenerateSuggestions: () => void; // Callback-funktio, joka päivittää suositukset
    primarySuggestion: string | null; // Ensisijainen teknologiasuositus
    alternativeSuggestion: string | null; // Vaihtoehtoinen teknologiasuositus
}

// Suggestions-komponentti näyttää käyttäjälle suositellut teknologiat
const Suggestions: React.FC<SuggestionsProps> = ({
    onGenerateSuggestions,
    primarySuggestion,
    alternativeSuggestion,
}) => {
    // Tilamuuttuja suositusten näkyvyyden hallintaan
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Funktio, joka kutsuu suositusten päivitystä ja näyttää tulokset
    const handleButtonClick = () => {
        onGenerateSuggestions();
        setShowSuggestions(true);
    };

    return (
        <div>
            <h3>Suositellut teknologiat:</h3>

            {/* Näytä suositukset-nappi */}
            <button onClick={handleButtonClick} style={{ marginBottom: "10px" }}>
                Näytä ehdotukset
            </button>

            {/* Suositusten näyttäminen ehdollisesti */}
            {showSuggestions && (
                <div>
                    {/* Jos suosituksia löytyy */}
                    {primarySuggestion || alternativeSuggestion ? (
                        <>
                            {/* Ensisijainen suositus vihreällä */}
                            {primarySuggestion && (
                                <p style={{ color: "green" }}>
                                    Ensisijainen ehdotus: {primarySuggestion}
                                </p>
                            )}
                            {/* Vaihtoehtoinen suositus tummemmalla värillä */}
                            {alternativeSuggestion && (
                                <p style={{ color: "#4D243D" }}>
                                    Vaihtoehtoinen ehdotus: {alternativeSuggestion}
                                </p>
                            )}
                        </>
                    ) : (
                        // Jos suosituksia ei ole
                        <p style={{ color: "red" }}>Ei suosituksia saatavilla.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Suggestions;