import axios from "axios";
import { Link, useLoaderData } from "react-router"


const API_URL = "https://jsonplaceholder.typicode.com";

interface UserProps {
    userId: number;
    name: string;
    username: string;
    email: string;
}

export const UserDetailLoader = async ({ params }: { params: { userId: string } }) => {
    const response = await axios.get(`${API_URL}/users/${params.userId}`);
    const users = response.data;
    return users;
};
function UserDetail() {

    const users = useLoaderData() as UserProps;
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                            <span className="text-white text-3xl font-bold">
                                {users.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{users.name}</h1>
                            <p className="text-gray-600 mt-1">{users.email}</p>
                            <p className="text-gray-500 text-sm">@{users.username}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Postlar Linki */}
                    <Link
                        to={`posts`}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                Postlar
                            </h2>
                            <span className="text-3xl">📝</span>
                        </div>
                        <p className="text-gray-600">
                            Kullanıcının paylaştığı tüm postları görüntülemek için tıklayın.
                        </p>
                    </Link>

                    {/* Albümler Linki */}
                    <Link
                        to={`albums`}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                Albümler
                            </h2>
                            <span className="text-3xl">🖼️</span>
                        </div>
                        <p className="text-gray-600">
                            Kullanıcının fotoğraf albümlerini görüntülemek için tıklayın.
                        </p>
                    </Link>

                    {/* Todos Linki */}
                    <Link
                        to={`todos`}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                                Yapılacaklar
                            </h2>
                            <span className="text-3xl">✅</span>
                        </div>
                        <p className="text-gray-600">
                            Kullanıcının yapılacaklar listesini görüntülemek için tıklayın.
                        </p>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default UserDetail