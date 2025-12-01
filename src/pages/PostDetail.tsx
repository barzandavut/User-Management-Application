import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { useFavoritesStore } from "../Store/FavoriteStore";

const API_URL = "https://jsonplaceholder.typicode.com";

interface PostDetailProps {
    userId: number;
    id: number;
    title: string;
    body: string;
}
interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

export const PostDetailLoader = async ({ params }: { params: { postId: string } }) => {
    const response = await axios.get(`${API_URL}/posts/${params.postId}`)
    const post = response.data
    return post
}

function PostDetail() {
    const post = useLoaderData() as PostDetailProps;
    const { posts, togglePostFavorite } = useFavoritesStore();
    const isFav = posts.some(p => p.id === post.id);
    const [comments, setComments] = useState<Comment[]>([]);
    const { postId } = useParams()

    useEffect(() => {
        axios.get(`${API_URL}/posts/${postId}/comments`).then((res) => setComments(res.data));
    }, [postId]);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{post.body}</p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isFav
                            ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`}
                        onClick={() => togglePostFavorite(post)}>
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

                    <Link className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        to={`/users/${post.userId}`}>
                        Yazan kullanıcıya git →
                    </Link>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                    Yorumlar ({comments.length})
                </h3>
                <div className="space-y-4">
                    {comments.map((c) => (
                        <div
                            key={c.id}
                            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="mb-2">
                                <p className="font-semibold text-gray-800">{c.name}</p>
                                <p className="text-sm text-gray-500">{c.email}</p>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{c.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostDetail