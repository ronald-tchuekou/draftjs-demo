import React from "react"
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ArticleModel from "../models/article.model.ts";
import {useNavigate} from "react-router-dom";
import {getArticles} from "../services/articles.service.ts";
import Loading from "../components/loading.tsx";
import Empty from "../components/empty.tsx";

const HomeScreen: React.FC = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = React.useState<boolean>(false)
    const [articles, setArticles] = React.useState<ArticleModel[]>([])

    /**
     * To set to the details screen.
     */
    const showDetails = React.useCallback(
        (article_id: string) => {
            navigate(`/details/${article_id}`)
        },
        [navigate]
    )

    /**
     * To set to the add article screen.
     */
    const addNew = React.useCallback(
        () => {
            navigate(`/add`)
        },
        [navigate]
    )

    /**
     * To load content.
     */
    const loadContent = React.useCallback(
        async () => {
            setLoading(true)

            const response: any = await getArticles()

            setLoading(false)

            if (response.error) {
                console.log(response.error)
                return;
            }

            setArticles(response)
        },
        []
    )

    React.useEffect(
        () => {
            (async () => await loadContent())()
        },
        []
    )

    return (
        <div className={"h-full flex flex-col divide-y"}>
            <div className={"py-3 bg-gray-100 text-gray-700 flex-none flex items-center justify-between px-5"}>
                <div className={"text-xl font-bold"}>
                    Home content
                </div>
                <div className={"flex flex-row gap-3 items-center"}>
                    <button
                        onClick={addNew}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faAdd}/>
                    </button>
                </div>
            </div>
            <div className={"h-full w-full overflow-y-auto"}>
                {loading ? (
                    <Loading/>
                ) : articles.length > 0 ? (
                    <div className={"divide-y"}>
                        {articles.map(item => (
                            <button
                                key={item.id}
                                onClick={() => showDetails(item?.id || "")}
                                className={"w-full hover:bg-gray-100 p-5 flex justify-start items-start line-clamp-2 text-left font-semibold"}>
                                {item.title}
                            </button>
                        ))}
                    </div>
                ) : <Empty/>}
            </div>
        </div>
    )
}

export default HomeScreen
