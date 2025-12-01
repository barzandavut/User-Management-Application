import axios from "axios";
import { useLoaderData } from "react-router";

const API_URL = "https://jsonplaceholder.typicode.com";

interface TodosProps {
    id: number,
    user: number,
    title: string,
    completed: boolean
}

export const UserTodosLoader = async ({ params }: { params: { userId: string } }) => {
    const response = await axios.get(`${API_URL}/users/${params.userId}/todos`);
    return response.data;
}

const UserTodos = () => {
    const todos = useLoaderData() as TodosProps[];

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
                    Kullanıcı Yapılacaklar Listesi
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {todos.map((todo) => (
                        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 border border-gray-200 flex items-center gap-4">
                            <div
                                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${todo.completed
                                    ? "bg-green-500 border-green-500"
                                    : "border-gray-300"
                                    }`}
                            >
                                {todo.completed && (
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span
                                className={`text-lg ${todo.completed ? "text-gray-400 line-through" : "text-gray-700"
                                    }`}
                            >
                                {todo.title}
                            </span>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default UserTodos