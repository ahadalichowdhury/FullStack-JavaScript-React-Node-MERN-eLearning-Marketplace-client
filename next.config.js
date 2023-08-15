/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
    dest: "public",
    register: true, 
});

const nextConfig = withPWA({
    // next config
    reactStrictMode: true,
   
});


module.exports = nextConfig;
