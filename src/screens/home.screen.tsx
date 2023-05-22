import React from "react"
import {faAdd, faBlog, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ArticleModel from "../models/article.model.ts";
import {useNavigate} from "react-router-dom";
import {deleteArticle, getArticles} from "../services/articles.service.ts";
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

    /**
     * To delete an article.
     */
    const deleteOne = React.useCallback(
        async (article_id: string) => {
            const answer = confirm("Voulez-vous vraiment supprimer cette article ?")

            if (!answer)
                return;

            setLoading(true)

            const response: any = await deleteArticle(article_id)
            setLoading(false)

            if (response.error) {
                console.log(response.error)
                return;
            }
            await loadContent()
        },
        [loadContent]
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
                            <div
                                key={item.id}
                                className={"w-full hover:bg-gray-100 flex flex-row cursor-pointer"}>
                                <div
                                    onClick={() => showDetails(item?.id || "")}
                                    className={"w-full flex flex-row py-5 items-center"}>
                                    <div className={"flex-none w-16 flex justify-center items-center"}>
                                        <FontAwesomeIcon
                                            className={"text-sky-400"}
                                            transform="grow-10"
                                            icon={faBlog}/>
                                    </div>
                                    <div className={"w-full line-clamp-2 text-left font-semibold"}>
                                        {item.title}
                                    </div>
                                </div>
                                <div className={"flex-none flex flex-row gap-3 items-center p-5"}>
                                    <button
                                        onClick={() => deleteOne(item.id || "")}
                                        className={"icon-btn"}>
                                        <FontAwesomeIcon
                                            transform="grow-3"
                                            icon={faTrash}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <Empty/>}
            </div>
        </div>
    )
}

export default HomeScreen
