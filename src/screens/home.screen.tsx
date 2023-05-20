import React from "react"
import {convertFromRaw, EditorState, RawDraftContentState} from "draft-js";
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import {ScreenContext, ScreenStack, StateContext} from "../App";
import {faPenToSquare, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {linkDecorator} from "../components/editor-toolbar/decorators.tsx";
import {blockStyleFn, styleMap} from "../helpers/editor-actions.helper.ts";

type HomeScreenProps = {
    raw: RawDraftContentState | null
}

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
    const {raw} = props

    const imagePlugin = createImagePlugin();

    const {setScreen} = React.useContext(ScreenContext)
    const {refresh} = React.useContext(StateContext)

    const [editorState, setEditorState] = React.useState<EditorState>(
        EditorState.createEmpty(linkDecorator)
    )

    /**
     * To set to the edit screen.
     */
    const clickHandler = React.useCallback(
        () => {
            if (setScreen)
                setScreen(ScreenStack.EDIT)
        },
        [setScreen]
    )

    /**
     * To reload content.
     */
    const reloadContent = React.useCallback(
        () => {
            if (refresh)
                refresh()
        },
        [refresh]
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
            <div className={"py-3 bg-gray-100 text-gray-700 flex-none flex items-center justify-between px-5"}>
                <div className={"text-xl font-bold"}>
                    Home content
                </div>
                <div className={"flex flex-row gap-3 items-center"}>
                    <button
                        onClick={clickHandler}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faPenToSquare}/>
                    </button>
                    <button
                        onClick={reloadContent}
                        className={"icon-btn"}>
                        <FontAwesomeIcon
                            transform="grow-3"
                            icon={faRefresh}/>
                    </button>
                </div>
            </div>
            <div className={"h-full w-full overflow-y-auto"}>
                <div className={"p-5"}>
                    <Editor
                        readOnly
                        customStyleMap={styleMap}
                        blockStyleFn={blockStyleFn}
                        editorState={editorState}
                        plugins={[imagePlugin]}
                        onChange={setEditorState}/>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen
