# RxJS-Introduction

This is the official RxJS site web page: https://rxjs.dev/guide/observable

These are very important links for learning RxJS library:

https://rxjs-playground.github.io/#/?html=&js=%2F%2F%20A%20simple%20illustration%20to%20count%20to%203.%0ARx.Observable.interval%281000%29.take%283%29.subscribe%28v%20%3D%3E%20console.log%28v%29%29%0A%20%20%20%20

https://rxviz.com/

https://thinkrx.io/rxjs/

https://indepth.dev/reference/rxjs/operators/merge

# Note 1: 
Observables are lazy Push collections of multiple values. They fill the missing spot in the following table:
```
        SINGLE       MULTIPLE
Pull	Function     Iterator
Push	Promise	     Observable
```

# Note 2: 
unicast 1 to 1

multicast 1 to many

broadcast - 1 to all

# Promises:
In JavaScript, a promise is an object that represents the eventual completion or failure of an asynchronous operation. It is commonly used when working with asynchronous code, such as fetching data from a server or performing an operation that takes time to complete. Promises provide a way to handle the result of an asynchronous operation when it becomes available.

A promise can be in one of three states:

Pending: The initial state of a promise. The asynchronous operation has not completed yet.
Fulfilled: The promise has been resolved successfully with a result value.
Rejected: The promise has encountered an error or failure and has been rejected with a reason for the failure.
Promises have two main methods for handling the result or error of an asynchronous operation:

then(): This method is used to handle the successful fulfillment of a promise. It takes two arguments: a callback function to be executed when the promise is fulfilled, and an optional callback function to handle errors.

```javascript
promise.then(onFulfilled, onRejected);
```
catch(): This method is used to handle errors or rejections in a promise chain. It is similar to providing a rejection callback to the then() method, but it only handles errors and does not handle successful fulfillment.

```javascript
promise.catch(onRejected);
```

Here's an example code snippet that demonstrates the usage of a promise and how to subscribe to it:

```javascript
// Create a promise that resolves after a certain delay
const delayPromise = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise resolved after ' + delay + ' milliseconds');
    }, delay);
  });
};

// Use the promise and subscribe to its result
const promise = delayPromise(2000); // Resolves after 2 seconds

console.log('Before promise subscription');

promise
  .then((result) => {
    console.log('Promise resolved:', result);
  })
  .catch((error) => {
    console.log('Promise rejected:', error);
  });

console.log('After promise subscription');
```

# Observables:
Observables represent a stream of values over time. They can be either cold or hot, depending on how the values are produced and consumed.

## Cold Observable:
A cold observable starts producing values only when a subscription is made, and each subscriber receives its own independent stream of values.

```javascript
import { Observable } from 'rxjs';

// Creating a cold observable
const coldObservable = new Observable(observer => {
  let count = 0;
  const interval = setInterval(() => {
    observer.next(count);
    count++;
  }, 1000);

  // Clean up the interval on unsubscribe
  return () => {
    clearInterval(interval);
  };
});

// Subscribing to the cold observable (first subscriber)
const subscription1 = coldObservable.subscribe(value => {
  console.log('Subscriber 1 received:', value);
});

// Subscribing to the cold observable (second subscriber)
const subscription2 = coldObservable.subscribe(value => {
  console.log('Subscriber 2 received:', value);
});

// Unsubscribing from the cold observable (first subscriber)
subscription1.unsubscribe();
```

## Hot Observable:
A hot observable starts producing values immediately, regardless of subscriptions. All subscribers share the same stream of values.

```javascript
import { Subject } from 'rxjs';

// Creating a hot observable
const hotObservable = new Subject();

// Producing values for the hot observable
let count = 0;
setInterval(() => {
  hotObservable.next(count);
  count++;
}, 1000);

// Subscribing to the hot observable (first subscriber)
const subscription1 = hotObservable.subscribe(value => {
  console.log('Subscriber 1 received:', value);
});

// Subscribing to the hot observable (second subscriber)
const subscription2 = hotObservable.subscribe(value => {
  console.log('Subscriber 2 received:', value);
});

// Unsubscribing from the hot observable (first subscriber)
subscription1.unsubscribe();
```

# Differences between Promises and Observable:

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


## Promises: multicast (a single Promise instance is shared among multiple consumers)
In JavaScript, Promise multicast refers to a technique where a single Promise instance is shared among multiple consumers. This allows multiple subscribers to wait for the resolution of a Promise without triggering redundant network requests or expensive computations.

By default, when you chain multiple .then() callbacks onto a Promise, each callback creates a new Promise instance. This means that if you have multiple subscribers listening for the resolution of a Promise, each subscriber triggers a separate execution path, potentially resulting in redundant operations.

To implement Promise multicast, you can create a custom class that manages the Promise instance and its subscribers. Here's a simple example of implementing Promise multicast in JavaScript:

