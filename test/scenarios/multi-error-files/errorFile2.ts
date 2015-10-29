class A {
    constructor() {
        for (var i = 0; i < 10; ++i) {
            debugger;
            eval("something");
        }
    }
}
