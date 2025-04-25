function createPromise(name, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Mission ${name} completed`);
            resolve(name);
        }, time);
    });
}

async function processPromises() {
    // Create a list of promises
    let promiseList = [
        createPromise("Task A", 3000),  // Completes in 3 seconds
        createPromise("Task B", 2000),  // Completes in 2 seconds
        createPromise("Task C", 1000)   // Completes in 1 second
    ];

    while (promiseList.length > 0) {
        const finishedPromise = await Promise.race(promiseList.map(p => p.then(result => ({ result, promise: p }))));

        promiseList = promiseList.filter(p => p !== finishedPromise.promise);

        console.log(`Removed: ${finishedPromise.result}, Remaining tasks: ${promiseList.length}`);
    }

    console.log("All tasks completed!");
}

// Execute
processPromises();

