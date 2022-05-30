export const _getRandomBytes = () => {
    var bs = [];
    for (var i = 0; i < 32; i++) {
        bs.push(Math.floor(Math.random() * 256));
    }
    return bs;
};
export function PrincipalToShow(principalText : string){
    return principalText.substring(0,10) + "..." +principalText.substring(principalText.length-3)
}
