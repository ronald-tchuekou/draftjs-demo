import React from "react"
import ArticleModel from "../models/article.model.ts";
import createImagePlugin from "@draft-js-plugins/image";
import {convertFromRaw, convertToRaw, DraftHandleValue, EditorState, RichUtils} from "draft-js";
import {linkDecorator} from "./editor-toolbar/decorators.tsx";
import EditorToolbar from "./editor-toolbar";
import Editor from "@draft-js-plugins/editor";
import {blockStyleFn, styleMap} from "../helpers/editor-actions.helper.ts";

type ArticleFormProps = {
    article?: ArticleModel
}

export type ArticleFormRef = {
    getDataContent: () => ArticleModel
}

const ArticleForm: React.ForwardRefExoticComponent<ArticleFormProps & React.RefAttributes<ArticleFormRef>> = React.forwardRef((props, ref) => {
    const imagePlugin = createImagePlugin();

    const {article} = props

    const contentEditorRef = React.useRef<any>(null)

    const [title, setTitle] = React.useState<string>('')
    const [editorState, setEditorState] = React.useState<EditorState>(
        EditorState.createEmpty(linkDecorator)
    )

    /**
     *To manage keys commands
     */
    const handleKeyCommand = React.useCallback(
        (command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue => {
            console.log(eventTimeStamp)
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                setEditorState(newState);
                return "handled"
            }
            return "not-handled";
        },
        [setEditorState]
    )

    /**
     * To focus the content editor.
     */
    const focusContent = React.useCallback(
        () => {
            if (contentEditorRef.current)
                contentEditorRef.current.focus()
        },
        [contentEditorRef]
    )

    React.useImperativeHandle(ref, () => ({
        getDataContent() {
            return {
                title,
                content: convertToRaw(editorState.getCurrentContent())
            } as ArticleModel
        }
    }))

    React.useEffect(
        () => {
            focusContent()
        },
        []
    )

    React.useEffect(
        () => {
            if (!article)
                return;

            setTitle(article.title)
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw(article.content),
                    linkDecorator
                )
            )
        },
        [article]
    )

    return (
        <>
            <div className={"p-3"}>
                <label
                    className={"text-base text-gray-400"}
                    htmlFor="title">Titre :</label>
                <input
                    type={"text"}
                    id={"title"}
                    name={"title"}
                    value={title}
                    placeholder={"Veuillez entrer un titre"}
                    onChange={e => setTitle(e.target.value)}
                    className={"text-base text-gray-black font-medium border rounded-md w-full px-4 py-2"}/>
            </div>
            <EditorToolbar
                editorState={editorState}
                setEditorState={setEditorState}/>
            <div
                onClick={focusContent}
                className={"h-full w-full overflow-y-auto"}>
                <div className={"p-5"}>
                    <Editor
                        ref={contentEditorRef}
                        placeholder={"Veuillez taper quelque chose..."}
                        handleKeyCommand={handleKeyCommand}
                        customStyleMap={styleMap}
                        plugins={[imagePlugin]}
                        blockStyleFn={blockStyleFn}
                        editorState={editorState}
                        onChange={setEditorState}/>
                </div>
            </div>
        </>
    )
})

ArticleForm.displayName = "ArticleForm"

export default ArticleForm
