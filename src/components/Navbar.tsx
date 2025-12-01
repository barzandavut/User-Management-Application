import { Link } from "react-router"
import { useFavoritesStore } from "../Store/FavoriteStore";

function Navbar() {
    const { photos, posts } = useFavoritesStore();
    const favoriteCount = photos.length + posts.length;

    return (
        <>
            <nav className="bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link
                                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                                to="/"
                            >
                                Kullanıcılar
                            </Link>

                            <Link
                                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium relative flex items-center gap-2"
                                to="/favorites"
                            >
                                Favoriler
                                {favoriteCount > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {favoriteCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar