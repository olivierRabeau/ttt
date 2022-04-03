// breakpoints

const sizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
};

// devices

const devices = {
    mobileS: `@media screen and (min-width: ${sizes.mobileS})`,
    mobileM: `@media screen and (min-width: ${sizes.mobileM})`,
    mobileL: `@media screen and (min-width: ${sizes.mobileL})`,
    tablet: `@media screen and (min-width: ${sizes.tablet})`,
    laptop: `@media screen and (min-width: ${sizes.laptop})`,
    laptopL: `@media screen and (min-width: ${sizes.laptopL})`,
    desktop: `@media screen and (min-width: ${sizes.desktop})`,
};

export default devices;