/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx,html}',
        './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './*.html'
    ],
    theme: {
        extend: {
            // border: {
            //     light: '1px solid #eaeaea',
            //     dark: '1px solid #eaeaea',
            // }
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
    darkMode: 'class',
};
  