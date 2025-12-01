import axios from "axios";
import { Link, useLoaderData } from "react-router";


const API_URL = "https://jsonplaceholder.typicode.com";

interface UserAlbumProps {
    id: number,
    userId: number,
    title: string,
};

export const UserAlbumLoader = async ({ params }: { params: { userId: string } }) => {
    const response = await axios.get(`${API_URL}/users/${params.userId}/albums`)
    const albums = response.data
    return albums
}

function UserAlbum() {
    const albums = useLoaderData() as UserAlbumProps[]
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
                    Kullanıcı Albümleri
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {albums.map((album) => (
                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2">{album.title}</h3>

                            <Link to={`/users/${album.userId}/albums/${album.id}`}
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                Albümü Aç
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserAlbum