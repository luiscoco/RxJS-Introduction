# rxjs--live-Sample1

https://rxjs-playground.github.io/#/?html=&js=%2F%2F%20A%20simple%20illustration%20to%20count%20to%203.%0ARx.Observable.interval%281000%29.take%283%29.subscribe%28v%20%3D%3E%20console.log%28v%29%29%0A%20%20%20%20

https://rxviz.com/

https://thinkrx.io/rxjs/

https://indepth.dev/reference/rxjs/operators/merge


Promise function/s is only executed once.

Observables function/s could be executed several times.

/* Differences:

promises: single value
observables: multiple values

promises: multicast

observables: unicast (cold), multicast (hot)

promises: eager

observables: lazy (cold), eager (hot)

promises: not cancelable

observables: cancelable with unsubscribe

promises: always asynchronous (then callback is added to microtask queue)

observables: maybe asyncronous or syncronous, depending on body of producer function (which calls next())

observables have operators!
*/



/*

unicast 1 to 1

multicast 1 to many

broadcast - 1 to all

*/
