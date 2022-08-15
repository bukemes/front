import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import './index.css';
// localization
// import i18n (needs to be bundled ;))
import './i18n/i18n';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
