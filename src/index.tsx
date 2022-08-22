import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.css'; // tailwind css
import './i18n/i18n'; // localization, needs to be bundled
import { AuthContextProvider } from './contexts/AuthContext'; // authentication context
import { Flowbite } from 'flowbite-react'; // theme context
import App from './App'; // Main app component


const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Flowbite>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Flowbite>
    </React.StrictMode>
);
