/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html,css}'],
    theme: {
        extend: {
            colors: {
                'play-btn': 'rgba(255, 255, 255, 0.55)',
                'card-bg': '#C4C4C4'
            }
        }
    },
    plugins: []
}
