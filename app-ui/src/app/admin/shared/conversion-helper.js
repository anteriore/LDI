function ConversionHelper() {

    this.convert = function(unit1, unit2, values) {
        if (unit1==="kg" && unit2==="ml") {
            return kgToML(values[0], values[1]);
        } else if (unit1==="gm" && unit2==="ml") {
            return gmToML(values[0], values[1]);
        } else if (unit1==="ml" && unit2==="kg") {
            return mlToKg(values[0], values[1]);
        } else if (unit1==="ml" && unit2==="g") {
            return mlToG(values[0], values[1]);
        } else if (unit1==="g" && unit2==="ltr") {
            return gToLtr(values[0], values[1]);
        } else if (unit1==="ltr" && unit2==="g") {
            return ltrToG(values[0], values[1]);
        } else if (unit1==="ml" && unit2==="mg") {
            return mlToMG(values[0], values[1]);
        }

        return -1;
    }


	this.kgToML = function(unitInKg, specificGravity) {
		return (unitInKg / specificGravity) * 1000;
	};

	this.gmToML = function(quantity, specificGravity) {
		return ((quantity / 1000) / specificGravity) * 1000;
    };
    
    this.mlToKg = function(ml, specificGravity) {
		return ((ml / 1000) * specificGravity);
    };
    
    this.mlToG = function(quantity, specificGravity) {
		return ((quantity / 1000) * specificGravity) * 1000;
    };
    
    this.gToLtr = function(quantity, specificGravity) {
		return ((quantity / 1000) / specificGravity);
    };
    
    this.ltrToG = function(quantity, specificGravity) {
		return ((quantity * specificGravity) * 1000);
    };
    
    this.mlToMG = function(quantity, specificGravity) {
		return ((quantity * specificGravity) * 1000);
	};
}

/**
 * @ngdoc service
 * @name ConversionHelper
 * @module conversion.helper
 *
 */
angular.module('admin.shared').service('ConversionHelper', ConversionHelper);
