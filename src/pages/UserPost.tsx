import axios from "axios";
import { Link, useLoaderData } from "react-router";
import { useFavoritesStore } from "../store/FavoriteStore";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}
const API_URL = "https://jsonplaceholder.typicode.com";

export const UserPostLoader = async ({ params }: { params: { userId: string } }) => {
    const response = await axios.get(`${API_URL}/users/${params.userId}/posts`);
    const posts = response.data;
    return posts;
};

function UserPost() {
    const postsData = useLoaderData() as Post[];
    const { posts, togglePostFavorite } = useFavoritesStore();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
                Kullanıcı Postları
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {postsData.map((post) => {
                    const isFav = posts.some((p) => p.id === post.id);
                    return (
                        <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
                            <div className="flex items-center justify-between gap-3">
                                <button
                                    onClick={() => togglePostFavorite(post)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isFav
                                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                                        }`}
                                >
                                    {isFav ? (
                                        <>
                                            <span>❤️</span>
                                            <span>Favoriden Çıkar</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>🤍</span>
                                            <span>Favoriye Ekle</span>
                                        </>
                                    )}
                                </button>
                                <Link to={`/users/${post.userId}/posts/${post.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                    Postu Aç
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserPost