/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/transactions',
                destination: '/api/transactions',
            },
        ];
    },
};

export default nextConfig;