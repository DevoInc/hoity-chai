Hoity (High Order ITerators Yielded) Chai plugin
======================================================================

Install
----------------------------------------------------------------------

Install with 
```
const chai = require('chai');
chai.use(require('@devo/hoity-chai'));
```


Provided extensions to Chai
----------------------------------------------------------------------

- `.iterable`:
Checks that the current value is an iterable value.
Replaces the current value with its iterator.

- `.iterator`:
Checks that the current value is an iterator object..

- `.contents`:
Expects (checks it, in fact) that the current value has passed through
an `.iterator` or `.iterable` assertion.
Then, collects all its contents in an array and pass that array
to the assertion chain tail.

- `.eql`:
Normal `.eql` has been overloaded to detect iterators
(in fact, it detects that appears after an active `.iterable`
or `.iterator`).
Both the value and its argument will be collected in an array,
and passed to a recursive `.eql` assertion.
