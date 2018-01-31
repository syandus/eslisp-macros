var slice = Array.prototype.slice;
var counter = 0;
function gensym(description) {
    return '___' + (description ? description : 'symbol') + counter++;
}
var commonMacros = {
    when: function () {
        var cond = arguments[0];
        var body = this.list.apply(null, slice.call(arguments, 1));
        return {
            type: 'list',
            values: Array.prototype.concat([{
                    type: 'atom',
                    value: 'if'
                }], [cond], [{
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: 'block'
                        }], body.values)
                }])
        };
    },
    unless: function () {
        var cond = arguments[0];
        var body = this.list.apply(null, slice.call(arguments, 1));
        return {
            type: 'list',
            values: Array.prototype.concat([{
                    type: 'atom',
                    value: 'if'
                }], [{
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: '!'
                        }], [cond])
                }], [{
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: 'block'
                        }], body.values)
                }])
        };
    },
    not: function () {
        return {
            type: 'list',
            values: Array.prototype.concat([{
                    type: 'atom',
                    value: '!'
                }], [arguments[0]])
        };
    },
    and: function () {
        return {
            type: 'list',
            values: Array.prototype.concat([{
                    type: 'atom',
                    value: '&&'
                }], this.list.apply(null, arguments).values)
        };
    },
    doarray: function () {
        var indexVariable = this.atom(gensym('index'));
        var lengthVariable = this.atom(gensym('length'));
        var args = arguments[0].values;
        var value = args[0];
        var coll = args[1];
        var body = this.list.apply(null, slice.call(arguments, 1));
        return {
            type: 'list',
            values: Array.prototype.concat([{
                    type: 'atom',
                    value: 'block'
                }], [{
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: 'var'
                        }], [indexVariable])
                }], [{
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: 'var'
                        }], [lengthVariable])
                }], [{
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: 'for'
                        }], [{
                            type: 'list',
                            values: Array.prototype.concat([{
                                    type: 'atom',
                                    value: 'seq'
                                }], [{
                                    type: 'list',
                                    values: Array.prototype.concat([{
                                            type: 'atom',
                                            value: '='
                                        }], [indexVariable], [{
                                            type: 'atom',
                                            value: '0'
                                        }])
                                }], [{
                                    type: 'list',
                                    values: Array.prototype.concat([{
                                            type: 'atom',
                                            value: '='
                                        }], [lengthVariable], [{
                                            type: 'list',
                                            values: Array.prototype.concat([{
                                                    type: 'atom',
                                                    value: '.'
                                                }], [coll], [{
                                                    type: 'atom',
                                                    value: 'length'
                                                }])
                                        }])
                                }])
                        }], [{
                            type: 'list',
                            values: Array.prototype.concat([{
                                    type: 'atom',
                                    value: '<'
                                }], [indexVariable], [lengthVariable])
                        }], [{
                            type: 'list',
                            values: Array.prototype.concat([{
                                    type: 'atom',
                                    value: '++'
                                }], [indexVariable])
                        }], [{
                            type: 'list',
                            values: Array.prototype.concat([{
                                    type: 'atom',
                                    value: 'var'
                                }], [value], [{
                                    type: 'list',
                                    values: Array.prototype.concat([{
                                            type: 'atom',
                                            value: 'get'
                                        }], [coll], [indexVariable])
                                }])
                        }], body.values)
                }])
        };
    },
    doobject: function () {
        var args = arguments[0].values;
        var key = args[0];
        var value = args[1];
        var coll = args[2];
        var body = this.list.apply(null, slice.call(arguments, 1));
        var collEvaled = this.atom(gensym('object'));
        return {
            type: 'list',
            values: Array.prototype.concat([{
                    type: 'atom',
                    value: 'block'
                }], [{
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: 'var'
                        }], [collEvaled], [coll])
                }], [{
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: 'forin'
                        }], [{
                            type: 'list',
                            values: Array.prototype.concat([{
                                    type: 'atom',
                                    value: 'var'
                                }], [key])
                        }], [collEvaled], [{
                            type: 'list',
                            values: Array.prototype.concat([{
                                    type: 'atom',
                                    value: 'if'
                                }], [{
                                    type: 'list',
                                    values: Array.prototype.concat([{
                                            type: 'atom',
                                            value: '!'
                                        }], [{
                                            type: 'list',
                                            values: Array.prototype.concat([{
                                                    type: 'list',
                                                    values: Array.prototype.concat([{
                                                            type: 'atom',
                                                            value: '.'
                                                        }], [{
                                                            type: 'atom',
                                                            value: 'Object'
                                                        }], [{
                                                            type: 'atom',
                                                            value: 'prototype'
                                                        }], [{
                                                            type: 'atom',
                                                            value: 'hasOwnProperty'
                                                        }], [{
                                                            type: 'atom',
                                                            value: 'call'
                                                        }])
                                                }], [collEvaled], [key])
                                        }])
                                }], [{
                                    type: 'list',
                                    values: Array.prototype.concat([{
                                            type: 'atom',
                                            value: 'continue'
                                        }])
                                }])
                        }], [{
                            type: 'list',
                            values: Array.prototype.concat([{
                                    type: 'atom',
                                    value: 'var'
                                }], [value], [{
                                    type: 'list',
                                    values: Array.prototype.concat([{
                                            type: 'atom',
                                            value: 'get'
                                        }], [collEvaled], [key])
                                }])
                        }], body.values)
                }])
        };
    },
    cond: function () {
        var parentForm;
        var form;
        var n = arguments.length;
        for (var i = 0; i < n; i += 2) {
            var conditional = arguments[i + 0];
            var consequent = arguments[i + 1];
            if (consequent === undefined) {
                form.values.push({
                    type: 'list',
                    values: Array.prototype.concat([{
                            type: 'atom',
                            value: 'block'
                        }], [conditional])
                });
                break;
            }
            var asdf = {
                type: 'list',
                values: Array.prototype.concat([{
                        type: 'atom',
                        value: 'if'
                    }], [conditional], [{
                        type: 'list',
                        values: Array.prototype.concat([{
                                type: 'atom',
                                value: 'block'
                            }], [consequent])
                    }])
            };
            if (parentForm === undefined) {
                parentForm = asdf;
                form = asdf;
            } else {
                form.values.push(asdf);
                form = asdf;
            }
        }
        return parentForm;
    }
};
module.exports = function () {
    return commonMacros;
}();
