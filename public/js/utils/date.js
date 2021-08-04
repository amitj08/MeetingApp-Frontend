function formatDate( isoDate ) {
    const date = new Date( isoDate );
    return date.toString().substr( 0, 10 );
}

function formatDateLong( isoDate ) {
    const date = new Date( isoDate );
    return date.toString().substr( 0, 15 );
}

export {
    // eslint-disable-next-line
    formatDate,
    formatDateLong
};