import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoritePhoto {
    id: number;
    albumId: number;
    userId: number;
    thumbnailUrl: string;
    title: string;
}

export interface FavoritePost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface FavoritesState {
    photos: FavoritePhoto[];
    posts: FavoritePost[];

    togglePhotoFavorite: (photo: FavoritePhoto) => void;
    togglePostFavorite: (post: FavoritePost) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            photos: [],
            posts: [],

            togglePhotoFavorite: (photo) => {
                const current = get().photos;
                const exists = current.some((p) => p.id === photo.id);
                if (exists) {
                    set({ photos: current.filter((p) => p.id !== photo.id) });
                } else {
                    set({ photos: [...current, photo] });
                }
            },
            togglePostFavorite: (post) => {
                const current = get().posts;
                const exists = current.some((p) => p.id === post.id);
                if (exists) {
                    set({ posts: current.filter((p) => p.id !== post.id) });
                } else {
                    set({ posts: [...current, post] });
                }
            },
        }),
        { name: "favorites-storage" }
    )
);
