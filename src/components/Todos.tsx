import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos, updateTodo } from "@/util/http.ts";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function Todos () {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })
    const { mutate } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    const { mutate : mutateUpdate } = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    const handleComplete = (id: string, title: string) => {
        mutateUpdate({
            id,
            todo: {
                title,
                completed: true
            }
        })
    }

    let content;
    if (isLoading) {
        content = (<div>Loading...</div>)
    } else {
        content = (
            data?.map(({ id, title, completed }) => (
                <Card key={id} className={`mb-4 flex justify-between flex-col ${completed ? 'border-emerald-600 bg-green-100' : ""}`}>
                    <CardHeader>{ title }</CardHeader>
                    <CardContent>
                        <p className="font-bold"></p>
                    </CardContent>
                    <CardFooter className="flex gap-2 justify-end">
                        {!completed && <Button className="bg-emerald-600" onClick={() => handleComplete(id, title)}>Complete</Button>}
                        <Button className="bg-red-600" onClick={() => mutate(id)}>Delete</Button>
                    </CardFooter>
                </Card>
            ))
        )
    }
    return (
        <div className="grid grid-cols-4 gap-4 px-4">
            { content }
        </div>
    )
}