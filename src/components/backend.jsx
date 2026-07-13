import nextId from "react-id-generator"

export function create(name, task){
    const todo = JSON.parse(localStorage.getItem('todo')) || [];

    const id = crypto.randomUUID();

    const createtodo = {
        id,
        name,
        task,
        completed: false,
    };

    const updatetodo = [...todo, createtodo];
    localStorage.setItem('todo', JSON.stringify(updatetodo));

    return updatetodo;

}

export function updatecheck(id, completed){
    const todo = JSON.parse(localStorage.getItem('todo')) || [];

    const updatecheck = todo.map((t) =>
        t.id === id ? {...t, completed} : t
    )

    localStorage.setItem('todo', JSON.stringify(updatecheck));
    return updatecheck;
}

export function getTodo(){
    const todo = JSON.parse(localStorage.getItem('todo')) || [];
    return todo;
}

export function todoDelete(id){
    const todo = JSON.parse(localStorage.getItem('todo')) || [];
    const todoUpdate = todo.filter((t) => t.id !== id )
    localStorage.setItem('todo', JSON.stringify(todoUpdate))

    return todoUpdate;
}