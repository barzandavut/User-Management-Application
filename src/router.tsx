import { createBrowserRouter } from "react-router";
import RootLayout from "./components/Layout";
import UserPage, { UserLoader } from "./pages/UserPage";
import UserDetail, { UserDetailLoader } from "./pages/UserDetail";
import UserPost, { UserPostLoader } from "./pages/UserPost";
import UserAlbum, { UserAlbumLoader } from "./pages/UserAlbum";
import Favorites from "./pages/Favorites";
import UserTodos, { UserTodosLoader } from "./pages/UserTodos";
import AlbumDetail, { AlbumDetailLoader } from "./pages/AlbumDetail";
import PostDetail, { PostDetailLoader } from "./pages/PostDetail";

const routes = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <UserPage />,
                loader: UserLoader
            },
            {
                path: "favorites",
                element: <Favorites />
            },

            {
                path: "users/:userId",
                children: [
                    {
                        index: true,
                        element: <UserDetail />,
                        loader: UserDetailLoader
                    },
                    {
                        path: "posts",
                        element: <UserPost />,
                        loader: UserPostLoader
                    },
                    {
                        path: "albums",
                        element: <UserAlbum />,
                        loader: UserAlbumLoader
                    },
                    {
                        path: "albums/:albumId",
                        element: <AlbumDetail />,
                        loader: AlbumDetailLoader
                    },
                    {
                        path: "posts/:postId",
                        element: <PostDetail />,
                        loader: PostDetailLoader
                    },
                    {
                        path: "todos",
                        element: <UserTodos />,
                        loader: UserTodosLoader
                    }
                ]
            }
        ]
    }
]

const router = createBrowserRouter(routes)

export default router