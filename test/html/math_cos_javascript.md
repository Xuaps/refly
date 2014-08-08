# Math.cosh()

**This is an experimental technology, part of the Harmony (ECMAScript 6) proposal.**
Because this technology's specification has not stabilized, check the [compatibility table][0] for usage in various browsers. Also note that the syntax and behavior of an experimental technology is subject to change in future version of browsers as the spec changes.

## Summary

The `**Math.cosh()**` function returns the hyperbolic cosine of a number, that can be expressed using the [constant e][1]:

Math.cosh(x)=ex+e-x2\\mathtt{\\operatorname{Math.cosh(x)}} = \\frac{e^x + e^{-x}}{2}

## Syntax


    Math.cosh(_x_)

### Parameters

**`x`**

> A number.

## Description

Because `cos`h is a static method of `Math`, you always use it as `Math.cosh()`, rather than as a method of a `Math` object you created (Math is not a constructor).

## Examples

### Example: Using `Math.cosh`


    Math.cosh(0);  // 1
    Math.cosh(1);  // 1.5430806348152437
    Math.cosh(-1); // 1.5430806348152437


## Polyfill

This can be emulated with the help of the [`exp()`][2] function:


    function cosh(x) {
        return (Math.exp(x) + Math.exp(-x)) / 2;
    }

or using only one call to the [`exp()`][2] function:


    function cosh(x) {
        var y = Math.exp(x);
        return (y + 1 / y) / 2;
    }

## Specifications
Specification
Status
Comment

[ECMAScript 6 (ECMA-262)
The definition of 'Math.cosh' in that specification.][3]
Draft
Initial definition.

## Browser compatibility

* Desktop
* Mobile

Feature
Chrome
Firefox (Gecko)
Internet Explorer
Opera
Safari

Basic support
Not supported
[25][4] (25)
Not supported
Not supported
Not supported

Feature
Android
Chrome for Android
Firefox Mobile (Gecko)
IE Mobile
Opera Mobile
Safari Mobile

Basic support
Not supported
Not supported
25.0 (25)
Not supported
Not supported
Not supported



[0]: #Browser_compatibility
[1]: /en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/E
[2]: /en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/exp "The Math.exp() function returns ex, where x is the argument, and e is Euler's constant, the base of the natural logarithms."
[3]: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.cosh
[4]: /en-US/Firefox/Releases/25 "Released on undefined."