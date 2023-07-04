// operators decision tree: https://rxjs.dev/operator-decision-tree

import {
	Subject,
	combineLatest,
	filter,
	from,
	fromEvent,
	interval,
	map,
	of,
	range,
	take,
	tap,
	timer,
	withLatestFrom,
} from 'rxjs';




// = creation operators
// ~ of
{
	of([1, 2, 3]).subscribe((r) => {
		console.log(r);
	});
	of(1).subscribe((r) => {
		console.log(r);
	});
	of('string').subscribe((r) => {
		console.log(r);
	});
	// prints exactly what it receives
}

// ~ from
{
	// used with Observables, Promises, Iterables.
	// iterates them and outputs values 1 by 1
	from([1, 2, 3]).subscribe((r) => {
		console.log(r);
	});

	from('string').subscribe((r) => {
		console.log(r);
	});

	from(Promise.resolve([1, 2, 3])).subscribe((r) => {
		console.log(r);
	});
	}
// ~ fromEvent
{
	// fromEvent(document.body, 'click').subscribe((r) => {
	// 	console.log(r);
	// });
	// will run on each click event
}

// ~ range
{
	range(0, 5).subscribe((r) => {
		console.log(r);
	});
}

// = transformations

// ~ map
// used to transform values
{
	range(0, 5)
		.pipe(
			map((value) => {
				return value + 10;
			})
		)
		.subscribe((r) => {
			console.log(r);
		});
}

// ~ tap
// used to perform side-effects. return value is discarded. can be used for logging
{
	let sum = 0;
	range(0, 5)
		.pipe(
			tap((value) => {
				sum += value;
				return value + 10;
			})
		)
		.subscribe((r) => {
			console.log(r);
			console.log(sum);
		});
}

// ~ filter
// used to filter the values
range(0, 5)
	.pipe(filter((value) => Boolean(value % 2)))
	.subscribe((r) => {
		console.log(r);
	});

// ~ take, interval, timer
{
	// 'time' filter. Emits only the first count values emitted by the source Observable.
	range(0, 5)
		.pipe(take(3))
		.subscribe((r) => {
			console.log(r);
		});

	interval(100)
		.pipe(take(5))
		.subscribe((r) => {
			console.log(r);
		});

	// in addition receives startDue as a first argument, that allows to wait for a certain period of time before starting to emit values
	timer(500, 100)
		.pipe(take(5))
		.subscribe((r) => {
			console.log(r);
		});
}
// = combining operators
// ~ combineLatest
{
	// combines the latest values of 2 observables,
	// waits for both observables to emit at least once
	// emits every time one of them emits a value
	const colors$ = new Subject();
	const cars$ = new Subject();

	combineLatest([colors$, cars$]).subscribe(([color, car]) => {
		console.log(`${color} + ${car}`);
	});

	colors$.next('green'); // not yet, no value for 'car' emitted!
	cars$.next('Tesla'); // both values have been emitted at least once, so the combined value can be composed and emitted

	colors$.next('red'); // triggers emission
	cars$.next('Ferrari'); // triggers emission
}


// ~ withLatestFrom
{
	// combines the latest values of 2 observables,
	// waits for both observables to emit at least once
	// emits only when the main observable emits!
	const colors$ = new Subject();
	const cars$ = new Subject();

	colors$.pipe(withLatestFrom(cars$)).subscribe(([color, car]) => {
		console.log(`${color} + ${car}`);
	});

	colors$.next('green'); // ignored, not all subjects have emitted yet
	cars$.next('Tesla'); // both values have been emitted, but this is not the main observable emission, so it still will be ignored

	colors$.next('red'); // now it triggers emission (happend on the main observable) red + Tesla
	cars$.next('Ferrari'); // ignored (not the main observable)
	}


