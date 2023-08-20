/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/admin/products',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 's-maxage=1, stale-while-revalidate=20',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig

