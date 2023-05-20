import React from 'react';
import {EditorState} from "draft-js"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ActionType, METHOD} from "../../helpers/editor-actions.helper";

type EditorToolbarProps = {
    clickHandler: (item: ActionType) => void,
    item: ActionType,
    editorState: EditorState
}

const EditorToolbarItem: React.FC<EditorToolbarProps> = (props) => {
    const {item, clickHandler, editorState} = props

    /**
     * To check if this item is active or not.
     */
    const isActive = () => {
        if (item.method === METHOD.BLOCK) {
            const selection = editorState.getSelection();
            const blockType = editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();
            return blockType === item.style;
        } else {
            const currentStyle = editorState.getCurrentInlineStyle();
            return currentStyle.has(item.style);
        }
    };

    /**
     * To handler button click.
     */
    const handlerClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
        (e) => {
            e.preventDefault()
            clickHandler(item)
        },
        [clickHandler, item]
    )

    return (
        <button
            title={item.label}
            className={`p-2 w-10 h-10 ${isActive() ? 'text-gray-700' : 'text-gray-400'}`}
            onMouseDown={e => e.preventDefault()}
            onClick={handlerClick}>
            {
                typeof item.icon !== "string"
                    ? <FontAwesomeIcon
                        transform="grow-3"
                        icon={item.icon}/>
                    : item.icon
            }
        </button>
    )
}

export default EditorToolbarItem