export type Todo = {
    id: string;
    title: string;
    completed: boolean;
}

export type Todos = Todo[];
export const getTodos = async () : Promise<Todo[]> => {
    const response = await fetch("http://localhost:3000/todos");

    if(!response.ok) {
        throw new Error("Error occurred while fetching data");
    }
    const { todos } = await response.json();
    return todos;
}

export const createNewTodo = async ({ title } :  Pick<Todo, 'title'>) => {
    const response = await fetch(`http://localhost:3000/todos`, {
        method: 'POST',
        body: JSON.stringify({
            todo: {
                title,
                completed: false,
            }
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('An error occurred while creating the task');
    }

    const { todo } = await response.json();
    return todo;
}

export async function deleteTodo(id: string) {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('An error occurred while deleting the task');
    }
    return response.json();
}

export async function updateTodo({ id, todo } : { id: string, todo: Pick<Todo, 'title' | 'completed'> }) {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ todo }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('An error occurred while updating the task');
    }
    return response.json();
}