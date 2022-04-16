// filePath from index.html to resources folder
const folderPath = "./";

const nameIs = (avatar)=> folderPath + avatar;

const theme = {
    avengers:{
        firstAvatar:"spiderman",
        secondAvatar:"hulk"
    },
    holidays:{
        firstAvatar:"wave",
        secondAvatar:"mountain"
    }
    // Add new themes here
}

const avatar = (path) =>(
    {
        picture:path + ".png",
        mark:path + "_mk.png",
    }
);

const players = (themeName) => [
    avatar(nameIs(theme[themeName].firstAvatar)),
    avatar(nameIs(theme[themeName].secondAvatar))
];
export {theme};
export default players;