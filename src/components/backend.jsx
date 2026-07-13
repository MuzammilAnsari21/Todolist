function getWrapper(){
    const storeData = localStorage.getItem("todo");
    if (!storeData) return [];

    if (storeData) {
        try {
            const parsedData = JSON.parse(storeData);
            const now = new Date();

            if (now.getTime() > parsedData.expiry) {
                localStorage.removeItem("todo");
                return [];
            } 
            return parsedData.value || [];
        } catch (e) {
            return [];
        }
    }
}

function saveWrapper(todoArry){
    const now = new Date();
    const wrapper = {
        value: todoArry,
        expiry: now.getTime() + 86400000,
    };

    localStorage.setItem("todo", JSON.stringify(wrapper));
}

export function create(name, task) {

    const currentTodo = getWrapper();
    const id = crypto.randomUUID();

    const createtodo = {
        id,
        name,
        task,
        completed: false,
    };

    const updatetodo = [...currentTodo, createtodo];
    saveWrapper(updatetodo)

    return updatetodo;
}

export function updatecheck(id, completed){
    const todo = getWrapper();

    const updatecheck = todo.map((t) =>
        t.id === id ? {...t, completed} : t
    )

    saveWrapper(updatecheck)
    return updatecheck;
}

export function getTodo(){
    return getWrapper();
}

export function todoDelete(id){
    const todo = getWrapper();
    const todoUpdate = todo.filter((t) => t.id !== id )
    saveWrapper(todoUpdate)

    return todoUpdate;
}