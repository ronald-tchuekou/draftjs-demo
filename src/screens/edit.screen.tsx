import React from "react"
import {faArrowLeft, faRefresh, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getArticleById, updateArticle} from "../services/articles.service.ts";
import {useParams} from "react-router-dom";
import ArticleForm, {ArticleFormRef} from "../components/article-form.tsx";
import ArticleModel from "../models/article.model.ts";

const EditScreen: React.FC = () => {
    const formRef = React.useRef<ArticleFormRef>(null)

    const {article_id} = useParams()

    const [loading, setLoading] = React.useState<boolean>(false)
    const [article, setArticle] = React.useState<ArticleModel | null>(null)

    const onBack = React.useCallback(
        () => {
            window.history.back()
        },
        []
    )

    /**
     * To save content.
     */
    const saveContent = React.useCallback(
        async () => {
            if (!formRef.current)
                return;

            const article = formRef.current.getDataContent()

            try {
                setLoading(true)
                const res = await updateArticle(article, article_id || "")
                console.log(res)
                setLoading(false)
            } catch (e) {
                setLoading(false)
                console.log(e)
            }
        },
        [article_id, formRef]
    )

    React.useEffect(
        () => {
            (async () => {
                if (!article_id)
                    return;

                setLoading(true)
                const res: any = await getArticleById(article_id)
                setLoading(false)

                if (res.error) {
                    console.log(res)
                    return;
                }

                setArticle(res)
            })()
        },
        [article_id]
    )

    return (
        <div className={"h-full flex flex-col divide-y"}>
            <div className={"py-3 bg-gray-100 text-gray-700 flex-none flex items-center justify-between gap-3 px-5"}>
                <div className={"flex flex-row gap-3 items-center"}>
                    <button
                        onClick={onBack}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faArrowLeft}/>
                    </button>
                    <div className={"text-xl font-bold"}>
                        Modification
                    </div>
                </div>
                <div className={"flex flex-row gap-3 items-center"}>
                    {loading ? (
                        <div className={"loading"}>
                            <FontAwesomeIcon
                                transform="grow-3"
                                icon={faRefresh}/>
                        </div>
                    ) : null}
                    <button
                        onClick={saveContent}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faSave}/>
                    </button>
                </div>
            </div>
            <ArticleForm
                ref={formRef}
                article={article || undefined}/>
        </div>
    )
}

export default EditScreen
