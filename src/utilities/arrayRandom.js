

const arrayRandom = (arrayParam)=>{
    const tab = [...arrayParam];
    const result = [];
    for (let i =tab.length; i>0;i--){
        result.push(tab.splice(Math.random()*i,1)[0]);
    }
    return result;
}

export default arrayRandom;