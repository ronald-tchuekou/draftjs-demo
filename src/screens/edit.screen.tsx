import React from "react"
import {
    convertFromRaw,
    convertToRaw,
    DraftHandleValue,
    Editor,
    EditorState,
    RawDraftContentState,
    RichUtils
} from "draft-js";
import {ScreenContext, ScreenStack} from "../App";
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditorToolbar from "../components/editor-toolbar";
import {linkDecorator} from "../components/editor-toolbar/link.decorator";
import StorageHelper from "../helpers/storage.helper";
import {blockStyleFn, styleMap} from "../helpers/editor-actions.helper";

type EditScreenProps = {
    raw: RawDraftContentState | null
}

const EditScreen: React.FC<EditScreenProps> = (props) => {
    const {raw} = props

    const {setScreen} = React.useContext(ScreenContext)
    const contentEditorRef = React.useRef<any>(null)

    const [editorState, setEditorState] = React.useState<EditorState>(
        EditorState.createEmpty(linkDecorator)
    )

    /**
     * To save content.
     */
    const saveContent = React.useCallback(
        () => {
            StorageHelper.storeContent(convertToRaw(editorState.getCurrentContent()))
        },
        [editorState]
    )

    /**
     *
     */
    const handleKeyCommand = React.useCallback(
        (command: string, editorState: EditorState, _eventTimeStamp: number): DraftHandleValue => {
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

    /**
     * To set to the edit screen.
     */
    const clickHandler = React.useCallback(
        () => {
            if (setScreen)
                setScreen(ScreenStack.HOME)
        },
        [setScreen]
    )

    React.useEffect(
        () => {
            focusContent()
        },
        []
    )

    React.useEffect(
        () => {
            if (raw)
                setEditorState(EditorState.createWithContent(convertFromRaw(raw), linkDecorator))
        },
        [raw]
    )

    return (
        <div className={"w-screen h-screen flex flex-col divide-y"}>
            <div className={"py-3 bg-gray-100 text-gray-700 flex-none flex items-center justify-between gap-3 px-5"}>
                <div className={"flex flex-row gap-3 items-center"}>
                    <button
                        onClick={clickHandler}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faArrowLeft}/>
                    </button>
                    <div className={"text-xl font-bold"}>
                        Modification
                    </div>
                </div>
                <button
                    onClick={saveContent}
                    className={"icon-btn"}>
                    <FontAwesomeIcon
                        transform="grow-3"
                        icon={faSave}/>
                </button>
            </div>
            <EditorToolbar
                editorState={editorState}
                setEditorState={setEditorState}/>
            <div
                onClick={focusContent}
                className={"h-full w-full overflow-y-auto"}>
                <div className={"p-3"}>
                    <Editor
                        ref={contentEditorRef}
                        placeholder={"Veuillez taper quelque chose..."}
                        handleKeyCommand={handleKeyCommand}
                        customStyleMap={styleMap}
                        blockStyleFn={blockStyleFn}
                        editorState={editorState}
                        onChange={setEditorState}/>
                </div>
            </div>
        </div>
    )
}

export default EditScreen
