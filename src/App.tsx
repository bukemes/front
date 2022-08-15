import React, { useState } from 'react';
// import App from './App';
// import './index.css';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Router } from 'react-router-dom';
import './App.css';
// flowbite
import { Toast } from 'flowbite-react';
import {HiFire} from 'react-icons/hi';
// custom
import SidebarComponent from './components/navigation/ResponsiveDrawer';

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            {/* <nav>topbar</nav> */}
            <SidebarComponent />
            <main>actual pages
                {/* <SidebarComponent /> */}
            </main>
            {/* <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                    <HiFire className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                Set yourself free.
                </div>
                <Toast.Toggle />
            </Toast> */}
        </>
        
    );
}


// import ReactDOM from 'react-dom/client';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );
