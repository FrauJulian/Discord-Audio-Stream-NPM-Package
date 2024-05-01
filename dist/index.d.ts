declare function start({ firstName, lastName, age }: {
    firstName: String;
    lastName: String;
    age: Number;
}): void;

declare function stop({ firstName, lastName, age }: {
    firstName: String;
    lastName: String;
    age: Number;
}): void;

export { start, stop };
