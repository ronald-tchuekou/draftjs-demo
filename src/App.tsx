import React from "react"
import './App.css'
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/image/lib/plugin.css';
import HomeScreen from "./screens/home.screen";
import EditScreen from "./screens/edit.screen";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Loading from "./components/loading.tsx";
import DetailsScreen from "./screens/details.scren.tsx";
import AddScreen from "./screens/add.screen.tsx";

/**
 * Route manager
 */
const router = createBrowserRouter([
    {path: "/", Component: HomeScreen},
    {path: "/add", Component: AddScreen},
    {path: "/details/:article_id", Component: DetailsScreen},
    {path: "/edit/:article_id", Component: EditScreen},
])

function App() {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<Loading/>}/>
    )
}

export default App
