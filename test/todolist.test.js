const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray makes a copy of the todos', () => {
    // expect(list.toArray()).toEqual(list.todos);
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns first todo', () => {
    expect(list.first()).toBe(todo1);
  });

  test('calling last returns last todo', () => {
    expect(list.last()).toBe(todo3);
  });

  test('calling shift removes and returns the first todo', () => {
    let todo = list.shift();
    expect(todo).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
    // expect(list.shift()).toBe(todo1);
    // expect(list.size()).toBe(2);
  });

  test('calling pop removes and returns the last todo', () => {
    let todo = list.pop();
    expect(todo).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns boolean', () => {
    expect(list.isDone()).toBe(false);
  });

  test('throws TypeError if different object is added', () => {
    expect(() => list.add({})).toThrow(TypeError);
  });

  test('calling itemAt returns todo or raised ReferenceError if index is invalid', () => {
    expect(list.itemAt(2)).toBe(todo3);
    expect(() => list.itemAt(50)).toThrow(ReferenceError);
  });

  test('calling markDoneAt marks a todo as done or raises a ReferenceError if index is invalid', () => {
    list.markDoneAt(2);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
    expect(() => list.markDoneAt(5).toThrow(ReferenceError));
  });

  test('calling markUndoneAt marks a todo as undone', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
    expect(() => list.markUndoneAt(5).toThrow(ReferenceError));

    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('calling markAllDone marks all todos as done', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('calling removeAt removes and returns a todo from the list', () => {
    expect(() => list.removeAt().toThrow(ReferenceError));

    expect(list.removeAt(1)[0]).toEqual(todo2);
    expect(list.toArray()).toEqual([todo1, todo3])
  });

  test('calling toString returns a string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('calling toString returns a string representation of the list', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    list.markDoneAt(0);
    expect(list.toString()).toBe(string);
  });

  test('calling toString returns a string representation of the list', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('calling forEach iterates over the todos in the list', () => {
    list.forEach(todo => todo.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('calling filter returns a new list with the selected todos', () => {
    list.markDoneAt(1);
    let testList = new TodoList("Today's Todos");
    // let newList = new TodoList(list.title);
    // newList.add(todo1);
    // expect(newList.title).toBe(list.title);
    // let doneItems = list.filter(todo => todo.isDone());
    // expect(doneItems.toString()).toBe(newList.toString());
    testList.add(todo2);
    expect(list.filter(todo => todo.isDone())).toEqual(testList);
  });
})