import { Link } from "react-router";
import { useFavoritesStore } from "../Store/FavoriteStore";

export default function FavoritesPage() {
    const { photos, posts, togglePhotoFavorite, togglePostFavorite } = useFavoritesStore();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
                Favoriler
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Favorite Photos Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        Favori Fotoğraflar ({photos.length})
                    </h2>
                    {photos.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                            <p className="text-gray-500">Henüz favori fotoğraf eklenmemiş.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {photos.map((photo) => (
                                <div key={photo.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
                                    <div className="relative group">
                                        <img
                                            src={photo.thumbnailUrl}
                                            alt={photo.title}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <button
                                                onClick={() => togglePhotoFavorite(photo)}
                                                className="p-2 rounded-full backdrop-blur-sm transition-all duration-200 bg-red-500/90 text-white hover:bg-red-600"
                                                aria-label="Favoriden çıkar"
                                            >
                                                ❤️
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                            {photo.title}
                                        </h3>
                                        <Link
                                            to={`/users/${photo.userId}/albums/${photo.albumId}`}
                                            className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                        >
                                            Albüme Git →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Favorite Posts Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        Favori Postlar ({posts.length})
                    </h2>
                    {posts.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                            <p className="text-gray-500">Henüz favori post eklenmemiş.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>

                                    <div className="flex items-center justify-between gap-3">
                                        <button
                                            onClick={() => togglePostFavorite(post)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                        >
                                            <span>❤️</span>
                                            <span>Favoriden Çıkar</span>
                                        </button>

                                        <Link
                                            to={`/users/${post.userId}/posts/${post.id}`}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                        >
                                            Postu Aç
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
