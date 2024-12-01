// Słownik dostępnych stylów
const styles: { [key: string]: string } = {
    "style1.css": "css/style1.css",
    "style2.css": "css/style2.css",
};

// Funkcja do zmiany stylu
function changeStyle(styleName: string): void {
    const linkElementId = "dynamic-style"; // Stałe ID dla stylu

    // Sprawdzenie, czy istnieje aktualny styl
    let existingLink = document.getElementById(linkElementId) as HTMLLinkElement | null;

    if (existingLink) {
        // Zmień href istniejącego stylu
        existingLink.href = styles[styleName];
    } else {
        // Dodaj nowy styl, jeśli nie istnieje
        const newLink = document.createElement("link");
        newLink.id = linkElementId;
        newLink.rel = "stylesheet";
        newLink.href = styles[styleName];
        document.head.appendChild(newLink);
    }
}

// Funkcja do generowania dynamicznych linków
function generateStyleLinks(): void {
    const linkContainer = document.getElementById("style-links"); // Kontener na linki
    if (!linkContainer) {
        console.error("Brak elementu o ID 'style-links'.");
        return;
    }

    // Usuń istniejące dzieci (jeśli są)
    linkContainer.innerHTML = "";

    // Iteruj po stylach i twórz linki
    for (const [styleName, stylePath] of Object.entries(styles)) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = `Użyj ${styleName}`;
        link.onclick = (e) => {
            e.preventDefault(); // Zapobiegaj domyślnemu zachowaniu linku
            changeStyle(styleName); // Wywołaj funkcję zmiany stylu
        };

        const listItem = document.createElement("li");
        listItem.appendChild(link);
        linkContainer.appendChild(listItem);
    }
}

// Funkcja inicjalizacyjna
function initializeApp(): void {
    console.log("App initialized");

    // Ustaw domyślny styl
    changeStyle("style1.css");

    // Wygeneruj dynamiczne linki do stylów
    generateStyleLinks();
}

// Wywołaj funkcję inicjalizacyjną po załadowaniu DOM
document.addEventListener("DOMContentLoaded", initializeApp);
