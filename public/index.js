import { createMainContent } from './main.js';

const initializePage = () => {
    // Create container

    const container = document.createElement("section");
    container.className = "container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    // container.style.marginTop = "20px";
    container.style.position = "absolute";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(container);
    // document.body.style.backgroundColor = "#F4F1EA;"
};

window.onload = () => {
    initializePage();
    createMainContent();
};
