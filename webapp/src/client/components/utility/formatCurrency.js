export const formatCurrency = (price, currency = '$') => {
    if (price !== "" && price !== null && typeof (price) != 'undefined') {
        return currency + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else {
        return ''
    }
}