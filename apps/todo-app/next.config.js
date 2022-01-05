// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // this is required for static file export used in electron. without this,
  // electron cannot reference js and css imports correctly.
  // See discussion: https://github.com/vercel/next.js/discussions/32216
  assetPrefix: "./",
};

module.exports = withNx(nextConfig);
