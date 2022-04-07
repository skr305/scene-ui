export const removeRepeatInPlace = <T>( array: T[] ) => {
    const emitMap = {};
    array.map( ( ele, idx ) => {
        const key = JSON.stringify( ele );
        if( !emitMap[ key] ) {
            emitMap[key] = true;
        } else {
            array.splice( idx, 1 );
        }
    });
    return array;
}