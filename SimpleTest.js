/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */

var tinyTestHelper = {
    renderStats: function(tests, failures){
        var numberOfTests = Object.keys(tests).length;
        var successes = numberOfTests - failures;
        var summaryString = "Ran " + numberOfTests + " tests, Failures: " +
                            failures + ", Successes: " + successes;
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryString;
        document.body.appendChild(summaryElement);

    }
}

var TinyTest = {

    run: function(tests) {                   // run method of the TInyTest. It accepts tests as object argument
        var failures = 0;                   // failures are count to track no of test failed.
        for (var testName in tests) {        // for loop to iterate through tests object
            var testAction = tests[testName];  // testAction is actually each method of tests object.
            try {                             //// try block, if passed console 'OK' message.
                                             
                testAction.apply(this);
                var Message = 'Test: ' + testName;
                console.log("%c" + Message, "color: green");        
                //console.log('Test:', testName, 'OK');   //console test pass message
            } catch (e) {                         // catch error object as e.
                failures++;                       // increment failure variable.
                var Message = 'Test: ' + testName + ' FAILED ' + e;
                console.groupCollapsed("%c" + Message, "color: #EC1A28; font-weight: bold; font-family: AKURA POPO");           
                console.error(e.stack);
                console.groupEnd();                       
            }                                                  
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                tinyTestHelper.renderStats(tests, failures);
            }
        }, 0);     // passing callback give priority to DOM gets complete.
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);
