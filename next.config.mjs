/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/api/:slug*",
          destination: '/404',
          permanent: true,
        }, {
          source: "/chat",
          destination: '/404',
          permanent: true,
        }, {
          source: "/login",
          destination: '/404',
          permanent: true,
        }, {
          source: "/auth",
          destination: '/404',
          permanent: true,
        }
      ];
    } else {
      return []
    }
  },
};

export default nextConfig;
