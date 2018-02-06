var slice = Array.prototype.slice;
var m = module.exports;
m['def'] = function () {
    var name = arguments[0];
    var value = arguments[1];
    return {
        type: 'list',
        values: Array.prototype.concat([{
                type: 'atom',
                value: 'var'
            }], [name], [value])
    };
};
m['defn'] = function () {
    var name = arguments[0];
    var params = arguments[1];
    var body = this.list.apply(null, slice.call(arguments, 2));
    return {
        type: 'list',
        values: Array.prototype.concat([{
                type: 'atom',
                value: 'var'
            }], [name], [{
                type: 'list',
                values: Array.prototype.concat([{
                        type: 'atom',
                        value: 'lambda'
                    }], [params], body.values)
            }])
    };
};
m['defmethod'] = function () {
    var obj = arguments[0];
    var name = arguments[1];
    var params = arguments[2];
    var body = this.list.apply(null, slice.call(arguments, 3));
    return {
        type: 'list',
        values: Array.prototype.concat([{
                type: 'atom',
                value: '='
            }], [{
                type: 'list',
                values: Array.prototype.concat([{
                        type: 'atom',
                        value: '.'
                    }], [obj], [name])
            }], [{
                type: 'list',
                values: Array.prototype.concat([{
                        type: 'atom',
                        value: 'lambda'
                    }], [params], body.values)
            }])
    };
};
m['defarray'] = function () {
    var name = arguments[0];
    var body = this.list.apply(null, slice.call(arguments, 1));
    return {
        type: 'list',
        values: Array.prototype.concat([{
                type: 'atom',
                value: 'var'
            }], [name], [{
                type: 'list',
                values: Array.prototype.concat([{
                        type: 'atom',
                        value: 'array'
                    }], body.values)
            }])
    };
};
m['defobject'] = function () {
    var name = arguments[0];
    var body = this.list.apply(null, slice.call(arguments, 1));
    return {
        type: 'list',
        values: Array.prototype.concat([{
                type: 'atom',
                value: 'var'
            }], [name], [{
                type: 'list',
                values: Array.prototype.concat([{
                        type: 'atom',
                        value: 'object'
                    }], body.values)
            }])
    };
};
