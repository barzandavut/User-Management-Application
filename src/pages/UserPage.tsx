import axios from "axios";
import { Link, useLoaderData } from "react-router";

const API_URL = "https://jsonplaceholder.typicode.com";

interface UserPageProps {
    id: number,
    userId: number,
    name: string,
    username: string,
    email: string,
}
export const UserLoader = async () => {
    const response = await axios.get(`${API_URL}/users`)
    const users = response.data
    return users
}

const UserPage = () => {
    const users = useLoaderData() as UserPageProps[];
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
                Kullanıcılar
            </h1>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 flex flex-col items-center text-center">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                                <span className="text-white text-2xl font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
                            <p className="text-gray-600 mb-4">{user.email}</p>

                            <Link
                                className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-auto"
                                to={`/users/${user.id}`}>
                                Profili Aç
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default UserPage