import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTodo } from "@/util/http.ts";
import { useState } from "react";

export function TaskBar() {
    const queryClient = useQueryClient();
    const [inputVal, setInputVal] = useState("");
    const { mutate } = useMutation({
        mutationFn: createNewTodo,
        onSuccess: () => {
           clearInput();
           queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    const btnIsDisabled = !inputVal.trim();

    const addNewTodo = () => {
        mutate({ title: inputVal });
    }
    const clearInput = () => {
        setInputVal("");
    }

    return (
        <div className="flex gap-2.5 mb-6 justify-center">
            <Input
                onInput={(e) => setInputVal((e.target as HTMLInputElement).value)}
                value={inputVal}
                className='w-96'/>
            <Button type="button" onClick={addNewTodo} disabled={btnIsDisabled}>Add task</Button>
        </div>
    )
}