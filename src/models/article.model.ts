import {RawDraftContentState} from "draft-js";

type ArticleModel = {
    id?: string
    title: string
    content: RawDraftContentState
}

export default ArticleModel
