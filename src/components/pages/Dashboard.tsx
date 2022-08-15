import * as React from 'react';
// import logo from '../../../assets/svg/vite.svg'; // '../../../public/logo.svg';
// import viteLogo from './../../assets/svg/vite.svg';

export default function Dashboard() {
    const [count, setCount] = React.useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <img src='/svg/vite.svg' className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button type="button" onClick={() => setCount((count2) => count2 + 1)}>
            count is: {count}
                    </button>
                </p>
                <p>
          Edit <code>Home.tsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
            Learn React
                    </a>
                    {' | '}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
            Vite Docs
                    </a>
                </p>
            </header>
        </div>
    );
}