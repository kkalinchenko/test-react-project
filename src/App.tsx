import Todos from "./components/Todos.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Header from "@/components/Header.tsx";
import { TaskBar } from "@/components/TaskBar.tsx";

const queryClient = new QueryClient();

function App() {
  return (
      <div className='container flex-auto justify-center items-center'>
        <Header/>
        <QueryClientProvider client={queryClient}>
            <TaskBar/>
            <Todos/>
        </QueryClientProvider>
      </div>
  )
}


export default App
