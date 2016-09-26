module.exports = {
    __hasValue: function(val) {
        return val !== undefined && val !== null;
    },
    findMidPoint: function(x,y) {
        return (parseFloat(x)+parseFloat(y)) / 2;
    },
    kilometerToNauticalMile: function(distanceInKm) {
        if (distanceInKm) {
            var kilometerToNauticalMile = 0.539957;
            return parseInt(distanceInKm.replace(',','')) * kilometerToNauticalMile;
        } else {
            return distanceInKm;
        }
    }
};