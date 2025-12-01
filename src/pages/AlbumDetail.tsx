import axios from "axios";
import { Link, useLoaderData, useParams } from "react-router";
import { useFavoritesStore } from "../Store/FavoriteStore";

interface Album {
    userId: number,
    id: number,
    title: string,
}
interface Photo {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}
const API_URL = "https://jsonplaceholder.typicode.com";

export const AlbumDetailLoader = async ({ params }: { params: { albumId: string } }) => {
    const [albumRes, photosRes] = await Promise.all([
        axios.get(`${API_URL}/albums/${params.albumId}`),
        axios.get(`${API_URL}/albums/${params.albumId}/photos`)
    ]);
    return { album: albumRes.data, photos: photosRes.data };
}

function AlbumDetail() {
    const { album, photos } = useLoaderData() as { album: Album, photos: Photo[] };
    const { userId } = useParams();
    const { photos: favPhotos, togglePhotoFavorite } = useFavoritesStore();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{album.title}</h2>
                <Link className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    to={`/users/${userId}`}                    >
                    ← Albüm sahibine git
                </Link>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-6">Fotoğraflar</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo) => {
                    const isFav = favPhotos.some(p => p.id === photo.id);
                    return (
                        <div key={photo.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
                            <div className="relative group">
                                <img
                                    src={photo.thumbnailUrl}
                                    alt={photo.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => togglePhotoFavorite({
                                            id: photo.id,
                                            albumId: photo.albumId,
                                            userId: album.userId,
                                            thumbnailUrl: photo.thumbnailUrl,
                                            title: photo.title
                                        })}
                                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${isFav
                                            ? "bg-red-500/90 text-white hover:bg-red-600"
                                            : "bg-white/80 text-gray-700 hover:bg-white"
                                            }`}
                                    >
                                        {isFav ? "❤️" : "🤍"}
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {photo.title}
                                </h3>
                                <Link to={`/users/${album.userId}/albums/${album.id}`} className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                    Albüme Git →
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default AlbumDetail