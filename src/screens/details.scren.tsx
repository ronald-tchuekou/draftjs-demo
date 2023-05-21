import React from "react"
import {convertFromRaw, EditorState} from "draft-js";
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import {faArrowLeft, faPenToSquare, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {linkDecorator} from "../components/editor-toolbar/decorators.tsx";
import {blockStyleFn, styleMap} from "../helpers/editor-actions.helper.ts";
import ArticleModel from "../models/article.model.ts";
import {useNavigate, useParams} from "react-router-dom";
import {getArticleById} from "../services/articles.service.ts";
import Loading from "../components/loading.tsx";

const DetailsScreen: React.FC = () => {
    const imagePlugin = createImagePlugin();
    const navigate = useNavigate()
    const {article_id} = useParams()

    const [loading, setLoading] = React.useState<boolean>(false)
    const [article, setArticle] = React.useState<ArticleModel | null>(null)

    /**
     * To set to back.
     */
    const backHandler = React.useCallback(
        () => {
            window.history.back()
        },
        []
    )

    /**
     * To set to the edit screen.
     */
    const editHandler = React.useCallback(
        () => {
            if (article)
                navigate(`/edit/${article.id}`)
        },
        [article, navigate]
    )

    /**
     * To load content.
     */
    const loadContent = React.useCallback(
        async () => {
            setLoading(true)

            const response: any = await getArticleById(article_id || "")

            setLoading(false)

            if (response.error) {
                console.log(response.error)
                return;
            }

            setArticle(response)
        },
        [setArticle, setLoading, article_id]
    )

    React.useEffect(
        () => {
            (async () => {
                if (article_id)
                    await loadContent()
            })()
        },
        [article_id]
    )

    return (
        <div className={"h-full flex flex-col divide-y"}>
            <div className={"py-3 bg-gray-100 text-gray-700 flex-none flex items-center justify-between px-5"}>
                <div className={"flex flex-row gap-3 items-center"}>
                    <button
                        onClick={backHandler}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faArrowLeft}/>
                    </button>
                    <div className={"text-xl font-bold"}>
                        Détails de l'article
                    </div>
                </div>
                <div className={"flex flex-row gap-3 items-center"}>
                    <button
                        onClick={editHandler}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faPenToSquare}/>
                    </button>
                    <button
                        onClick={loadContent}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faRefresh}/>
                    </button>
                </div>
            </div>
            <div className={"h-full w-full overflow-y-auto"}>
                {loading ? (
                    <Loading/>
                ) : article ? (
                    <div className={"p-5"}>
                        <div className={"pb-3 text-xl font-bold text-sky-500"}>
                            {article.title}
                        </div>
                        <Editor
                            readOnly
                            customStyleMap={styleMap}
                            blockStyleFn={blockStyleFn}
                            editorState={EditorState.createWithContent(
                                convertFromRaw(article.content), linkDecorator
                            )}
                            plugins={[imagePlugin]}
                            onChange={() => undefined}/>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default DetailsScreen
