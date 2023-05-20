import React from 'react';
import {AtomicBlockUtils, EditorState, Modifier, RichUtils} from "draft-js"
import EditorActionsHelper, {ActionType, METHOD} from "../../helpers/editor-actions.helper";
import EditorToolbarItem from "./editor-toolbar-item";
import {linkDecorator} from "./decorators";

type EditorToolbarProps = {
    editorState: EditorState,
    setEditorState: (editorState: EditorState) => void
};

const EditorToolbar: React.FC<EditorToolbarProps> = (props) => {
    const {editorState, setEditorState} = props

    /**
     * To add new image to the content editor
     */
    const addImage = React.useCallback(
        () => {
            console.log('Add image entity!')
            const currentContent = editorState.getCurrentContent();
            const contentStateWithEntity = currentContent.createEntity(
                "IMAGE",
                "IMMUTABLE",
                {src: "http://localhost:5173/test-image.jpg"}
            )
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(
                editorState,
                {currentContent: contentStateWithEntity}
            );
            setEditorState(AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                "IMAGE")
            );
        },
        [editorState, setEditorState]
    )

    /**
     * To add new link to the content editor
     */
    const addLink = React.useCallback(
        () => {
            const currentContent = editorState.getCurrentContent();

            // Get block for current selection
            const selection = editorState.getSelection();
            const anchorKey = selection.getAnchorKey();
            const currentBlock = currentContent.getBlockForKey(anchorKey);

            //Then based on the docs for SelectionState -
            const start = selection.getStartOffset();
            const end = selection.getEndOffset();
            const selectedText = currentBlock.getText().slice(start, end);

            const text = window.prompt(
                "Entrez le text à ajouter",
                selectedText
            );
            const url = window.prompt("Entrez l'adresse du lien (ex: https://google.com)");

            if (!url || !text)
                return

            currentContent.createEntity(
                "LINK",
                "MUTABLE",
                {url}
            );

            const textWithEntity = Modifier.replaceText(
                currentContent,
                editorState.getSelection(),
                text,
                editorState.getCurrentInlineStyle(),
                currentContent.getLastCreatedEntityKey()
            );

            setEditorState(EditorState.createWithContent(textWithEntity, linkDecorator));
        },
        [editorState, setEditorState]
    )

    /**
     * To apply to right action to state editor.
     * @param item
     */
    const clickHandler = React.useCallback(
        (item: ActionType) => {
            switch (item.method) {
                case METHOD.BLOCK:
                    setEditorState(RichUtils.toggleBlockType(editorState, item.style))
                    break
                case METHOD.LINK:
                    addLink()
                    break
                case METHOD.IMAGE:
                    addImage()
                    break
                default:
                    setEditorState(RichUtils.toggleInlineStyle(editorState, item.style))
                    break
            }
        },
        [setEditorState, editorState, addLink, addImage]
    )

    return (
        <div className={"flex-none flex flex-row flex-wrap bg-gray-50 w-full p-3"}>
            {EditorActionsHelper.map((item) => (
                <EditorToolbarItem
                    key={item.label}
                    item={item}
                    editorState={editorState}
                    clickHandler={clickHandler}/>
            ))}
        </div>
    );
};

export default EditorToolbar
