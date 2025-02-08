// Custom function to separate comma
export const separateComma = (val: any) => {
    if (typeof (val) === 'string') {
        val = val?.split(',').join('');
    }
    val = val?.toString();
    var afterPoint = '';
    if (val?.indexOf('.') > 0)
        afterPoint = val.substring(val.indexOf('.'), val.length);
    val = Math.floor(val);
    val = val.toString();
    var lastThree = val.substring(val.length - 3);
    var otherNumbers = val.substring(0, val.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res
}

export const removeComma = (val: any) => {
    val = val?.split(',').join('');
    return val
}