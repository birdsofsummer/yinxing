export let methodCalled = 0;

export function add(x, y) {
    methodCalled++;
    return x+y;
}
