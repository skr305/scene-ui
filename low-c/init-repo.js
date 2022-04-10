const { resolve } = require( 'path' );
const { fileDrag } = require( './file-drag' );
const boot = async () => {
    const toPath = process.argv[2];
    if( !toPath ) {
        console.error( "BAD INPUT PATH" );
        return;
    }
    const standardToPath = resolve( toPath );
    await fileDrag( __dirname + "/../low-c", standardToPath, [ "node_modules" ] );
};
boot();