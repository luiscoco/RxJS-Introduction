# rxjs--live-Sample1
These are very important links for learning RxJS library:

https://rxjs-playground.github.io/#/?html=&js=%2F%2F%20A%20simple%20illustration%20to%20count%20to%203.%0ARx.Observable.interval%281000%29.take%283%29.subscribe%28v%20%3D%3E%20console.log%28v%29%29%0A%20%20%20%20

https://rxviz.com/

https://thinkrx.io/rxjs/

https://indepth.dev/reference/rxjs/operators/merge


# These are the main differences between Promises and Observable:

promises: single value

observables: multiple values

## Example with Promises (Single Value):
Let's say you want to simulate an asynchronous operation that fetches a user's data from a server using a promise. Here's an example:

```javascript
function getUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com'
      };
      resolve(user); // Simulating successful retrieval of user data
    }, 2000); // Simulating a 2-second delay
  });
}

getUserData()
  .then(user => {
    console.log('User data:', user);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

In this example, the getUserData function returns a promise. Inside the promise's executor function, we simulate an asynchronous operation by using setTimeout to delay the resolution of the promise. Once the user data is successfully retrieved, we call resolve with the user object.

The getUserData().then() method is then used to handle the resolved promise. In the then callback, we log the user data to the console. If an error occurs during the promise chain, the catch method will handle it.

## Example with Observables (Multiple Values):
To demonstrate observables, let's create a simple example that emits a sequence of numbers over time.

```javascript

import { Observable } from 'rxjs';

function createNumberObservable() {
  return new Observable(observer => {
    let count = 0;
    const intervalId = setInterval(() => {
      observer.next(count);
      count++;

      if (count === 5) {
        observer.complete(); // Complete the observable after 5 values
        clearInterval(intervalId);
      }
    }, 1000);
  });
}

const numberObservable = createNumberObservable();

const subscription = numberObservable.subscribe(
  value => {
    console.log('Received value:', value);
  },
  error => {
    console.error('Error:', error);
  },
  () => {
    console.log('Observable complete');
  }
);

setTimeout(() => {
  subscription.unsubscribe(); // Unsubscribe after 3 seconds
}, 3000);
```

In this example, we use the RxJS library to create an observable sequence of numbers. The createNumberObservable function returns an observable that emits numbers starting from 0. We use setInterval to emit a number every second.

We subscribe to the observable using the subscribe method. The first argument to subscribe is a callback that receives the emitted values. In this case, we log each value to the console.

The second argument is an optional error callback, which will handle any errors that occur during the observable sequence.

The third argument is an optional complete callback, which is called when the observable completes. In this example, we complete the observable after emitting 5 values.

Finally, we use setTimeout to unsubscribe from the observable after 3 seconds by calling subscription.unsubscribe(). This stops the emission of further values and cleans up any resources used by the observable.


## promises: multicast

## observables: unicast (cold), multicast (hot)






## promises: eager

## observables: lazy (cold), eager (hot)





## promises: not cancelable

## observables: cancelable with unsubscribe





## promises: always asynchronous (then callback is added to microtask queue)

## observables: maybe asyncronous or syncronous, depending on body of producer function (which calls next())




## observables have operators!


unicast 1 to 1

multicast 1 to many

broadcast - 1 to all

*/