```javascript
class PromiseMulticast {
  constructor(promiseFn) {
    this.promise = new Promise(promiseFn);
    this.subscribers = new Set();
    this.result = null;

    this.promise.then(result => {
      this.result = result;
      for (const subscriber of this.subscribers) {
        subscriber(result);
      }
    });
  }

  then(callback) {
    if (this.result !== null) {
      callback(this.result);
    } else {
      this.subscribers.add(callback);
    }
    return this;
  }
}
```

## Observables: unicast (cold)

In the context of reactive programming, observables are a fundamental concept. An observable represents a stream of data that can be observed by subscribers, who can react to the emitted values. Observables can be categorized based on various characteristics, one of which is unicast or multicast behavior.

Unicast observables, also known as cold observables, follow a one-to-one relationship between the producer (observable) and the consumer (subscriber). Each subscriber receives its own independent stream of data. When a subscriber subscribes to a unicast observable, it triggers the execution of the observable from the beginning, and the data stream is generated specifically for that subscriber.

Let's consider an example to illustrate a unicast (cold) observable in JavaScript using the RxJS library:

```javascript
// Import the necessary modules
const { Observable } = require('rxjs');

// Create a unicast (cold) observable
const observable = new Observable((subscriber) => {
  // Emit three values asynchronously with a delay
  setTimeout(() => {
    subscriber.next('Value 1');
  }, 1000);

  setTimeout(() => {
    subscriber.next('Value 2');
  }, 2000);

  setTimeout(() => {
    subscriber.next('Value 3');
    subscriber.complete(); // Complete the observable
  }, 3000);
});

// Subscriber 1
observable.subscribe({
  next: (value) => console.log(`Subscriber 1 received: ${value}`),
  complete: () => console.log('Subscriber 1 completed'),
});

// Subscriber 2
setTimeout(() => {
  observable.subscribe({
    next: (value) => console.log(`Subscriber 2 received: ${value}`),
    complete: () => console.log('Subscriber 2 completed'),
  });
}, 1500);
```

In this example, we create a unicast (cold) observable using the Observable constructor from RxJS. The observable emits three values asynchronously with a delay of 1 second between each value. After emitting the third value, it completes the observable.

We then create two subscribers: Subscriber 1 and Subscriber 2. Subscriber 1 subscribes immediately to the observable and starts receiving values. Subscriber 2 subscribes after a delay of 1.5 seconds. As a unicast observable, Subscriber 2 starts receiving values from the beginning, independent of Subscriber 1. Each subscriber has its own independent stream of data.

When you run this code, you will see the following output:

Subscriber 1 received: Value 1

Subscriber 1 received: Value 2

Subscriber 1 received: Value 3

Subscriber 1 completed

Subscriber 2 received: Value 1

Subscriber 2 received: Value 2

Subscriber 2 received: Value 3

Subscriber 2 completed

As you can observe, each subscriber receives the values emitted by the observable independently, and they both receive the complete notification when the observable is completed. This demonstrates the unicast (cold) behavior of the observable.

## Observables: multicast (hot)

In JavaScript, observables are a key concept in reactive programming and are often used in frameworks like RxJS. Observables represent streams of data over time, allowing you to subscribe to them and react to any values emitted by the stream. One type of observable is the multicast observable, specifically the "hot" multicast observable.

A multicast observable can have multiple subscribers, and it emits the same sequence of values to all subscribers simultaneously. This means that when a value is emitted by the source observable, all subscribers receive that value at the same time. This is in contrast to a "cold" observable, where each subscriber receives a separate instance of the stream.

Here's a simple example to illustrate the concept of a hot multicast observable in JavaScript using RxJS:

```javascript
// Import the necessary RxJS functions
import { Subject } from 'rxjs';

// Create a new Subject
const multicastObservable = new Subject();

// Emit values to the observable
multicastObservable.next('Value 1');
multicastObservable.next('Value 2');

// Create subscribers
const subscriber1 = multicastObservable.subscribe(value => {
  console.log(`Subscriber 1 received: ${value}`);
});

const subscriber2 = multicastObservable.subscribe(value => {
  console.log(`Subscriber 2 received: ${value}`);
});

// Emit another value
multicastObservable.next('Value 3');
```

In this example, we first import the Subject class from the RxJS library. A Subject is a type of multicast observable. We create a new Subject called multicastObservable.

Next, we emit some values to the multicastObservable using the next method. Both subscribers, subscriber1 and subscriber2, are already created and subscribed to the observable.

When we emit the values, both subscribers receive the same sequence of values simultaneously. In this case, the console output would be:

Subscriber 1 received: Value 1

Subscriber 2 received: Value 1

Subscriber 1 received: Value 2

Subscriber 2 received: Value 2

Subscriber 1 received: Value 3

Subscriber 2 received: Value 3

As you can see, both subscribers receive all the emitted values. This demonstrates the concept of a hot multicast observable in JavaScript.


## promises: eager

## observables: lazy (cold), eager (hot)





## promises: not cancelable

## observables: cancelable with unsubscribe





## promises: always asynchronous (then callback is added to microtask queue)

## observables: maybe asyncronous or syncronous, depending on body of producer function (which calls next())




## observables have operators!




*/
