// breakpoints

export const sizes = { 
    mobileLarge: '400px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1800px'
};

// devices

const devices = {
    mobileLarge: `@media screen and (min-width: ${sizes.mobileLarge})`,
    tablet: `@media screen and (min-width: ${sizes.tablet})`,
    laptop: `@media screen and (min-width: ${sizes.laptop})`,
    desktop: `@media screen and (min-width: ${sizes.desktop})`,
};

export default devices;