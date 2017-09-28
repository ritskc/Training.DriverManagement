var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Exceptions;
(function (Exceptions) {
    var Exception = (function (_super) {
        __extends(Exception, _super);
        function Exception(exceptionType, message) {
            var _this;
            var prefix = "%c ";
            var color = "color: red";
            if (exceptionType == null || exceptionType.trim() === "")
                exceptionType = "Exception";
            if (message == null || message.trim() === "")
                message = "";
            exceptionType = exceptionType.trim();
            message = message.trim();
            console.log(prefix + exceptionType + ": " + message, color);
            var superMessage = exceptionType + " => " + message;
            _this = _super.call(this, superMessage) || this;
            _this._type = exceptionType;
            _this._message = message;
            return _this;
        }
        Object.defineProperty(Exception.prototype, "Type", {
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Exception.prototype, "Message", {
            get: function () { return this._message; },
            enumerable: true,
            configurable: true
        });
        return Exception;
    }(Error));
    Exceptions.Exception = Exception;
    var ApplicationException = (function (_super) {
        __extends(ApplicationException, _super);
        function ApplicationException(message) {
            var _this;
            if (message == null || message.trim() === "")
                message = "";
            _this = _super.call(this, "ApplicationException", message) || this;
            return _this;
        }
        return ApplicationException;
    }(Exception));
    Exceptions.ApplicationException = ApplicationException;
    var ArgumentException = (function (_super) {
        __extends(ArgumentException, _super);
        function ArgumentException(name, reason) {
            var _this;
            if (name == null || name.trim() === "")
                name = "<UNKNOWN>";
            if (reason == null || reason.trim() === "")
                reason = "is not valid";
            var message = "Argument '" + name + "' " + reason + ".";
            _this = _super.call(this, "ArgumentException", message) || this;
            return _this;
        }
        return ArgumentException;
    }(Exception));
    Exceptions.ArgumentException = ArgumentException;
    var ArgumentNullException = (function (_super) {
        __extends(ArgumentNullException, _super);
        function ArgumentNullException(name) {
            var _this;
            if (name == null || name.trim() === "")
                name = "";
            var message = "Argument '" + name + "' is NULL.";
            _this = _super.call(this, "ArgumentNullException", message) || this;
            return _this;
        }
        return ArgumentNullException;
    }(Exception));
    Exceptions.ArgumentNullException = ArgumentNullException;
    var InvalidArgumentException = (function (_super) {
        __extends(InvalidArgumentException, _super);
        function InvalidArgumentException(name) {
            var _this;
            if (name == null || name.trim() === "")
                name = "";
            var message = "Argument '" + name + "' is invalid.";
            _this = _super.call(this, "InvalidArgumentException", message) || this;
            return _this;
        }
        return InvalidArgumentException;
    }(Exception));
    Exceptions.InvalidArgumentException = InvalidArgumentException;
    var InvalidOperationException = (function (_super) {
        __extends(InvalidOperationException, _super);
        function InvalidOperationException(operation) {
            var _this;
            if (operation == null || operation.trim() === "")
                operation = "";
            var message = "Operation '" + operation + "' is invalid.";
            _this = _super.call(this, "InvalidOperationException", message) || this;
            return _this;
        }
        return InvalidOperationException;
    }(Exception));
    Exceptions.InvalidOperationException = InvalidOperationException;
    var HttpException = (function () {
        function HttpException(status, data) {
            var exceptionType = "HttpException";
            var message = "Status " + status;
            var prefix = "%c ";
            var color = "color: red";
            exceptionType = exceptionType.trim();
            message = message.trim();
            console.log(prefix + exceptionType + ": " + message, color);
            this._status = status;
            this._data = data;
        }
        Object.defineProperty(HttpException.prototype, "Status", {
            get: function () { return this._status; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HttpException.prototype, "Data", {
            get: function () { return this._data; },
            enumerable: true,
            configurable: true
        });
        return HttpException;
    }());
    Exceptions.HttpException = HttpException;
})(Exceptions || (Exceptions = {}));
var DefProg;
(function (DefProg) {
    function For(arg, argName) {
        return new Ensurer(arg, argName);
    }
    DefProg.For = For;
    var Ensurer = (function () {
        function Ensurer(arg, argName) {
            this._arg = arg;
            this._argName = this.GetArgName(argName);
        }
        Ensurer.prototype.IsNotNull = function () {
            if (this._arg == null || this._arg == undefined)
                throw new Exceptions.ArgumentNullException(this._argName);
            return this;
        };
        Ensurer.prototype.Ensure = function (func, reason) {
            if (!func(this._arg)) {
                if (reason != null && reason.trim().length > 0)
                    throw new Exceptions.ArgumentException(this._argName, reason.trim());
                throw new Exceptions.InvalidArgumentException(this._argName);
            }
            return this;
        };
        Ensurer.prototype.GetArgName = function (argName) {
            if (argName == null || typeof argName !== "string" || argName.trim().length === 0)
                return "<UNKNOWN>";
            return argName.trim();
        };
        return Ensurer;
    }());
})(DefProg || (DefProg = {}));
var Ext;
(function (Ext) {
    var ArrayExt = (function () {
        function ArrayExt() {
        }
        ArrayExt.Find = function (array, predicate) {
            for (var i = 0; i < array.length; i++) {
                if (predicate(array[i])) {
                    return array[i];
                }
            }
            return null;
        };
        ArrayExt.First = function (array, predicate) {
            var result = null;
            if (predicate != null) {
                for (var i = 0; i < array.length; i++) {
                    if (predicate(array[i])) {
                        result = array[i];
                        break;
                    }
                }
            }
            else {
                for (var j = 0; j < array.length; j++) {
                    result = array[j];
                    break;
                }
            }
            if (result == null)
                throw "No items in collection or none that satisfy condition.";
            return result;
        };
        ArrayExt.FirstOrDefault = function (array, predicate) {
            var result = null;
            if (predicate != null) {
                for (var i = 0; i < array.length; i++) {
                    if (predicate(array[i])) {
                        result = array[i];
                        break;
                    }
                }
            }
            else {
                for (var j = 0; j < array.length; j++) {
                    result = array[j];
                    break;
                }
            }
            return result;
        };
        ArrayExt.ForEach = function (array, action) {
            for (var i = 0; i < array.length; i++) {
                action(array[i]);
            }
        };
        ArrayExt.Any = function (array, predicate) {
            if (predicate == null) {
                return array.length > 0;
            }
            for (var i = 0; i < array.length; i++) {
                if (predicate(array[i])) {
                    return true;
                }
            }
            return false;
        };
        ArrayExt.All = function (array, predicate) {
            for (var i = 0; i < array.length; i++) {
                if (predicate(array[i])) {
                    continue;
                }
                else {
                    return false;
                }
            }
            return true;
            ;
        };
        ArrayExt.Where = function (array, predicate) {
            var result = [];
            for (var i = 0; i < array.length; i++) {
                if (predicate(array[i])) {
                    result.push(array[i]);
                }
            }
            return result;
        };
        ArrayExt.Remove = function (array, value) {
            var index = array.indexOf(value);
            if (index < 0)
                return false;
            array.splice(index, 1);
            return true;
        };
        ArrayExt.OrderBy = function (array, compareFunc) {
            var internalArray = [];
            for (var i = 0; i < array.length; i++)
                internalArray.push(array[i]);
            internalArray.sort(function (a, b) {
                var valA = compareFunc(a);
                var valB = compareFunc(b);
                if (valA < valB)
                    return -1;
                if (valA > valB)
                    return 1;
                return 0;
            });
            return internalArray;
        };
        ArrayExt.OrderByDescending = function (array, compareFunc) {
            var internalArray = [];
            for (var i = 0; i < array.length; i++)
                internalArray.push(array[i]);
            internalArray.sort(function (a, b) {
                var valA = compareFunc(a);
                var valB = compareFunc(b);
                if (valB < valA)
                    return -1;
                if (valB > valA)
                    return 1;
                return 0;
            });
            return internalArray;
        };
        ArrayExt.Select = function (array, selectFunc) {
            var internalArray = [];
            for (var i = 0; i < array.length; i++)
                internalArray.push(selectFunc(array[i]));
            return internalArray;
        };
        ArrayExt.SelectMany = function (array, selectFunc) {
            var result = [];
            for (var i = 0; i < array.length; i++) {
                var internalArray = selectFunc(array[i]);
                for (var j = 0; j < internalArray.length; j++) {
                    result.push(internalArray[j]);
                }
            }
            return result;
        };
        ArrayExt.Clear = function (array) {
            while (array.length > 0) {
                array.pop();
            }
        };
        ArrayExt.Add = function (array, value) {
            array.push(value);
        };
        ArrayExt.AddRange = function (array, range) {
            for (var i = 0; i < range.length; i++) {
                array.push(range[i]);
            }
        };
        ArrayExt.Contains = function (array, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value)
                    return true;
            }
            return false;
        };
        ArrayExt.ToList = function (array) {
            var result = new Array();
            for (var i = 0; i < array.length; i++)
                result.push(array[i]);
            return result;
        };
        ArrayExt.Count = function (array, predicate) {
            if (predicate == null) {
                return array.length;
            }
            else {
                var count = 0;
                for (var i = 0; i < array.length; i++) {
                    if (predicate(array[i]))
                        count++;
                }
                return count;
            }
        };
        return ArrayExt;
    }());
    Ext.ArrayExt = ArrayExt;
})(Ext || (Ext = {}));
Object.defineProperty(Array.prototype, "Find", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate) {
        return Ext.ArrayExt.Find(this, predicate);
    }
});
Object.defineProperty(Array.prototype, "First", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate) {
        return Ext.ArrayExt.First(this, predicate);
    }
});
Object.defineProperty(Array.prototype, "FirstOrDefault", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate) {
        return Ext.ArrayExt.FirstOrDefault(this, predicate);
    }
});
Object.defineProperty(Array.prototype, "ForEach", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (action) {
        return Ext.ArrayExt.ForEach(this, action);
    }
});
Object.defineProperty(Array.prototype, "Any", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate) {
        return Ext.ArrayExt.Any(this, predicate);
    }
});
Object.defineProperty(Array.prototype, "All", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate) {
        return Ext.ArrayExt.All(this, predicate);
    }
});
Object.defineProperty(Array.prototype, "Where", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate) {
        return Ext.ArrayExt.Where(this, predicate);
    }
});
Object.defineProperty(Array.prototype, "Remove", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (value) {
        return Ext.ArrayExt.Remove(this, value);
    }
});
Object.defineProperty(Array.prototype, "OrderBy", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareFunc) {
        return Ext.ArrayExt.OrderBy(this, compareFunc);
    }
});
Object.defineProperty(Array.prototype, "OrderByDescending", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (compareFunc) {
        return Ext.ArrayExt.OrderByDescending(this, compareFunc);
    }
});
Object.defineProperty(Array.prototype, "Select", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (selectFunc) {
        return Ext.ArrayExt.Select(this, selectFunc);
    }
});
Object.defineProperty(Array.prototype, "SelectMany", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (selectFunc) {
        return Ext.ArrayExt.SelectMany(this, selectFunc);
    }
});
Object.defineProperty(Array.prototype, "Clear", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return Ext.ArrayExt.Clear(this);
    }
});
Object.defineProperty(Array.prototype, "Add", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (value) {
        return Ext.ArrayExt.Add(this, value);
    }
});
Object.defineProperty(Array.prototype, "AddRange", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (rangeArray) {
        return Ext.ArrayExt.AddRange(this, rangeArray);
    }
});
Object.defineProperty(Array.prototype, "Contains", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (value) {
        return Ext.ArrayExt.Contains(this, value);
    }
});
Object.defineProperty(Array.prototype, "ToList", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return Ext.ArrayExt.ToList(this);
    }
});
Object.defineProperty(Array.prototype, "Count", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (predicate) {
        return Ext.ArrayExt.Count(this, predicate);
    }
});
var Ext;
(function (Ext) {
    var StringExt = (function () {
        function StringExt() {
        }
        StringExt.HasValue = function (value) {
            if (value != null) {
                if (!(typeof value === "string"))
                    throw "Argument Exception: Argument is not of type string.";
                return value.trim().length > 0;
            }
            return false;
        };
        StringExt.Contains = function (primary, sub) {
            StringExt.ValidateArgument(primary, "primary");
            StringExt.ValidateArgument(sub, "sub");
            if (primary.indexOf(sub) !== -1)
                return true;
            return false;
        };
        StringExt.StartsWith = function (primary, sub) {
            StringExt.ValidateArgument(primary, "primary");
            StringExt.ValidateArgument(sub, "sub");
            if (primary.indexOf(sub) === 0)
                return true;
            return false;
        };
        StringExt.EndsWith = function (primary, sub) {
            StringExt.ValidateArgument(primary, "primary");
            StringExt.ValidateArgument(sub, "sub");
            var index = primary.lastIndexOf(sub);
            if ((index + sub.length) === primary.length)
                return true;
            return false;
        };
        StringExt.ExtractNumbers = function (value) {
            if (value == null)
                return null;
            if (StringExt.HasValue(value))
                return value.replace(/[^0-9]/g, '');
            return "";
        };
        StringExt.Format = function (formatString) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var result = formatString;
            if (result == null)
                return null;
            if (params == null)
                return result;
            for (var i = 0; i < params.length; i++) {
                var format = "{" + i.toString() + "}";
                while (StringExt.Contains(result, format)) {
                    result = result.replace(format, params[i].toString());
                }
            }
            return result;
        };
        StringExt.ValidateArgument = function (argument, name) {
            if (argument == null)
                throw "Argument Exception: Argument " + name + " is null.";
            if (!(typeof argument === "string"))
                throw "Argument Exception: Argument " + name + " is not of type string.";
        };
        return StringExt;
    }());
    Ext.StringExt = StringExt;
})(Ext || (Ext = {}));
Object.defineProperty(String.prototype, "HasValue", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function () {
        return Ext.StringExt.HasValue(this);
    }
});
Object.defineProperty(String.prototype, "Contains", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return Ext.StringExt.Contains(this, sub);
    }
});
Object.defineProperty(String.prototype, "StartsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return Ext.StringExt.StartsWith(this, sub);
    }
});
Object.defineProperty(String.prototype, "EndsWith", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (sub) {
        return Ext.StringExt.EndsWith(this, sub);
    }
});
var Ext;
(function (Ext) {
    var ObjectExt = (function () {
        function ObjectExt() {
        }
        ObjectExt.Convert = function (source, tClass) {
            var target = new tClass();
            for (var key in source) {
                if (source.hasOwnProperty(key) && typeof source[key] != "function" && typeof target[key] != "function") {
                    target[key] = source[key];
                }
            }
            return target;
        };
        ObjectExt.Map = function (source, target) {
            for (var key in source) {
                if (source.hasOwnProperty(key) && typeof source[key] != "function" && typeof target[key] != "function") {
                    target[key] = source[key];
                }
            }
        };
        ObjectExt.ConvertUsingFactory = function (source, factoryFunction) {
            var target = factoryFunction();
            for (var key in source) {
                if (source.hasOwnProperty(key) && typeof source[key] != "function" && typeof target[key] != "function") {
                    target[key] = source[key];
                }
            }
            return target;
        };
        ObjectExt.GetTypeName = function (object) {
            if (object == null)
                return null;
            if (typeof object === "object") {
                var value = ObjectExt.GetFuncName(object.constructor.toString());
                if (value === "n Object")
                    return "Object";
                else
                    return value;
            }
            else if (typeof object === "function") {
                return ObjectExt.GetFuncName(object.toString());
            }
            return (typeof object);
        };
        ObjectExt.GetValue = function (obj, key) {
            if (!obj)
                return null;
            if (!Ext.StringExt.HasValue(key))
                return obj;
            if (!Ext.StringExt.Contains(key, "."))
                return obj[key];
            var splitted = key.split(".");
            var current = obj;
            for (var i = 0; i < splitted.length; i++) {
                if (!current)
                    return null;
                current = current[splitted[i]];
            }
            return current;
        };
        ObjectExt.GetFuncName = function (value) {
            var name = value.substr("function".length);
            name = name.substr(0, name.indexOf("("));
            name = name.trim();
            return name;
        };
        return ObjectExt;
    }());
    Ext.ObjectExt = ObjectExt;
})(Ext || (Ext = {}));
var Models;
(function (Models) {
    var Dictionary = (function () {
        function Dictionary() {
        }
        return Dictionary;
    }());
    Models.Dictionary = Dictionary;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var KeyValuePair = (function () {
        function KeyValuePair(key, value) {
            this.Key = key;
            this.Value = value;
        }
        return KeyValuePair;
    }());
    Models.KeyValuePair = KeyValuePair;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var Link = (function () {
        function Link() {
        }
        return Link;
    }());
    Models.Link = Link;
    var HypermediaModel = (function () {
        function HypermediaModel() {
            this.Links = new Models.Dictionary();
        }
        return HypermediaModel;
    }());
    Models.HypermediaModel = HypermediaModel;
    var CollectionHypermediaModel = (function (_super) {
        __extends(CollectionHypermediaModel, _super);
        function CollectionHypermediaModel() {
            return _super.apply(this, arguments) || this;
        }
        return CollectionHypermediaModel;
    }(HypermediaModel));
    Models.CollectionHypermediaModel = CollectionHypermediaModel;
    var PagedHypermediaModel = (function (_super) {
        __extends(PagedHypermediaModel, _super);
        function PagedHypermediaModel() {
            return _super.apply(this, arguments) || this;
        }
        return PagedHypermediaModel;
    }(CollectionHypermediaModel));
    Models.PagedHypermediaModel = PagedHypermediaModel;
})(Models || (Models = {}));
var Helpers;
(function (Helpers) {
    var UrlHelper = (function () {
        function UrlHelper() {
        }
        UrlHelper.GenerateUrl = function (urlTemplate, param) {
            urlTemplate = urlTemplate.trim();
            var templateParams = [];
            var startFound = false;
            var startIndex = 0;
            for (var i = 0; i < urlTemplate.length; i++) {
                if (urlTemplate[i] === "{") {
                    if (startFound)
                        throw "Invalid URL template.";
                    startFound = true;
                    startIndex = i + 1;
                }
                else if (urlTemplate[i] === "}") {
                    if (!startFound)
                        throw "Invalid URL template.";
                    var value = urlTemplate.substring(startIndex, i);
                    value = value.trim();
                    if (templateParams.Any(function (t) { return t === value; }))
                        throw "Invalid URL template.";
                    templateParams.Add(value);
                    startFound = false;
                }
            }
            for (var j = 0; j < templateParams.length; j++) {
                var templateParam = "{" + templateParams[j] + "}";
                var value2 = param[templateParams[j]];
                if (value2 == null)
                    value2 = "";
                urlTemplate = urlTemplate.replace(templateParam, value2);
            }
            return urlTemplate;
        };
        return UrlHelper;
    }());
    Helpers.UrlHelper = UrlHelper;
})(Helpers || (Helpers = {}));
var Validation;
(function (Validation) {
    var ValidationRule = (function () {
        function ValidationRule() {
            this._overrideError = false;
        }
        Object.defineProperty(ValidationRule.prototype, "Error", {
            get: function () {
                if (this._validationRule != null && !this._overrideError)
                    return this._validationRule.Error;
                else if (this._validator != null && !this._overrideError)
                    return this._validator.Errors;
                else
                    return this._error;
            },
            enumerable: true,
            configurable: true
        });
        ValidationRule.prototype.Ensure = function (tpropertyValidationPredicate) {
            if (tpropertyValidationPredicate == null)
                throw "Argument 'propertyValidationPredicate' is NULL.";
            this._tpropertyValidationPredicate = tpropertyValidationPredicate;
            this._error = "Invalid value";
        };
        ValidationRule.prototype.EnsureT = function (tValidationPredicate) {
            if (tValidationPredicate == null)
                throw "Argument 'valueValidationPredicate' is NULL.";
            this._tValidationPredicate = tValidationPredicate;
            this._error = "Invalid value";
        };
        ValidationRule.prototype.UseValidationRule = function (validationRule) {
            if (validationRule == null)
                throw "Argument 'validationRule' is NULL.";
            this._validationRule = validationRule;
        };
        ValidationRule.prototype.UseValidator = function (validator) {
            if (validator == null)
                throw "Argument 'validator' is NULL.";
            this._validator = validator;
        };
        ValidationRule.prototype.If = function (conditionPredicate) {
            if (conditionPredicate == null)
                throw "Argument 'conditionPredicate' is NULL.";
            this._conditionPredicate = conditionPredicate;
        };
        ValidationRule.prototype.WithMessage = function (errorMessage) {
            if (!Ext.StringExt.HasValue(errorMessage))
                throw "Argument 'errorMessage' is NULL.";
            this._error = errorMessage;
            this._overrideError = true;
        };
        ValidationRule.prototype.Validate = function (value, propertyValue) {
            if (this._conditionPredicate != null && !this._conditionPredicate(value))
                return true;
            if (this._tpropertyValidationPredicate != null)
                return this._tpropertyValidationPredicate(propertyValue);
            if (this._tValidationPredicate != null)
                return this._tValidationPredicate(value);
            if (this._validationRule != null)
                return this._validationRule.Validate(propertyValue);
            if (this._validator != null) {
                this._validator.Validate(propertyValue);
                return !this._validator.HasErrors;
            }
            throw "Improper Valdiation.";
        };
        return ValidationRule;
    }());
    Validation.ValidationRule = ValidationRule;
})(Validation || (Validation = {}));
var Validation;
(function (Validation) {
    var PropertyValidator = (function () {
        function PropertyValidator(propertyName) {
            this._validationRules = [];
            this._propertyName = propertyName;
        }
        Object.defineProperty(PropertyValidator.prototype, "PropertyName", {
            get: function () { return this._propertyName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyValidator.prototype, "HasError", {
            get: function () { return this._hasError; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyValidator.prototype, "Error", {
            get: function () { return this._error; },
            enumerable: true,
            configurable: true
        });
        PropertyValidator.prototype.Validate = function (value) {
            this._hasError = false;
            this._error = null;
            var val = value;
            var propertyVal = Ext.ObjectExt.GetValue(val, this._propertyName);
            for (var i = 0; i < this._validationRules.length; i++) {
                var validationRule = this._validationRules[i];
                var validationResult = true;
                try {
                    validationResult = validationRule.Validate(val, propertyVal);
                }
                catch (e) {
                    if (e === "OPTIONAL")
                        break;
                }
                if (!validationResult) {
                    this._hasError = true;
                    this._error = validationRule.Error;
                    break;
                }
            }
        };
        PropertyValidator.prototype.IsRequired = function () {
            this._lastValidationRule = new Validation.ValidationRule();
            this._lastValidationRule.Ensure(function (propertyValue) {
                if (propertyValue != null) {
                    if ((typeof propertyValue) === "string") {
                        return Ext.StringExt.HasValue(propertyValue);
                    }
                    return true;
                }
                return false;
            });
            this._lastValidationRule.WithMessage("Required");
            this._validationRules.Add(this._lastValidationRule);
            return this;
        };
        PropertyValidator.prototype.IsOptional = function () {
            this._lastValidationRule = new Validation.ValidationRule();
            this._lastValidationRule.Ensure(function (propertyValue) {
                if (propertyValue == null)
                    throw "OPTIONAL";
                if ((typeof propertyValue) === "string" && !Ext.StringExt.HasValue(propertyValue))
                    throw "OPTIONAL";
                return true;
            });
            this._validationRules.Add(this._lastValidationRule);
            return this;
        };
        PropertyValidator.prototype.Ensure = function (propertyValidationPredicate) {
            this._lastValidationRule = new Validation.ValidationRule();
            this._lastValidationRule.Ensure(propertyValidationPredicate);
            this._validationRules.Add(this._lastValidationRule);
            return this;
        };
        PropertyValidator.prototype.EnsureT = function (valueValidationPredicate) {
            this._lastValidationRule = new Validation.ValidationRule();
            this._lastValidationRule.EnsureT(valueValidationPredicate);
            this._validationRules.Add(this._lastValidationRule);
            return this;
        };
        PropertyValidator.prototype.UseValidationRule = function (validationRule) {
            this._lastValidationRule = new Validation.ValidationRule();
            this._lastValidationRule.UseValidationRule(validationRule);
            this._validationRules.Add(this._lastValidationRule);
            return this;
        };
        PropertyValidator.prototype.UseValidator = function (validator) {
            this._lastValidationRule = new Validation.ValidationRule();
            this._lastValidationRule.UseValidator(validator);
            this._validationRules.Add(this._lastValidationRule);
            return this;
        };
        PropertyValidator.prototype.If = function (conditionPredicate) {
            if (this._lastValidationRule == null)
                throw "No target Validation Rule specified for the condition.";
            this._lastValidationRule.If(conditionPredicate);
            return this;
        };
        PropertyValidator.prototype.WithMessage = function (errorMessage) {
            if (this._lastValidationRule == null)
                throw "No target Validation Rule specified for the condition.";
            this._lastValidationRule.WithMessage(errorMessage);
            return this;
        };
        return PropertyValidator;
    }());
    Validation.PropertyValidator = PropertyValidator;
})(Validation || (Validation = {}));
var Validation;
(function (Validation) {
    var Validator = (function () {
        function Validator() {
            this._propertyValidators = [];
            this._hasErrors = false;
            this._errors = new Object();
        }
        Object.defineProperty(Validator.prototype, "IsValid", {
            get: function () { return !this._hasErrors; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Validator.prototype, "HasErrors", {
            get: function () { return this._hasErrors; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Validator.prototype, "Errors", {
            get: function () { return this._errors; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Validator.prototype, "HasRules", {
            get: function () { return this._propertyValidators.length > 0; },
            enumerable: true,
            configurable: true
        });
        Validator.prototype.For = function (propertyName) {
            if (this._propertyValidators.Any(function (t) { return t.PropertyName === propertyName; }))
                throw Ext.StringExt.Format("Exception: Validation already defined for Property '{0}'.", propertyName);
            var propertyValidator = new Validation.PropertyValidator(propertyName);
            this._propertyValidators.Add(propertyValidator);
            return propertyValidator;
        };
        Validator.prototype.Validate = function (value) {
            var _this = this;
            this._hasErrors = false;
            this._errors = new Object();
            this._propertyValidators.ForEach(function (t) {
                t.Validate(value);
                if (t.HasError) {
                    _this._hasErrors = true;
                    _this._errors[t.PropertyName] = t.Error;
                }
            });
            if (this._hasErrors && Core.AngularModule.IsDebug)
                console.log(this._errors);
        };
        return Validator;
    }());
    Validation.Validator = Validator;
})(Validation || (Validation = {}));
var Validation;
(function (Validation) {
    var CollectionValidationRule = (function () {
        function CollectionValidationRule(validator) {
            this._validator = validator;
        }
        Object.defineProperty(CollectionValidationRule.prototype, "Error", {
            get: function () { return this._error; },
            enumerable: true,
            configurable: true
        });
        CollectionValidationRule.prototype.Validate = function (collection) {
            var _this = this;
            var errors = [];
            collection.ForEach(function (item) {
                _this._validator.Validate(item);
                if (_this._validator.HasErrors)
                    errors.Add(_this._validator.Errors);
            });
            if (errors.Any()) {
                this._error = errors;
                return false;
            }
            return true;
        };
        return CollectionValidationRule;
    }());
    Validation.CollectionValidationRule = CollectionValidationRule;
})(Validation || (Validation = {}));
var Validation;
(function (Validation) {
    var Helpers = (function () {
        function Helpers() {
        }
        Helpers.IsString = function (value) {
            return angular.isString(value);
        };
        Helpers.IsNumber = function (value) {
            var parsed = +value.toString().trim();
            return !isNaN(parsed) && isFinite(parsed);
        };
        Helpers.IsDate = function (value) {
            return moment(value).isValid();
        };
        return Helpers;
    }());
    Validation.Helpers = Helpers;
})(Validation || (Validation = {}));
var Validation;
(function (Validation) {
    var BaseValidationRule = (function () {
        function BaseValidationRule() {
            this._validationRules = new Array();
        }
        Object.defineProperty(BaseValidationRule.prototype, "Error", {
            get: function () { return this._error; },
            enumerable: true,
            configurable: true
        });
        BaseValidationRule.prototype.Validate = function (value) {
            this._error = null;
            for (var i = 0; i < this._validationRules.length; i++) {
                if (this._validationRules[i].Validate(value))
                    continue;
                this._error = this._validationRules[i].Error;
                return false;
            }
            return true;
        };
        BaseValidationRule.prototype.AddValidationRule = function (validationRule) {
            this._validationRules.push(validationRule);
        };
        return BaseValidationRule;
    }());
    Validation.BaseValidationRule = BaseValidationRule;
    var StringValidationRule = (function (_super) {
        __extends(StringValidationRule, _super);
        function StringValidationRule() {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return angular.isString(t); },
                Error: "Invalid value"
            });
            return _this;
        }
        return StringValidationRule;
    }(BaseValidationRule));
    Validation.StringValidationRule = StringValidationRule;
    var StringHasMinLength = (function (_super) {
        __extends(StringHasMinLength, _super);
        function StringHasMinLength(minLength) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return t == null || t.trim().length >= minLength; },
                Error: Ext.StringExt.Format("Min length of {0} required", minLength)
            });
            return _this;
        }
        return StringHasMinLength;
    }(StringValidationRule));
    Validation.StringHasMinLength = StringHasMinLength;
    var StringHasMaxLength = (function (_super) {
        __extends(StringHasMaxLength, _super);
        function StringHasMaxLength(maxLength) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return t == null || t.trim().length <= maxLength; },
                Error: Ext.StringExt.Format("Max length of {0} required", maxLength)
            });
            return _this;
        }
        return StringHasMaxLength;
    }(StringValidationRule));
    Validation.StringHasMaxLength = StringHasMaxLength;
    var StringHasExactLength = (function (_super) {
        __extends(StringHasExactLength, _super);
        function StringHasExactLength(exactLength) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return t == null || t.trim().length == exactLength; },
                Error: Ext.StringExt.Format("Exact length of {0} required", exactLength)
            });
            return _this;
        }
        return StringHasExactLength;
    }(StringValidationRule));
    Validation.StringHasExactLength = StringHasExactLength;
    var StringIsIn = (function (_super) {
        __extends(StringIsIn, _super);
        function StringIsIn(values, ignoreCase) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return ignoreCase
                    ? Ext.ArrayExt.Any(values, function (v) { return v.trim().toLowerCase() === t.trim().toLowerCase(); })
                    : Ext.ArrayExt.Any(values, function (v) { return v.trim() === t.trim(); }); },
                Error: "Invalid value"
            });
            return _this;
        }
        return StringIsIn;
    }(StringValidationRule));
    Validation.StringIsIn = StringIsIn;
    var StringIsNotIn = (function (_super) {
        __extends(StringIsNotIn, _super);
        function StringIsNotIn(values, ignoreCase) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return ignoreCase
                    ? !Ext.ArrayExt.Any(values, function (v) { return v.trim().toLowerCase() === t.trim().toLowerCase(); })
                    : !Ext.ArrayExt.Any(values, function (v) { return v.trim() === t.trim(); }); },
                Error: "Invalid value"
            });
            return _this;
        }
        return StringIsNotIn;
    }(StringValidationRule));
    Validation.StringIsNotIn = StringIsNotIn;
    var StringIsEmail = (function (_super) {
        __extends(StringIsEmail, _super);
        function StringIsEmail() {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(t.trim());
                },
                Error: "Invalid value"
            });
            return _this;
        }
        return StringIsEmail;
    }(StringValidationRule));
    Validation.StringIsEmail = StringIsEmail;
    var StringContainsOnlyNumbers = (function (_super) {
        __extends(StringContainsOnlyNumbers, _super);
        function StringContainsOnlyNumbers() {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return Validation.Helpers.IsNumber(t); },
                Error: "Invalid value"
            });
            return _this;
        }
        return StringContainsOnlyNumbers;
    }(StringValidationRule));
    Validation.StringContainsOnlyNumbers = StringContainsOnlyNumbers;
    var StringIsPhoneOrFaxNumber = (function (_super) {
        __extends(StringIsPhoneOrFaxNumber, _super);
        function StringIsPhoneOrFaxNumber() {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return Validation.Helpers.IsNumber(t) && t.trim().length === 10; },
                Error: "Invalid value"
            });
            return _this;
        }
        return StringIsPhoneOrFaxNumber;
    }(StringValidationRule));
    Validation.StringIsPhoneOrFaxNumber = StringIsPhoneOrFaxNumber;
    var NumberValidationRule = (function (_super) {
        __extends(NumberValidationRule, _super);
        function NumberValidationRule() {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return Validation.Helpers.IsNumber(t); },
                Error: "Invalid value"
            });
            return _this;
        }
        return NumberValidationRule;
    }(BaseValidationRule));
    Validation.NumberValidationRule = NumberValidationRule;
    var NumberHasMinValue = (function (_super) {
        __extends(NumberHasMinValue, _super);
        function NumberHasMinValue(minValue) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return t >= minValue; },
                Error: Ext.StringExt.Format("Value cannot be less than {0}", minValue)
            });
            return _this;
        }
        return NumberHasMinValue;
    }(NumberValidationRule));
    Validation.NumberHasMinValue = NumberHasMinValue;
    var NumberHasMaxValue = (function (_super) {
        __extends(NumberHasMaxValue, _super);
        function NumberHasMaxValue(maxValue) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return t <= maxValue; },
                Error: Ext.StringExt.Format("Value cannot be greater than {0}", maxValue)
            });
            return _this;
        }
        return NumberHasMaxValue;
    }(NumberValidationRule));
    Validation.NumberHasMaxValue = NumberHasMaxValue;
    var NumberIsIn = (function (_super) {
        __extends(NumberIsIn, _super);
        function NumberIsIn(values) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return Ext.ArrayExt.Any(values, function (u) { return u === t; }); },
                Error: "Invalid value"
            });
            return _this;
        }
        return NumberIsIn;
    }(NumberValidationRule));
    Validation.NumberIsIn = NumberIsIn;
    var NumberIsNotIn = (function (_super) {
        __extends(NumberIsNotIn, _super);
        function NumberIsNotIn(values) {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return !Ext.ArrayExt.Any(values, function (u) { return u === t; }); },
                Error: "Invalid value"
            });
            return _this;
        }
        return NumberIsNotIn;
    }(NumberValidationRule));
    Validation.NumberIsNotIn = NumberIsNotIn;
    var DateValidationRule = (function (_super) {
        __extends(DateValidationRule, _super);
        function DateValidationRule() {
            var _this = _super.call(this) || this;
            _this.AddValidationRule({
                Validate: function (t) { return Validation.Helpers.IsDate(t); },
                Error: "Invalid value"
            });
            return _this;
        }
        return DateValidationRule;
    }(BaseValidationRule));
    Validation.DateValidationRule = DateValidationRule;
    var DateIsInFuture = (function (_super) {
        __extends(DateIsInFuture, _super);
        function DateIsInFuture(includePresent) {
            var _this = _super.call(this) || this;
            if (includePresent) {
                _this.AddValidationRule({
                    Validate: function (t) {
                        var val = t;
                        if (typeof val === "string")
                            val = new Date(val);
                        return moment().diff(moment(val), "days") < 1;
                    },
                    Error: "Value must be in the future"
                });
            }
            else {
                _this.AddValidationRule({
                    Validate: function (t) {
                        var val = t;
                        if (typeof val === "string")
                            val = new Date(val);
                        return moment().add(-1, "days").diff(moment(val), "days") < 0;
                    },
                    Error: "Value must be in the future"
                });
            }
            return _this;
        }
        return DateIsInFuture;
    }(DateValidationRule));
    Validation.DateIsInFuture = DateIsInFuture;
    var DateIsInPast = (function (_super) {
        __extends(DateIsInPast, _super);
        function DateIsInPast(includePresent) {
            var _this = _super.call(this) || this;
            if (includePresent) {
                _this.AddValidationRule({
                    Validate: function (t) {
                        var val = t;
                        if (typeof val === "string")
                            val = new Date(val);
                        return moment().diff(moment(val).add(-1, "days"), "days") > 0;
                    },
                    Error: "Value must be in the past"
                });
            }
            else {
                _this.AddValidationRule({
                    Validate: function (t) {
                        var val = t;
                        if (typeof val === "string")
                            val = new Date(val);
                        return moment().diff(moment(val).add(-1, "days"), "days") > 1;
                    },
                    Error: "Value must be in the past"
                });
            }
            return _this;
        }
        return DateIsInPast;
    }(DateValidationRule));
    Validation.DateIsInPast = DateIsInPast;
    var DateIsAfter = (function (_super) {
        __extends(DateIsAfter, _super);
        function DateIsAfter(date, includeCurrent) {
            var _this = _super.call(this) || this;
            if (typeof date === "string")
                date = new Date(date);
            if (includeCurrent) {
                _this.AddValidationRule({
                    Validate: function (t) {
                        var val = t;
                        if (typeof val === "string")
                            val = new Date(val);
                        return moment(date).diff(moment(val), "days") < 1;
                    },
                    Error: "Value must be after " + date.toLocaleDateString("en-US")
                });
            }
            else {
                _this.AddValidationRule({
                    Validate: function (t) {
                        var val = t;
                        if (typeof val === "string")
                            val = new Date(val);
                        return moment(date).add(-1, "days").diff(moment(val), "days") < -1;
                    },
                    Error: "Value must be after " + date.toLocaleDateString("en-US")
                });
            }
            return _this;
        }
        return DateIsAfter;
    }(DateValidationRule));
    Validation.DateIsAfter = DateIsAfter;
    var DateIsBefore = (function (_super) {
        __extends(DateIsBefore, _super);
        function DateIsBefore(date, includeCurrent) {
            var _this = _super.call(this) || this;
            if (typeof date === "string")
                date = new Date(date);
            if (includeCurrent) {
                _this.AddValidationRule({
                    Validate: function (t) {
                        var val = t;
                        if (typeof val === "string")
                            val = new Date(val);
                        return moment(date).diff(moment(val), "days") > -1;
                    },
                    Error: "Value must be before " + date.toLocaleDateString("en-US")
                });
            }
            else {
                _this.AddValidationRule({
                    Validate: function (t) {
                        var val = t;
                        if (typeof val === "string")
                            val = new Date(val);
                        return moment(date).diff(moment(val).add(-1, "days"), "days") > 1;
                    },
                    Error: "Value must be before " + date.toLocaleDateString("en-US")
                });
            }
            return _this;
        }
        return DateIsBefore;
    }(DateValidationRule));
    Validation.DateIsBefore = DateIsBefore;
})(Validation || (Validation = {}));
var Signalr;
(function (Signalr) {
    var Global = (function () {
        function Global() {
        }
        Global.Initialize = function () {
            var jq = window.jQuery;
            Global.InitializeInternal(jq);
            $.connection.hub.disconnected(function () {
                setTimeout(function () {
                    console.log("SignalR reconnecting.");
                    $.connection.hub.start();
                }, 5000);
            });
        };
        Global.InitializeInternal = function ($) {
            "use strict";
            if (typeof ($.signalR) !== "function") {
                throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
            }
            var signalR = $.signalR;
            function makeProxyCallback(hub, callback) {
                return function () {
                    callback.apply(hub, $.makeArray(arguments));
                };
            }
            function registerHubProxies(instance, shouldSubscribe) {
                var key, hub, memberKey, memberValue, subscriptionMethod;
                for (key in instance) {
                    if (instance.hasOwnProperty(key)) {
                        hub = instance[key];
                        if (!(hub.hubName)) {
                            continue;
                        }
                        if (shouldSubscribe) {
                            subscriptionMethod = hub.on;
                        }
                        else {
                            subscriptionMethod = hub.off;
                        }
                        for (memberKey in hub.client) {
                            if (hub.client.hasOwnProperty(memberKey)) {
                                memberValue = hub.client[memberKey];
                                if (!$.isFunction(memberValue)) {
                                    continue;
                                }
                                subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                            }
                        }
                    }
                }
            }
            $.hubConnection.prototype.createHubProxies = function () {
                var _this = this;
                var proxies = {};
                this.starting(function () {
                    registerHubProxies(proxies, true);
                    this._registerSubscribedHubs();
                }).disconnected(function () {
                    registerHubProxies(proxies, false);
                });
                Ext.ArrayExt.ForEach(Global.Hubs, function (hubName) {
                    proxies[hubName] = _this.createHubProxy(hubName);
                    proxies[hubName].client = {};
                    proxies[hubName].server = {
                        sendCommand: function (command) {
                            return proxies[hubName].invoke.apply(proxies[hubName], $.merge(["SendCommand"], $.makeArray(arguments)));
                        }
                    };
                });
                return proxies;
            };
            signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
            $.extend(signalR, signalR.hub.createHubProxies());
        };
        return Global;
    }());
    Global.Hubs = new Array();
    Signalr.Global = Global;
})(Signalr || (Signalr = {}));
var Signalr;
(function (Signalr) {
    var BaseCommand = (function () {
        function BaseCommand() {
        }
        return BaseCommand;
    }());
    Signalr.BaseCommand = BaseCommand;
})(Signalr || (Signalr = {}));
var Signalr;
(function (Signalr) {
    var BaseServerCommand = (function (_super) {
        __extends(BaseServerCommand, _super);
        function BaseServerCommand() {
            return _super.apply(this, arguments) || this;
        }
        return BaseServerCommand;
    }(Signalr.BaseCommand));
    Signalr.BaseServerCommand = BaseServerCommand;
})(Signalr || (Signalr = {}));
var Signalr;
(function (Signalr) {
    var CommandHandler = (function () {
        function CommandHandler() {
            this._commandsRegistry = new Array();
        }
        CommandHandler.prototype.RegisterHandlerFor = function (commandType) {
            var commandName = Ext.ObjectExt.GetTypeName(commandType);
            if (!Ext.StringExt.EndsWith(commandName, "Command"))
                throw Ext.StringExt.Format("Invalid command '{0}'. Possible typo. Please check.", commandName);
            var handlerName = Ext.StringExt.Format("{0}Handler", commandName);
            var handler = this[handlerName];
            if (!handler)
                throw Ext.StringExt.Format("No Handler defined for Command {0}.", name);
            this._commandsRegistry.push(commandName);
        };
        CommandHandler.prototype.HandleCommand = function (command) {
            var name = command.CommandName;
            if (!Ext.StringExt.HasValue(name))
                return;
            if (Ext.ArrayExt.Contains(this._commandsRegistry, name)) {
                var handlerName = Ext.StringExt.Format("{0}Handler", name);
                this[handlerName](command);
            }
        };
        return CommandHandler;
    }());
    Signalr.CommandHandler = CommandHandler;
})(Signalr || (Signalr = {}));
var Signalr;
(function (Signalr) {
    var CommandHubClient = (function () {
        function CommandHubClient(hubName, commandHandler) {
            this._hubName = hubName;
            this._registration = CommandHubClient.GetRegistration(hubName);
            this._registration.AddHandler(commandHandler);
        }
        CommandHubClient.prototype.SendCommand = function (command) {
            this._registration.SendCommand(command);
        };
        CommandHubClient.GetRegistration = function (hubName) {
            hubName = hubName.trim();
            if (!CommandHubClient.__registry[hubName])
                CommandHubClient.__registry[hubName] = new CommandHubClientRegistration(hubName);
            return CommandHubClient.__registry[hubName];
        };
        return CommandHubClient;
    }());
    CommandHubClient.__registry = new Array();
    Signalr.CommandHubClient = CommandHubClient;
    var CommandHubClientRegistration = (function () {
        function CommandHubClientRegistration(hubName) {
            var _this = this;
            this._handlers = new Array();
            this._hubName = hubName;
            this._proxy = $.connection[this._hubName];
            this._proxy.client.ReceiveCommand = function (command) {
                Ext.ArrayExt.ForEach(_this._handlers, function (handler) { return handler.HandleCommand(command); });
            };
        }
        CommandHubClientRegistration.prototype.AddHandler = function (handler) {
            if (!Ext.ArrayExt.Contains(this._handlers, handler)) {
                this._handlers.push(handler);
            }
        };
        CommandHubClientRegistration.prototype.SendCommand = function (command) {
            var _this = this;
            command.CommandName = Ext.ObjectExt.GetTypeName(command);
            $.connection.hub.start().done(function () {
                _this._proxy.server.sendCommand(command);
            });
        };
        return CommandHubClientRegistration;
    }());
})(Signalr || (Signalr = {}));
var Reflect;
(function (Reflect) {
    var functionPrototype = Object.getPrototypeOf(Function);
    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var __Metadata__ = new _WeakMap();
    function decorate(decorators, target, targetKey, targetDescriptor) {
        if (!IsUndefined(targetDescriptor)) {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsObject(target)) {
                throw new TypeError();
            }
            else if (IsUndefined(targetKey)) {
                throw new TypeError();
            }
            else if (!IsObject(targetDescriptor)) {
                throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
        }
        else if (!IsUndefined(targetKey)) {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsObject(target)) {
                throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
        }
        else {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsConstructor(target)) {
                throw new TypeError();
            }
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    function metadata(metadataKey, metadataValue) {
        function decorator(target, targetKey) {
            if (!IsUndefined(targetKey)) {
                if (!IsObject(target)) {
                    throw new TypeError();
                }
                targetKey = ToPropertyKey(targetKey);
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
            }
            else {
                if (!IsConstructor(target)) {
                    throw new TypeError();
                }
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
            }
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
    }
    Reflect.defineMetadata = defineMetadata;
    function hasMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryHasMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasMetadata = hasMetadata;
    function hasOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    function getMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryGetMetadata(metadataKey, target, targetKey);
    }
    Reflect.getMetadata = getMetadata;
    function getOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    function getMetadataKeys(target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryMetadataKeys(target, targetKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    function getOwnMetadataKeys(target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryOwnMetadataKeys(target, targetKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    function deleteMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
        if (IsUndefined(metadataMap)) {
            return false;
        }
        if (!metadataMap.delete(metadataKey)) {
            return false;
        }
        if (metadataMap.size > 0) {
            return true;
        }
        var targetMetadata = __Metadata__.get(target);
        targetMetadata.delete(targetKey);
        if (targetMetadata.size > 0) {
            return true;
        }
        __Metadata__.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated)) {
                if (!IsConstructor(decorated)) {
                    throw new TypeError();
                }
                target = decorated;
            }
        }
        return target;
    }
    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated)) {
                if (!IsObject(decorated)) {
                    throw new TypeError();
                }
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            decorator(target, propertyKey);
        }
    }
    function GetOrCreateMetadataMap(target, targetKey, create) {
        var targetMetadata = __Metadata__.get(target);
        if (!targetMetadata) {
            if (!create) {
                return undefined;
            }
            targetMetadata = new _Map();
            __Metadata__.set(target, targetMetadata);
        }
        var keyMetadata = targetMetadata.get(targetKey);
        if (!keyMetadata) {
            if (!create) {
                return undefined;
            }
            keyMetadata = new _Map();
            targetMetadata.set(targetKey, keyMetadata);
        }
        return keyMetadata;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
            return true;
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        }
        return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, false);
        if (metadataMap === undefined) {
            return false;
        }
        return Boolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        }
        return undefined;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, false);
        if (metadataMap === undefined) {
            return undefined;
        }
        return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = GetPrototypeOf(O);
        if (parent === null) {
            return ownKeys;
        }
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0) {
            return ownKeys;
        }
        if (ownKeys.length <= 0) {
            return parentKeys;
        }
        var set = new _Set();
        var keys = [];
        for (var _i = 0; _i < ownKeys.length; _i++) {
            var key = ownKeys[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0; _a < parentKeys.length; _a++) {
            var key = parentKeys[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    function OrdinaryOwnMetadataKeys(target, targetKey) {
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
        var keys = [];
        if (metadataMap) {
            metadataMap.forEach(function (_, key) { return keys.push(key); });
        }
        return keys;
    }
    function IsUndefined(x) {
        return x === undefined;
    }
    function IsArray(x) {
        return Array.isArray(x);
    }
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    function IsConstructor(x) {
        return typeof x === "function";
    }
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    function ToPropertyKey(value) {
        if (IsSymbol(value)) {
            return value;
        }
        return String(value);
    }
    function GetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype) {
            return proto;
        }
        if (proto !== functionPrototype) {
            return proto;
        }
        var prototype = O.prototype;
        var prototypeProto = Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype) {
            return proto;
        }
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function") {
            return proto;
        }
        if (constructor === O) {
            return proto;
        }
        return constructor;
    }
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        function Map() {
            this._keys = [];
            this._values = [];
            this._cache = cacheSentinel;
        }
        Map.prototype = {
            get size() {
                return this._keys.length;
            },
            has: function (key) {
                if (key === this._cache) {
                    return true;
                }
                if (this._find(key) >= 0) {
                    this._cache = key;
                    return true;
                }
                return false;
            },
            get: function (key) {
                var index = this._find(key);
                if (index >= 0) {
                    this._cache = key;
                    return this._values[index];
                }
                return undefined;
            },
            set: function (key, value) {
                this.delete(key);
                this._keys.push(key);
                this._values.push(value);
                this._cache = key;
                return this;
            },
            delete: function (key) {
                var index = this._find(key);
                if (index >= 0) {
                    this._keys.splice(index, 1);
                    this._values.splice(index, 1);
                    this._cache = cacheSentinel;
                    return true;
                }
                return false;
            },
            clear: function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cache = cacheSentinel;
            },
            forEach: function (callback, thisArg) {
                var size = this.size;
                for (var i = 0; i < size; ++i) {
                    var key = this._keys[i];
                    var value = this._values[i];
                    this._cache = key;
                    callback.call(this, value, key, this);
                }
            },
            _find: function (key) {
                var keys = this._keys;
                var size = keys.length;
                for (var i = 0; i < size; ++i) {
                    if (keys[i] === key) {
                        return i;
                    }
                }
                return -1;
            }
        };
        return Map;
    }
    function CreateSetPolyfill() {
        var cacheSentinel = {};
        function Set() {
            this._map = new _Map();
        }
        Set.prototype = {
            get size() {
                return this._map.length;
            },
            has: function (value) {
                return this._map.has(value);
            },
            add: function (value) {
                this._map.set(value, value);
                return this;
            },
            delete: function (value) {
                return this._map.delete(value);
            },
            clear: function () {
                this._map.clear();
            },
            forEach: function (callback, thisArg) {
                this._map.forEach(callback, thisArg);
            }
        };
        return Set;
    }
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var isNode = false;
        var nodeCrypto = isNode && require("crypto");
        var hasOwn = Object.prototype.hasOwnProperty;
        var keys = {};
        var rootKey = CreateUniqueKey();
        function WeakMap() {
            this._key = CreateUniqueKey();
        }
        WeakMap.prototype = {
            has: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table) {
                    return this._key in table;
                }
                return false;
            },
            get: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table) {
                    return table[this._key];
                }
                return undefined;
            },
            set: function (target, value) {
                var table = GetOrCreateWeakMapTable(target, true);
                table[this._key] = value;
                return this;
            },
            delete: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table && this._key in table) {
                    return delete table[this._key];
                }
                return false;
            },
            clear: function () {
                this._key = CreateUniqueKey();
            }
        };
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i) {
                buffer[i] = Math.random() * 255 | 0;
            }
        }
        function GenRandomBytes(size) {
            if (nodeCrypto) {
                var data1 = nodeCrypto.randomBytes(size);
                return data1;
            }
            else if (typeof Uint8Array === "function") {
                var data2 = new Uint8Array(size);
                if (typeof crypto !== "undefined") {
                    crypto.getRandomValues(data2);
                }
                else if (typeof msCrypto !== "undefined") {
                    msCrypto.getRandomValues(data2);
                }
                else {
                    FillRandomBytes(data2, size);
                }
                return data2;
            }
            else {
                var data3 = new Array(size);
                FillRandomBytes(data3, size);
                return data3;
            }
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8) {
                    result += "-";
                }
                if (byte < 16) {
                    result += "0";
                }
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
        function CreateUniqueKey() {
            var key;
            do {
                key = "@@WeakMap@@" + CreateUUID();
            } while (hasOwn.call(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create) {
                    return undefined;
                }
                Object.defineProperty(target, rootKey, { value: Object.create(null) });
            }
            return target[rootKey];
        }
        return WeakMap;
    }
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    __global.Reflect[p] = Reflect[p];
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof window !== "undefined" ? window :
        typeof WorkerGlobalScope !== "undefined" ? self :
            typeof global !== "undefined" ? global :
                Function("return this;")());
})(Reflect || (Reflect = {}));
var Reflection;
(function (Reflection) {
    var Decorator = (function () {
        function Decorator() {
        }
        Decorator.Define = function (decorator, decoratorParam) {
            var name = Ext.ObjectExt.GetTypeName(decorator);
            return function (target) {
                Reflect.defineMetadata(name, decoratorParam, target);
            };
        };
        Decorator.Exists = function (decorator, target) {
            var name = Ext.ObjectExt.GetTypeName(decorator);
            return Reflect.hasOwnMetadata(name, target);
        };
        Decorator.GetValue = function (decorator, target) {
            var name = Ext.ObjectExt.GetTypeName(decorator);
            return Reflect.getMetadata(name, target);
        };
        return Decorator;
    }());
    Reflection.Decorator = Decorator;
})(Reflection || (Reflection = {}));
var Core;
(function (Core) {
    function Inject() {
        var dependencies = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dependencies[_i - 0] = arguments[_i];
        }
        if (!Ext.ArrayExt.Any(dependencies))
            throw "No dependencies specified";
        return Reflection.Decorator.Define(Core.Inject, dependencies);
    }
    Core.Inject = Inject;
    function Resolve() {
        var resolvers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            resolvers[_i - 0] = arguments[_i];
        }
        if (!Ext.ArrayExt.Any(resolvers))
            throw "No resolvers specified";
        return Reflection.Decorator.Define(Core.Resolve, resolvers);
    }
    Core.Resolve = Resolve;
    function State(viewModelState) {
        if (!viewModelState)
            throw "Argument 'viewModelState' cannot be null";
        return Reflection.Decorator.Define(Core.State, viewModelState);
    }
    Core.State = State;
})(Core || (Core = {}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Services;
(function (Services) {
    var Lock = (function () {
        function Lock(promise) {
            this._isSet = false;
            this._promise = promise;
        }
        Lock.prototype.Then = function (action) {
            if (this._isSet)
                throw new Exceptions.InvalidOperationException("method Then() called more than once");
            this._promise.then(function () { return action(); });
            this._isSet = true;
        };
        return Lock;
    }());
    var Mutex = (function () {
        function Mutex(qService) {
            this._deferreds = [];
            this._qService = qService;
        }
        Mutex.prototype.Lock = function () {
            var deferred = this._qService.defer();
            this._deferreds.Add(deferred);
            if (this._deferreds.length === 1) {
                this._currentDeferred = deferred;
                this._currentDeferred.resolve();
            }
            return new Lock(deferred.promise);
        };
        Mutex.prototype.Release = function () {
            if (this._currentDeferred == null)
                return;
            this._deferreds.Remove(this._currentDeferred);
            this._currentDeferred = this._deferreds.FirstOrDefault();
            if (this._currentDeferred != null)
                this._currentDeferred.resolve();
        };
        return Mutex;
    }());
    var MutexFactory = (function () {
        function MutexFactory(qService) {
            this._qService = qService;
            this._dictionary = new Models.Dictionary();
        }
        MutexFactory.prototype.Create = function (name) {
            if (Ext.StringExt.HasValue(name)) {
                name = name.trim();
                if (!this._dictionary[name])
                    this._dictionary[name] = new Mutex(this._qService);
                return this._dictionary[name];
            }
            return new Mutex(this._qService);
        };
        return MutexFactory;
    }());
    MutexFactory = __decorate([
        Core.Inject("$q")
    ], MutexFactory);
    Services.MutexFactory = MutexFactory;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var PromiseConversionService = (function () {
        function PromiseConversionService(intervalService, qService) {
            this._intervalService = intervalService;
            this._qService = qService;
        }
        PromiseConversionService.prototype.ConvertQPromise = function (qPromise) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                qPromise.then(function (result) {
                    resolve(result);
                    _this._intervalService(function () { }, 1, 1);
                }, function (e) {
                    reject(e);
                    _this._intervalService(function () { }, 1, 1);
                });
            });
        };
        PromiseConversionService.prototype.ConvertPromise = function (promise) {
            var deferred = this._qService.defer();
            promise
                .then(function (val) { return deferred.resolve(val); })
                .catch(function (reason) { return deferred.reject(reason); });
            return deferred.promise;
        };
        return PromiseConversionService;
    }());
    PromiseConversionService = __decorate([
        Core.Inject("$interval", "$q")
    ], PromiseConversionService);
    Services.PromiseConversionService = PromiseConversionService;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var StorageService = (function () {
        function StorageService() {
        }
        StorageService.prototype.Persist = function (key, value) {
            if (value != null) {
                var storeValue = {
                    Item: value
                };
                localStorage.setItem(key, JSON.stringify(storeValue));
            }
            else
                localStorage.setItem(key, null);
        };
        StorageService.prototype.PersistInSession = function (key, value) {
            if (value != null) {
                var storeValue = {
                    Item: value
                };
                sessionStorage.setItem(key, JSON.stringify(storeValue));
            }
            else
                sessionStorage.setItem(key, null);
        };
        StorageService.prototype.Retrieve = function (key) {
            var value = localStorage.getItem(key);
            if (value == null)
                return null;
            var parsedValue = JSON.parse(value);
            return parsedValue.Item;
        };
        StorageService.prototype.RetrieveFromSession = function (key) {
            var value = sessionStorage.getItem(key);
            if (value == null)
                return null;
            var parsedValue = JSON.parse(value);
            return parsedValue.Item;
        };
        StorageService.prototype.Remove = function (key) {
            localStorage.removeItem(key);
        };
        StorageService.prototype.RemoveFromSession = function (key) {
            sessionStorage.removeItem(key);
        };
        return StorageService;
    }());
    Services.StorageService = StorageService;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var NavigationService = (function () {
        function NavigationService($state, $stateParams) {
            this._state = $state;
            this._stateParams = $stateParams;
        }
        NavigationService.prototype.Navigate = function (state, stateParams) {
            if (stateParams) {
                this._state.go(state, stateParams);
            }
            else {
                this._state.go(state);
            }
        };
        NavigationService.prototype.NavigateReplaceHistory = function (state, stateParams) {
            if (stateParams) {
                this._state.go(state, stateParams, { location: "replace" });
            }
            else {
                this._state.go(state, null, { location: "replace" });
            }
        };
        NavigationService.prototype.Reload = function () {
            this._state.reload();
        };
        NavigationService.prototype.GetStateParam = function (name) {
            return this._stateParams[name];
        };
        NavigationService.prototype.GetStateParams = function () {
            return angular.copy(this._stateParams);
        };
        NavigationService.prototype.GetCurrentState = function () {
            return this._state.current.name;
        };
        NavigationService.prototype.NavigateSiteSameTab = function (url, replceHistory) {
            if (!Ext.StringExt.HasValue(url))
                throw "ArgumentNullException 'url'.";
            if (replceHistory != null && replceHistory)
                window.location.replace(url);
            else
                window.location.href = url;
        };
        NavigationService.prototype.NavigateSiteNewTab = function (url) {
            if (!Ext.StringExt.HasValue(url))
                throw "ArgumentNullException 'url'.";
            window.open(url);
        };
        NavigationService.prototype.NavigateSitePostSameTab = function (url, value) {
            if (!Ext.StringExt.HasValue(url))
                throw "ArgumentNullException 'url'.";
            var form = this.CreateForm(url, value);
            form.submit();
        };
        NavigationService.prototype.NavigateSitePostNewTab = function (url, value) {
            if (!Ext.StringExt.HasValue(url))
                throw "ArgumentNullException 'url'.";
            var form = this.CreateForm(url, value);
            var view = "view" + "_" + Math.floor((Math.random() * 9999999) + 1);
            form.setAttribute("target", view);
            window.open("", view);
            form.submit();
        };
        NavigationService.prototype.GetSiteQueryParam = function (key) {
            key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
        NavigationService.prototype.CreateForm = function (url, value) {
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", url);
            if (value != null) {
                for (var key in value) {
                    if (value.hasOwnProperty(key) && typeof value[key] != "function") {
                        var val = value[key];
                        var hiddenField = document.createElement("input");
                        hiddenField.setAttribute("type", "hidden");
                        hiddenField.setAttribute("name", key);
                        hiddenField.setAttribute("value", val);
                        form.appendChild(hiddenField);
                    }
                }
            }
            document.body.appendChild(form);
            return form;
        };
        return NavigationService;
    }());
    NavigationService = __decorate([
        Core.Inject("$state", "$stateParams")
    ], NavigationService);
    Services.NavigationService = NavigationService;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var DialogService = (function () {
        function DialogService() {
            this._loadingScreenCount = 0;
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = 'toast-bottom-right';
            toastr.options.newestOnTop = false;
        }
        DialogService.SetAccentColor = function (color) {
            DialogService._accentColor = color;
        };
        DialogService.prototype.ShowLoadingScreen = function () {
            if (this._loadingScreenCount === 0) {
                if (!this._loadingScreen) {
                    this.CreateLoadingScreen();
                }
                this._loadingScreen.show();
                this._spinner.spin(document.getElementById('spinnerLocation'));
            }
            this._loadingScreenCount++;
        };
        DialogService.prototype.HideLoadingScreen = function () {
            this._loadingScreenCount--;
            if (this._loadingScreenCount < 0)
                this._loadingScreenCount = 0;
            if (this._loadingScreenCount === 0) {
                if (this._loadingScreen && this._spinner) {
                    this._spinner.stop();
                    this._loadingScreen.hide();
                }
            }
        };
        DialogService.prototype.ShowMessage = function (message, title) {
            if (title) {
                toastr.info(message, title);
            }
            else {
                toastr.info(message);
            }
        };
        DialogService.prototype.ShowSuccessMessage = function (message, title) {
            if (title) {
                toastr.success(message, title);
            }
            else {
                toastr.success(message);
            }
        };
        DialogService.prototype.ShowWarningMessage = function (message, title) {
            if (title) {
                toastr.warning(message, title);
            }
            else {
                toastr.warning(message);
            }
        };
        DialogService.prototype.ShowErrorMessage = function (message, title) {
            if (title) {
                toastr.error(message, title);
            }
            else {
                toastr.error(message);
            }
        };
        DialogService.prototype.ClearMessages = function () {
            toastr.clear();
        };
        DialogService.prototype.CreateLoadingScreen = function () {
            this._loadingScreen = $('<div style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:100000000;background-color:rgba(255, 255, 255, 0.1);"><div id="spinnerLocation" style="position:absolute;top:50%;left:50%;"></div></div>')
                .appendTo($('body'));
            var opts = {
                lines: 12,
                length: 10,
                width: 4,
                radius: 10,
                corners: 1,
                rotate: 0,
                direction: 1,
                color: DialogService._accentColor,
                speed: 1,
                trail: 60,
                shadow: false,
                hwaccel: false,
                className: 'spinner',
                zIndex: 2e9,
                top: 'auto',
                left: 'auto'
            };
            var target = document.getElementById('spinnerLocation');
            this._spinner = new Spinner(opts).spin(target);
            this._spinner.stop();
            this._loadingScreen.hide();
        };
        return DialogService;
    }());
    DialogService._accentColor = "#000";
    Services.DialogService = DialogService;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var DataService = (function () {
        function DataService($http, $q, promiseConversionService) {
            this._http = $http;
            this._q = $q;
            this._promiseConversionService = promiseConversionService;
            this.SetBaseUrl(window.BaseUrl);
        }
        DataService.prototype.SetAuthorizationToken = function (scheme, token) {
            this._http.defaults.headers.common.Authorization = scheme + " " + token;
        };
        DataService.prototype.ClearAuthorizationToken = function () {
            this._http.defaults.headers.common.Authorization = null;
        };
        DataService.prototype.GetAsync = function (url) {
            var _this = this;
            var deferred = this._q.defer();
            url = this.GetUrl(url);
            this._http['get'](url).then(function (successResponse) { return deferred.resolve(successResponse.data); }, function (errorResponse) { return _this.OnError(errorResponse.status, errorResponse.data, deferred); });
            return this._promiseConversionService.ConvertQPromise(deferred.promise);
        };
        DataService.prototype.PostVoidAsync = function (url, value) {
            var _this = this;
            var deferred = this._q.defer();
            url = this.GetUrl(url);
            this._http['post'](url, value).then(function (successResponse) { return deferred.resolve(); }, function (errorResponse) { return _this.OnError(errorResponse.status, errorResponse.data, deferred); });
            return this._promiseConversionService.ConvertQPromise(deferred.promise);
        };
        DataService.prototype.PostAsync = function (url, value) {
            var _this = this;
            var deferred = this._q.defer();
            url = this.GetUrl(url);
            this._http['post'](url, value).then(function (successResponse) { return deferred.resolve(successResponse.data); }, function (errorResponse) { return _this.OnError(errorResponse.status, errorResponse.data, deferred); });
            return this._promiseConversionService.ConvertQPromise(deferred.promise);
        };
        DataService.prototype.PutVoidAsync = function (url, value) {
            var _this = this;
            var deferred = this._q.defer();
            url = this.GetUrl(url);
            this._http['put'](url, value).then(function (successResponse) { return deferred.resolve(); }, function (errorResponse) { return _this.OnError(errorResponse.status, errorResponse.data, deferred); });
            return this._promiseConversionService.ConvertQPromise(deferred.promise);
        };
        DataService.prototype.PutAsync = function (url, value) {
            var _this = this;
            var deferred = this._q.defer();
            url = this.GetUrl(url);
            this._http['put'](url, value).then(function (successResponse) { return deferred.resolve(successResponse.data); }, function (errorResponse) { return _this.OnError(errorResponse.status, errorResponse.data, deferred); });
            return this._promiseConversionService.ConvertQPromise(deferred.promise);
        };
        DataService.prototype.DeleteVoidAsync = function (url, value) {
            var _this = this;
            var deferred = this._q.defer();
            url = this.GetUrl(url);
            var req = {
                method: 'DELETE',
                headers: { 'Content-Type': "application/json;charset=UTF-8" },
                url: url,
                data: value
            };
            this._http(req).then(function (successResponse) { return deferred.resolve(); }, function (errorResponse) { return _this.OnError(errorResponse.status, errorResponse.data, deferred); });
            return this._promiseConversionService.ConvertQPromise(deferred.promise);
        };
        DataService.prototype.DeleteAsync = function (url, value) {
            var _this = this;
            var deferred = this._q.defer();
            url = this.GetUrl(url);
            var req = {
                method: 'DELETE',
                headers: { 'Content-Type': "application/json;charset=UTF-8" },
                url: url,
                data: value
            };
            this._http(req).then(function (successResponse) { return deferred.resolve(successResponse.data); }, function (errorResponse) { return _this.OnError(errorResponse.status, errorResponse.data, deferred); });
            return this._promiseConversionService.ConvertQPromise(deferred.promise);
        };
        DataService.prototype.SetBaseUrl = function (url) {
            if (Ext.StringExt.HasValue(url)) {
                url = url.trim();
                if (!Ext.StringExt.EndsWith(url, "/"))
                    url += "/";
                this._baseUrl = url;
            }
            else {
                this._baseUrl = null;
            }
        };
        DataService.prototype.GetUrl = function (url) {
            if (!Ext.StringExt.HasValue(url))
                throw "Argument url is NULL.";
            url = url.trim();
            if (Ext.StringExt.StartsWith(url.toLowerCase(), "http") || !Ext.StringExt.HasValue(this._baseUrl))
                return url;
            return this._baseUrl + url;
        };
        DataService.prototype.OnError = function (status, data, deferred) {
            var exception = new Exceptions.HttpException(status, data);
            if (status === 401 && DataService.UnauthorizedAction)
                DataService.UnauthorizedAction(exception);
            deferred.reject(exception);
        };
        return DataService;
    }());
    DataService = __decorate([
        Core.Inject("$http", "$q", "PromiseConversionService")
    ], DataService);
    Services.DataService = DataService;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var EventSubscription = (function () {
        function EventSubscription(event, eventManager, subscription) {
            this._isUnsubscribed = false;
            this._event = event;
            this._eventManager = eventManager;
            this._subscription = subscription;
        }
        Object.defineProperty(EventSubscription.prototype, "Event", {
            get: function () { return this._event; },
            enumerable: true,
            configurable: true
        });
        EventSubscription.prototype.Unsubscribe = function () {
            if (this._isUnsubscribed)
                return;
            this._eventManager.Unsubscribe(this._event, this._subscription);
            this._isUnsubscribed = true;
        };
        return EventSubscription;
    }());
    Services.EventSubscription = EventSubscription;
    var EventSubscriptionInternal = (function () {
        function EventSubscriptionInternal() {
        }
        return EventSubscriptionInternal;
    }());
    var EventAggregator = (function () {
        function EventAggregator() {
            this._subscriptions = new Models.Dictionary();
        }
        EventAggregator.prototype.Subscribe = function (event, handler) {
            if (!this._subscriptions[event])
                this._subscriptions[event] = [];
            var eventSubscriptions = this._subscriptions[event];
            var existingRegistration = eventSubscriptions.FirstOrDefault(function (t) { return t.Handler === handler; });
            if (existingRegistration != null)
                return existingRegistration.Subscription;
            var eventSubscriptionInternal = new EventSubscriptionInternal();
            eventSubscriptionInternal.Handler = handler;
            eventSubscriptionInternal.Subscription = new EventSubscription(event, this, eventSubscriptionInternal);
            eventSubscriptions.Add(eventSubscriptionInternal);
            return eventSubscriptionInternal.Subscription;
        };
        EventAggregator.prototype.Publish = function (event, eventArgs) {
            if (!this._subscriptions[event])
                return;
            if (eventArgs != null)
                this._subscriptions[event].ForEach(function (t) { return t.Handler(eventArgs); });
            else
                this._subscriptions[event].ForEach(function (t) { return t.Handler(); });
        };
        EventAggregator.prototype.Unsubscribe = function (event, subscription) {
            if (!this._subscriptions[event])
                return;
            this._subscriptions[event].Remove(subscription);
        };
        return EventAggregator;
    }());
    Services.EventAggregator = EventAggregator;
})(Services || (Services = {}));
var Core;
(function (Core) {
    var Command = (function () {
        function Command(action, predicate) {
            this._action = action;
            this._predicate = predicate;
        }
        Command.prototype.CanExecute = function (value) {
            if (!this._predicate)
                return true;
            return this._predicate(value);
        };
        Command.prototype.Execute = function (value) {
            if (this.CanExecute)
                this._action(value);
        };
        return Command;
    }());
    Core.Command = Command;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var DependencyConfiguration = (function () {
        function DependencyConfiguration() {
            this._dependencyNames = new Array();
            this._dependencyModules = new Array();
        }
        DependencyConfiguration.prototype.RegisterDependency = function (name, angularModule) {
            if (!Ext.StringExt.HasValue(name))
                throw "Argument cannot be null [name]";
            if (Ext.ArrayExt.Contains(this._dependencyNames, name))
                throw Ext.StringExt.Format("Duplicate dependency registration [{0}]", name);
            if (angularModule != null)
                this._dependencyModules.push(new Models.KeyValuePair(name, angularModule));
            else
                this._dependencyNames.push(name);
            return this;
        };
        DependencyConfiguration.prototype.Initialize = function (moduleName) {
            var dependencies = [];
            Ext.ArrayExt.ForEach(this._dependencyModules, function (item) {
                var angularModule = new item.Value(item.Key);
                dependencies.push(item.Key);
            });
            Ext.ArrayExt.ForEach(this._dependencyNames, function (item) { return dependencies.push(item); });
            return angular.module(moduleName, dependencies);
        };
        return DependencyConfiguration;
    }());
    Core.DependencyConfiguration = DependencyConfiguration;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var ServiceConfiguration = (function () {
        function ServiceConfiguration() {
            this._config = new Array();
        }
        ServiceConfiguration.prototype.RegisterService = function (name, service) {
            if (!Ext.StringExt.HasValue(name))
                throw "Argument cannot be null [name]";
            if (service == null)
                throw "Argument cannot be null [service]";
            if (Ext.ArrayExt.Any(this._config, function (item) { return item.Key == name; }))
                throw Ext.StringExt.Format("Duplicate service registration [{0}]", name);
            this._config.push(new Models.KeyValuePair(name, service));
            return this;
        };
        ServiceConfiguration.prototype.Initialize = function (appModule) {
            Ext.ArrayExt.ForEach(this._config, function (item) {
                var name = item.Key;
                var service = item.Value;
                if (Reflection.Decorator.Exists(Core.Inject, service)) {
                    var dependencies = Reflection.Decorator.GetValue(Core.Inject, service);
                    service["$inject"] = dependencies;
                }
                appModule.service(name, service);
            });
        };
        return ServiceConfiguration;
    }());
    Core.ServiceConfiguration = ServiceConfiguration;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var FilterConfiguration = (function () {
        function FilterConfiguration() {
            this._config = new Array();
        }
        FilterConfiguration.prototype.RegisterFilter = function (name, filter) {
            if (!Ext.StringExt.HasValue(name))
                throw "Argument cannot be null [name]";
            if (filter == null)
                throw "Argument cannot be null [filter]";
            if (Ext.ArrayExt.Any(this._config, function (item) { return item.Key == name; }))
                throw Ext.StringExt.Format("Duplicate filter registration [{0}]", name);
            this._config.push(new Models.KeyValuePair(name, filter));
            return this;
        };
        FilterConfiguration.prototype.Initialize = function (appModule) {
            Ext.ArrayExt.ForEach(this._config, function (item) {
                var name = item.Key;
                var filter = item.Value;
                appModule.filter(name.trim(), function () { return new filter().Filter; });
            });
        };
        return FilterConfiguration;
    }());
    Core.FilterConfiguration = FilterConfiguration;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Resolver = (function () {
        function Resolver() {
        }
        Resolver.prototype.ResolveInternal = function (deferred, stateParams) {
            var promise = this.ResolveAsync(stateParams);
            promise
                .then(function (val) { return deferred.resolve(val); })
                .catch(function (reason) { return deferred.reject(reason); });
            return deferred.promise;
        };
        return Resolver;
    }());
    Core.Resolver = Resolver;
    var CachedResolver = (function () {
        function CachedResolver() {
        }
        CachedResolver.prototype.ResolveInternal = function (deferred, stateParams) {
            if (this._deferred == null) {
                this._deferred = deferred;
                var promise = this.ResolveAsync(stateParams);
                promise
                    .then(function (val) { return deferred.resolve(val); })
                    .catch(function (reason) { return deferred.reject(reason); });
            }
            return this._deferred.promise;
        };
        return CachedResolver;
    }());
    Core.CachedResolver = CachedResolver;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var ResolverConfiguration = (function () {
        function ResolverConfiguration() {
            this._config = new Array();
        }
        ResolverConfiguration.prototype.RegisterResolver = function (name, resolver) {
            if (!Ext.StringExt.HasValue(name))
                throw "Argument cannot be null [name]";
            if (resolver == null)
                throw "Argument cannot be null [resolver]";
            if (Ext.ArrayExt.Any(this._config, function (item) { return item.Key == name; }))
                throw Ext.StringExt.Format("Duplicate resolver registration [{0}]", name);
            this._config.push(new Models.KeyValuePair(name, resolver));
            return this;
        };
        ResolverConfiguration.prototype.Initialize = function (appModule) {
            Ext.ArrayExt.ForEach(this._config, function (item) {
                var name = item.Key + "Resolver";
                var resolver = item.Value;
                if (Reflection.Decorator.Exists(Core.Inject, resolver)) {
                    var dependencies = Reflection.Decorator.GetValue(Core.Inject, resolver);
                    resolver["$inject"] = dependencies;
                }
                appModule.service(name, resolver);
            });
        };
        return ResolverConfiguration;
    }());
    Core.ResolverConfiguration = ResolverConfiguration;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Page = (function () {
        function Page(name, url, viewModel, view) {
            this._childPages = new Array();
            this._isAbstract = false;
            if (!Ext.StringExt.HasValue(name))
                throw "Argument 'name' is required.";
            if (!Ext.StringExt.HasValue(url))
                throw "Argument 'url' is required.";
            if (!viewModel)
                throw "Argument 'viewModel' is required.";
            if (!Ext.StringExt.HasValue(name))
                throw "Argument 'view' is required.";
            this._name = name;
            this._url = url;
            this._viewModel = viewModel;
            this._view = view;
        }
        Object.defineProperty(Page.prototype, "Name", {
            get: function () { return this._name; },
            set: function (value) { this._name = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "Url", {
            get: function () { return this._url; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "ViewModel", {
            get: function () { return this._viewModel; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "View", {
            get: function () { return this._view; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "ChildPages", {
            get: function () { return this._childPages; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "IsAbstract", {
            get: function () { return this._isAbstract; },
            enumerable: true,
            configurable: true
        });
        Page.prototype.AddChildPage = function (childPage) {
            this._childPages.push(childPage);
            return this;
        };
        Page.prototype.AddChildPages = function () {
            var childPages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                childPages[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < childPages.length; i++) {
                this._childPages.push(childPages[i]);
            }
            return this;
        };
        Page.prototype.AsAbstract = function () {
            this._isAbstract = true;
            return this;
        };
        return Page;
    }());
    Core.Page = Page;
    var PageViewModel = (function () {
        function PageViewModel() {
            this.SetBaseUrl(window.BaseUrl);
        }
        Object.defineProperty(PageViewModel.prototype, "BaseUrl", {
            get: function () { return this._baseUrl; },
            enumerable: true,
            configurable: true
        });
        PageViewModel.prototype.SetBaseUrl = function (url) {
            if (Ext.StringExt.HasValue(url)) {
                url = url.trim();
                if (!Ext.StringExt.EndsWith(url, "/"))
                    url += "/";
                this._baseUrl = url;
            }
            else {
                this._baseUrl = "";
            }
        };
        return PageViewModel;
    }());
    Core.PageViewModel = PageViewModel;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var PageConfiguration = (function () {
        function PageConfiguration() {
            this._pages = new Array();
            this._baseUrl = window.BaseUrl;
            this.UnknownUrlRedirect = "/";
        }
        PageConfiguration.prototype.RegisterPage = function (page) {
            if (page == null)
                throw "Argument cannot be null [page]";
            this._pages.push(page);
            return this;
        };
        PageConfiguration.prototype.Initialize = function (appModule) {
            var _this = this;
            var unknownRedirect = this.UnknownUrlRedirect;
            Ext.ArrayExt.ForEach(this._pages, function (page) { return _this.RegisterDependencies(page, null, appModule); });
            appModule.config(["$stateProvider", "$urlRouterProvider",
                function ($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider.otherwise(unknownRedirect);
                    _this.ActivatePages(appModule, $stateProvider, _this._pages);
                }]);
        };
        PageConfiguration.prototype.ActivatePages = function (appModule, $stateProvider, pages) {
            var _this = this;
            Ext.ArrayExt.ForEach(pages, function (page) {
                var viewUrl = null;
                if (Ext.StringExt.StartsWith(page.View, "~")) {
                    viewUrl = _this._baseUrl + page.View.substring(1);
                }
                else if (Ext.StringExt.HasValue(_this.RootViewsFolder)) {
                    viewUrl = _this._baseUrl + _this.RootViewsFolder + page.View;
                }
                else {
                    viewUrl = _this._baseUrl + page.View;
                }
                $stateProvider.state(page.Name, {
                    url: page.Url,
                    templateUrl: viewUrl,
                    controller: page.ViewModel,
                    resolve: page["Resolve"],
                    abstract: page.IsAbstract,
                    controllerAs: "vm"
                });
                if (page.ChildPages != null && page.ChildPages.length > 0) {
                    _this.ActivatePages(appModule, $stateProvider, page.ChildPages);
                }
            });
        };
        PageConfiguration.prototype.RegisterDependencies = function (page, parentPageName, appModule) {
            var _this = this;
            if (parentPageName != null)
                page.Name = parentPageName + "." + page.Name;
            var dependencies = new Array();
            if (Reflection.Decorator.Exists(Core.Inject, page.ViewModel))
                dependencies = Reflection.Decorator.GetValue(Core.Inject, page.ViewModel);
            if (Reflection.Decorator.Exists(Core.Resolve, page.ViewModel)) {
                var resolvers = Reflection.Decorator.GetValue(Core.Resolve, page.ViewModel);
                var resolve = {};
                Ext.ArrayExt.ForEach(resolvers, function (resolver) {
                    var resolverName = resolver + "Resolver";
                    resolve[resolver] = [
                        "$q", resolverName, "$stateParams", function ($q, resolverInstance, stateParams) {
                            var deferred = $q.defer();
                            return resolverInstance.ResolveInternal(deferred, stateParams);
                        }
                    ];
                    dependencies.push(resolver);
                });
                page["Resolve"] = resolve;
            }
            if (Reflection.Decorator.Exists(Core.State, page.ViewModel)) {
                var viewModelState = Reflection.Decorator.GetValue(Core.State, page.ViewModel);
                var viewModelStateName = page.Name + "_ViewModelState";
                appModule.value(viewModelStateName, viewModelState);
                dependencies.push(viewModelStateName);
            }
            if (dependencies && dependencies.length > 0)
                page.ViewModel["$inject"] = dependencies;
            if (page.ChildPages != null && page.ChildPages.length > 0) {
                Ext.ArrayExt.ForEach(page.ChildPages, function (item) { return _this.RegisterDependencies(item, page.Name, appModule); });
            }
        };
        return PageConfiguration;
    }());
    Core.PageConfiguration = PageConfiguration;
})(Core || (Core = {}));
var Core;
(function (Core) {
    (function (BindingType) {
        BindingType[BindingType["Expression"] = 1] = "Expression";
        BindingType[BindingType["Model"] = 2] = "Model";
        BindingType[BindingType["Callback"] = 3] = "Callback";
    })(Core.BindingType || (Core.BindingType = {}));
    var BindingType = Core.BindingType;
    var Binding = (function () {
        function Binding(name, bindingType) {
            this.Name = name;
            this.BindingType = bindingType;
        }
        return Binding;
    }());
    var DirectiveViewModel = (function (_super) {
        __extends(DirectiveViewModel, _super);
        function DirectiveViewModel() {
            return _super.apply(this, arguments) || this;
        }
        DirectiveViewModel.prototype.Link = function (element, attrs) { };
        return DirectiveViewModel;
    }(Core.PageViewModel));
    Core.DirectiveViewModel = DirectiveViewModel;
    var Directive = (function () {
        function Directive(restrict) {
            this._bindings = new Array();
            this.Restrict = restrict;
        }
        Directive.prototype.Link = function (scope, element, attrs, viewModel) {
            if (viewModel != null)
                viewModel.Link(element, attrs);
        };
        Directive.prototype.RegisterBinding = function (name, bindingType) {
            this._bindings.push(new Binding(name, bindingType));
            return this;
        };
        Directive.prototype.CreateScope = function () {
            if (!this.UseIsolateScope)
                return null;
            var scope = {};
            Ext.ArrayExt.ForEach(this._bindings, function (item) {
                var bindingTypeString = null;
                switch (item.BindingType) {
                    case BindingType.Expression:
                        bindingTypeString = "@";
                        break;
                    case BindingType.Model:
                        bindingTypeString = "=";
                        break;
                    case BindingType.Callback:
                        bindingTypeString = "&";
                        break;
                }
                if (bindingTypeString == null)
                    throw "Directive binding type is either invalid or not defined.";
                scope[item.Name] = bindingTypeString;
            });
            return scope;
        };
        return Directive;
    }());
    Core.Directive = Directive;
    var BehaviourDirective = (function (_super) {
        __extends(BehaviourDirective, _super);
        function BehaviourDirective() {
            var _this = _super.call(this, "A") || this;
            _this.UseIsolateScope = false;
            return _this;
        }
        return BehaviourDirective;
    }(Directive));
    Core.BehaviourDirective = BehaviourDirective;
    var ComponentDirective = (function (_super) {
        __extends(ComponentDirective, _super);
        function ComponentDirective() {
            var _this = _super.call(this, "E") || this;
            _this.UseIsolateScope = true;
            _this.Replace = true;
            return _this;
        }
        return ComponentDirective;
    }(Directive));
    Core.ComponentDirective = ComponentDirective;
    var ContainerDirective = (function (_super) {
        __extends(ContainerDirective, _super);
        function ContainerDirective() {
            var _this = _super.call(this) || this;
            _this.UseIsolateScope = true;
            _this.Transclude = true;
            return _this;
        }
        return ContainerDirective;
    }(ComponentDirective));
    Core.ContainerDirective = ContainerDirective;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var DirectiveConfiguraton = (function () {
        function DirectiveConfiguraton() {
            this._baseUrl = window.BaseUrl;
            this._config = Array();
        }
        DirectiveConfiguraton.prototype.RegisterDirective = function (name, directive) {
            if (!Ext.StringExt.HasValue(name))
                throw "Argument cannot be null [name]";
            if (directive == null)
                throw Ext.StringExt.Format("Argument cannot be null [directive] [name = {0}]", name);
            name = name.trim();
            if (Ext.ArrayExt.Any(this._config, function (item) { return item.Key == name; }))
                throw Ext.StringExt.Format("Duplicate directive registration [{0}]", name);
            if (name === "command")
                throw "The name 'command' is used by the Command Directive provided by the framework.";
            this._config.push(new Models.KeyValuePair(name, directive));
            return this;
        };
        DirectiveConfiguraton.prototype.Initialize = function (appModule) {
            var _this = this;
            Ext.ArrayExt.ForEach(this._config, function (item) {
                var wrapper = [
                    "$injector", "DirectiveCompileHelper", function ($injector, directiveCompileHelper) {
                        var name = item.Key;
                        var directive = item.Value;
                        if (Reflection.Decorator.Exists(Core.Inject, directive)) {
                            var directiveDependencies = Reflection.Decorator.GetValue(Core.Inject, directive);
                            directive["$inject"] = directiveDependencies;
                        }
                        var implementation = $injector.instantiate(directive);
                        if (implementation.ViewModel != null) {
                            var dependencies = new Array();
                            if (Reflection.Decorator.Exists(Core.Inject, implementation.ViewModel))
                                dependencies = Reflection.Decorator.GetValue(Core.Inject, implementation.ViewModel);
                            if (Reflection.Decorator.Exists(Core.State, implementation.ViewModel)) {
                                var viewModelState = Reflection.Decorator.GetValue(Core.State, implementation.ViewModel);
                                var viewModelStateName = name + "_DirectiveViewModelState";
                                appModule.value(viewModelStateName, viewModelState);
                                dependencies.push(viewModelStateName);
                            }
                            if (dependencies && dependencies.length > 0)
                                implementation.ViewModel["$inject"] = dependencies;
                        }
                        var viewUrl = null;
                        if (Ext.StringExt.HasValue(implementation.View)) {
                            if (Ext.StringExt.StartsWith(implementation.View, "~")) {
                                viewUrl = _this._baseUrl + implementation.View.substring(1);
                            }
                            else if (Ext.StringExt.HasValue(_this.RootViewsFolder)) {
                                viewUrl = _this._baseUrl + _this.RootViewsFolder + implementation.View;
                            }
                            else {
                                viewUrl = _this._baseUrl + implementation.View;
                            }
                        }
                        return {
                            restrict: implementation.Restrict,
                            replace: implementation.Replace,
                            transclude: implementation.Transclude,
                            template: implementation.Template,
                            templateUrl: viewUrl,
                            scope: implementation["CreateScope"](),
                            controller: implementation.ViewModel,
                            controllerAs: implementation.ViewModel ? "vm" : null,
                            bindToController: implementation.ViewModel ? true : null,
                            link: implementation["Link"].bind(implementation),
                            compile: implementation.Compile ? directiveCompileHelper.compile : null
                        };
                    }
                ];
                appModule.directive(item.Key, wrapper);
            });
        };
        return DirectiveConfiguraton;
    }());
    Core.DirectiveConfiguraton = DirectiveConfiguraton;
})(Core || (Core = {}));
var Directives;
(function (Directives) {
    var DataContextDirective = (function (_super) {
        __extends(DataContextDirective, _super);
        function DataContextDirective() {
            var _this = _super.call(this) || this;
            _this.UseIsolateScope = true;
            return _this;
        }
        DataContextDirective.prototype.Link = function (scope, element, attrs, viewModel) {
            var expression = attrs["context"];
            if (!Ext.StringExt.HasValue(expression))
                throw "Argument Exception: Context expression cannot be null.";
            if (!Ext.StringExt.Contains(expression, " as "))
                throw "Argument Exception: Invalid argument.";
            expression = expression.trim();
            var splitted = expression.split(" as ");
            var name = splitted[0].trim();
            var alias = splitted[1].trim();
            scope.$watch("$parent." + name, function (newValue, oldValue) {
                scope[alias] = newValue;
            });
        };
        return DataContextDirective;
    }(Core.BehaviourDirective));
    Directives.DataContextDirective = DataContextDirective;
})(Directives || (Directives = {}));
var Directives;
(function (Directives) {
    var FileUploadDirective = (function (_super) {
        __extends(FileUploadDirective, _super);
        function FileUploadDirective() {
            var _this = _super.call(this) || this;
            _this.Template = '<span></span>';
            _this.ViewModel = FileUploadDirectiveViewModel;
            _this.RegisterBinding("mimeTypes", Core.BindingType.Expression);
            _this.RegisterBinding("maxFileSize", Core.BindingType.Expression);
            _this.RegisterBinding("multiple", Core.BindingType.Expression);
            _this.RegisterBinding("isFileDialogOpen", Core.BindingType.Model);
            _this.RegisterBinding("onSelection", Core.BindingType.Callback);
            return _this;
        }
        return FileUploadDirective;
    }(Core.ComponentDirective));
    Directives.FileUploadDirective = FileUploadDirective;
    var FileInfo = (function () {
        function FileInfo() {
        }
        return FileInfo;
    }());
    Directives.FileInfo = FileInfo;
    var FileUploadDirectiveViewModel = (function (_super) {
        __extends(FileUploadDirectiveViewModel, _super);
        function FileUploadDirectiveViewModel($scope, dialogService, $q) {
            var _this = _super.call(this) || this;
            _this._inputTemplate = '<input type="file" accept="{0}" style="display: none" />';
            _this._inputTemplateMultiple = '<input type="file" accept="{0}" multiple style="display: none" />';
            _this._scope = $scope;
            _this._dialogService = dialogService;
            _this._qService = $q;
            return _this;
        }
        Object.defineProperty(FileUploadDirectiveViewModel.prototype, "MimeTypes", {
            get: function () { return this["mimeTypes"]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileUploadDirectiveViewModel.prototype, "MaxFileSize", {
            get: function () {
                var maxFileSize = parseInt(this["maxFileSize"]);
                return Validation.Helpers.IsNumber(maxFileSize) ? maxFileSize : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileUploadDirectiveViewModel.prototype, "Multiple", {
            get: function () { return this["multiple"] != null && this["multiple"] === "true"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileUploadDirectiveViewModel.prototype, "IsFileDialogOpen", {
            get: function () { return this["isFileDialogOpen"]; },
            set: function (value) { this["isFileDialogOpen"] = value; },
            enumerable: true,
            configurable: true
        });
        FileUploadDirectiveViewModel.prototype.Link = function (element, attrs) {
            var _this = this;
            this.InitializeMaxFileSizeBytes();
            var inputText = Ext.StringExt.Format(this._inputTemplate, this.MimeTypes);
            if (this.Multiple)
                inputText = Ext.StringExt.Format(this._inputTemplateMultiple, this.MimeTypes);
            var that = this;
            var fchange = function () {
                that.ProcessFiles(this.files);
                $(this).off("change");
                $(this).remove();
                that._inputElement = $(inputText);
                that._inputElement.change(fchange).appendTo(element);
            };
            this._inputElement = $(inputText);
            this._inputElement.change(fchange).appendTo(element);
            this._scope.$watch(function () { return _this.IsFileDialogOpen; }, function (newValue, oldValue) {
                if (newValue === oldValue)
                    return;
                if (newValue) {
                    _this._inputElement.click();
                    _this.IsFileDialogOpen = false;
                }
            });
        };
        FileUploadDirectiveViewModel.prototype.ProcessFiles = function (files) {
            var _this = this;
            this._dialogService.ShowLoadingScreen();
            var promises = [];
            if (files == null || files.length === 0)
                return;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var fileInfo = new FileInfo();
                fileInfo.FileName = file.name;
                fileInfo.FileType = file.type;
                fileInfo.FileSize = file.size;
                var deferred = this._qService.defer();
                var reader = new FileReader();
                reader.onload = function (fi, def) {
                    return function (e) {
                        fi.FileData = e.target.result.split(",")[1];
                        def.resolve(fi);
                    };
                }(fileInfo, deferred);
                reader.readAsDataURL(file);
                promises.Add(deferred.promise);
            }
            this._qService.all(promises).then(function (results) {
                var processedFiles = [];
                var failedFiles = [];
                results.ForEach(function (t) {
                    if (_this.EnsureFileSizeIsAllowed(t))
                        processedFiles.Add(t);
                    else
                        failedFiles.Add(t);
                });
                failedFiles.ForEach(function (t) { return _this._dialogService.ShowWarningMessage(Ext.StringExt.Format("File {0} exceeded the file size limit of {1} MB.", t.FileName, _this.MaxFileSize)); });
                if (processedFiles.Any()) {
                    if (_this.Multiple)
                        _this["onSelection"]({ files: processedFiles });
                    else
                        _this["onSelection"]({ file: processedFiles.First() });
                }
            })
                .catch(function () { return _this._dialogService.ShowErrorMessage("An error occured while processing the files.", "ERROR"); })
                .finally(function () { return _this._dialogService.HideLoadingScreen(); });
        };
        FileUploadDirectiveViewModel.prototype.EnsureFileSizeIsAllowed = function (fileInfo) {
            return this._maxFileSizeBytes != null ? fileInfo.FileSize <= this._maxFileSizeBytes : true;
        };
        FileUploadDirectiveViewModel.prototype.InitializeMaxFileSizeBytes = function () {
            this._maxFileSizeBytes = this.MaxFileSize != null ? this.MaxFileSize * 1024 * 1024 : null;
        };
        return FileUploadDirectiveViewModel;
    }(Core.DirectiveViewModel));
    FileUploadDirectiveViewModel = __decorate([
        Core.Inject("$scope", "DialogService", "$q")
    ], FileUploadDirectiveViewModel);
    Directives.FileUploadDirectiveViewModel = FileUploadDirectiveViewModel;
})(Directives || (Directives = {}));
var Directives;
(function (Directives) {
    var HtmlDirective = (function (_super) {
        __extends(HtmlDirective, _super);
        function HtmlDirective() {
            return _super.apply(this, arguments) || this;
        }
        HtmlDirective.prototype.Link = function (scope, element, attrs, viewModel) {
            var html = attrs["html"];
            element.html(html);
        };
        return HtmlDirective;
    }(Core.BehaviourDirective));
    Directives.HtmlDirective = HtmlDirective;
})(Directives || (Directives = {}));
var Core;
(function (Core) {
    var AngularModule = (function () {
        function AngularModule(moduleName, isMain) {
            if (isMain)
                this.ConfigureIsDebug();
            this._dependencyConfiguration = new Core.DependencyConfiguration();
            this._serviceConfiguration = new Core.ServiceConfiguration();
            this._filterConfiguration = new Core.FilterConfiguration();
            this._resolverConfiguration = new Core.ResolverConfiguration();
            this._directiveConfiguration = new Core.DirectiveConfiguraton();
            this._pageConfiguration = new Core.PageConfiguration();
            this._dependencyConfiguration.RegisterDependency("ui.router");
            this.ConfigureDependencies(this._dependencyConfiguration);
            this._appModule = this._dependencyConfiguration.Initialize(moduleName);
            if (isMain) {
                this._serviceConfiguration
                    .RegisterService("MutexFactory", Services.MutexFactory)
                    .RegisterService("PromiseConversionService", Services.PromiseConversionService)
                    .RegisterService("StorageService", Services.StorageService)
                    .RegisterService("NavigationService", Services.NavigationService)
                    .RegisterService("DialogService", Services.DialogService)
                    .RegisterService("DataService", Services.DataService)
                    .RegisterService("EventAggregator", Services.EventAggregator);
            }
            this.ConfigureServices(this._serviceConfiguration);
            this.ConfigureFilters(this._filterConfiguration);
            this.ConfigureResolvers(this._resolverConfiguration);
            if (isMain) {
                this.RegisterDirectiveCompileHelper();
                this.RegisterCommandDirective();
                this._directiveConfiguration
                    .RegisterDirective("context", Directives.DataContextDirective)
                    .RegisterDirective("fileUpload", Directives.FileUploadDirective)
                    .RegisterDirective("html", Directives.HtmlDirective)
                    .RegisterDirective("validationLabel", Directives.ValidationLabelDirective)
                    .RegisterDirective("verticalScrollPanel", Directives.VerticalScrollPanelDirective);
            }
            this.ConfigureDirectives(this._directiveConfiguration);
            this._serviceConfiguration.Initialize(this._appModule);
            this._filterConfiguration.Initialize(this._appModule);
            this._resolverConfiguration.Initialize(this._appModule);
            this._directiveConfiguration.Initialize(this._appModule);
            this.ConfigurePages(this._pageConfiguration);
            this._pageConfiguration.Initialize(this._appModule);
        }
        Object.defineProperty(AngularModule, "IsDebug", {
            get: function () { return AngularModule.__isDebug; },
            enumerable: true,
            configurable: true
        });
        AngularModule.prototype.ConfigureDependencies = function (dependencyConfiguration) { };
        AngularModule.prototype.ConfigureServices = function (serviceConfiguration) { };
        AngularModule.prototype.ConfigureFilters = function (filterConfiguration) { };
        AngularModule.prototype.ConfigureResolvers = function (resolverConfiguration) { };
        AngularModule.prototype.ConfigureDirectives = function (directiveConfiguration) { };
        AngularModule.prototype.ConfigurePages = function (pageConfiguration) { };
        AngularModule.prototype.ConfigureIsDebug = function () {
            var debugVal = window.IsDebug;
            if (debugVal == null) {
                window.IsDebug = false;
                AngularModule.__isDebug = false;
                return;
            }
            if (debugVal == "true" || debugVal == "True" || debugVal == true) {
                window.IsDebug = true;
                AngularModule.__isDebug = true;
                return;
            }
            window.IsDebug = false;
            AngularModule.__isDebug = false;
        };
        AngularModule.prototype.RegisterDirectiveCompileHelper = function () {
            this._appModule.factory('DirectiveCompileHelper', ['$compile', function ($compile) {
                    return {
                        compile: function (element, link) {
                            if (angular.isFunction(link)) {
                                link = { post: link };
                            }
                            var contents = element.contents().remove();
                            var compiledContents;
                            return {
                                pre: (link && link.pre) ? link.pre : null,
                                post: function (scope, element) {
                                    if (!compiledContents) {
                                        compiledContents = $compile(contents);
                                    }
                                    compiledContents(scope, function (clone) {
                                        element.append(clone);
                                    });
                                    if (link && link.post) {
                                        link.post.apply(null, arguments);
                                    }
                                }
                            };
                        }
                    };
                }]);
        };
        AngularModule.prototype.RegisterCommandDirective = function () {
            this._appModule.directive("command", [
                "$compile", function ($compile) {
                    return {
                        restrict: "A",
                        priority: 1,
                        compile: function (element, attrs) {
                            var command = attrs.command;
                            var commandParam = attrs.commandParam || "";
                            var executeText = Ext.StringExt.Format("{0}.Execute({1})", command, commandParam);
                            var disabledText = Ext.StringExt.Format("!{0}.CanExecute({1})", command, commandParam);
                            attrs.$set("command", null);
                            attrs.$set("commandParam", null);
                            attrs.$set("ngClick", executeText);
                            attrs.$set("ngDisabled", disabledText);
                            return function (scope, iElement, iAttrs) {
                                $compile(iElement)(scope);
                            };
                        }
                    };
                }
            ]);
        };
        return AngularModule;
    }());
    Core.AngularModule = AngularModule;
})(Core || (Core = {}));
var Directives;
(function (Directives) {
    var ValidationLabelDirective = (function (_super) {
        __extends(ValidationLabelDirective, _super);
        function ValidationLabelDirective() {
            var _this = _super.call(this) || this;
            _this.Template = '<div><label for="{{for}}">{{label}}</label><span data-ng-transclude=""></span><span class="validation-error">{{error}}</span></div>';
            _this.RegisterBinding("for", Core.BindingType.Expression);
            _this.RegisterBinding("label", Core.BindingType.Expression);
            _this.RegisterBinding("error", Core.BindingType.Expression);
            return _this;
        }
        return ValidationLabelDirective;
    }(Core.ContainerDirective));
    Directives.ValidationLabelDirective = ValidationLabelDirective;
})(Directives || (Directives = {}));
var Directives;
(function (Directives) {
    var VerticalScrollPanelDirective = (function (_super) {
        __extends(VerticalScrollPanelDirective, _super);
        function VerticalScrollPanelDirective() {
            var _this = _super.call(this) || this;
            _this.Template = "<div><ng-transclude></ng-transclude></div>";
            return _this;
        }
        VerticalScrollPanelDirective.prototype.Link = function (scope, element, attrs, viewModel) {
            var footerElement = Ext.StringExt.HasValue(attrs["footer"]) ? $("#" + attrs["footer"]) : null;
            element.css("overflow-y", "auto");
            element.css("overflow-x", "hidden");
            this.MakeItScroll(element, footerElement);
            var that = this;
            $(window).resize(function () {
                that.MakeItScroll(element, footerElement);
            });
        };
        VerticalScrollPanelDirective.prototype.MakeItScroll = function (element, footerElement) {
            if (footerElement != null) {
                element.height($(window).height() - element.offset().top - footerElement.outerHeight(true));
                element.height(Math.max($(window).height(), $(document).height()) - element.offset().top - footerElement.outerHeight(true));
            }
            else {
                element.height($(window).height() - element.offset().top);
                element.height(Math.max($(window).height(), $(document).height()) - element.offset().top);
            }
        };
        return VerticalScrollPanelDirective;
    }(Core.ContainerDirective));
    Directives.VerticalScrollPanelDirective = VerticalScrollPanelDirective;
})(Directives || (Directives = {}));
