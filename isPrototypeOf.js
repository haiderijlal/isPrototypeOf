    
(function(){
    
    function isPrototypeOf(parentObject, childObject){
        
        if(typeof parentObject !== 'object' || typeof childObject !== 'object'){
            throw new TypeError('Invalid function parameter')
        }

        if(parentObject === null || childObject === null){
            throw new TypeError('Invalid function parameter. Type of function parameter is null')
        }
        
        if(Object.getPrototypeOf(childObject) === null){
            return false;

        }else{
            if(Object.getPrototypeOf(childObject) === parentObject){
                return true;
            }

            return isPrototypeOf(parentObject, Object.getPrototypeOf(childObject))
        }

    }

    window.isPrototypeOf = isPrototypeOf;
})();    
    