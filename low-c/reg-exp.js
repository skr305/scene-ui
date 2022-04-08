const varReg = /(\$\w+)/g;
const fakeDocs = `
    hello every night
    $MyFaultx 2333
    er $NewBalance
`;
console.log( varReg.test( fakeDocs ) );
console.log( fakeDocs.replace( varReg, ( v, ...args ) => {
        console.log( v, args[0], "\n" );
        return "HAYAYI"
} ) );
const boot = () => {
    {
        console.log( 233 );
    }
};
boot();