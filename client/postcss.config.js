// postcss.config.js
module.exports = {
    plugins: [
        require('postcss-apply'),
        require('tailwindcss')('./tailwind.config.js'),
        require('autoprefixer')
    ],
};
