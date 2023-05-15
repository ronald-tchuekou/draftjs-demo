import React from 'react';
import {EditorState} from "draft-js"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faBold,
    faChevronDown,
    faChevronUp,
    faHighlighter,
    faImage,
    faItalic,
    faLink,
    faListOl,
    faListUl,
    faStrikethrough,
    faTextWidth,
    faUnderline
} from "@fortawesome/free-solid-svg-icons";

type ActionType = {
    label: string,
    style: string,
    icon: IconProp | string,
    method: string,
}

const tools: ActionType[] = [
    {label: "Gras", style: "BOLD", icon: faBold, method: "inline"},
    {label: "Italique", style: "ITALIC", icon: faItalic, method: "inline"},
    {label: "Souligner", style: "UNDERLINE", icon: faUnderline, method: "inline"},
    {label: "Important", style: "HIGHLIGHT", icon: faHighlighter, method: "inline"},
    {label: "Barer", style: "STRIKETHROUGH", icon: faStrikethrough, method: "inline"},
    {label: "Mono espace", style: "MONOSPACE", icon: faTextWidth, method: "inline"},
    {label: "Liste non ordonnée", style: "unordered-list-item", method: "block", icon: faListUl},
    {label: "Liste ordonnée", style: "ordered-list-item", method: "block", icon: faListOl},
    {label: "Majuscule", style: "UPPERCASE", icon: faChevronUp, method: "inline"},
    {label: "Minuscule", style: "LOWERCASE", icon: faChevronDown, method: "inline"},
    {label: "Alignement gauche", style: "text-left", icon: faAlignLeft, method: "block"},
    {label: "Alignement Centré", style: "text-center", icon: faAlignCenter, method: "block"},
    {label: "Alignement droit", style: "text-right", icon: faAlignRight, method: "block"},
    {label: "H1", style: "header-one", method: "block", icon: "H1"},
    {label: "H2", style: "header-two", method: "block", icon: "H2"},
    {label: "H3", style: "header-three", method: "block", icon: "H3"},
    {label: "H4", style: "header-four", method: "block", icon: "H4"},
    {label: "H5", style: "header-five", method: "block", icon: "H5"},
    {label: "H6", style: "header-six", method: "block", icon: "H6"},
    {label: "Ajouter une image", style: "image", icon: faImage, method: "block"},
    {label: "Ajouter un lien", style: "LINK", icon: faLink, method: "link"},
];

type EditorToolbarProps = {
    editorState: EditorState,
    setEditorState: (editorState: EditorState) => void
};

const EditorToolbar: React.FC<EditorToolbarProps> = (props) => {
    const {editorState, setEditorState} = props

    const clickHandler = () => {

    }

    return (
        <div className={"flex-none flex flex-row flex-wrap bg-gray-50 w-full p-3"}>
            {tools.map((item) => (
                <ButtonItem
                    key={item.label}
                    item={item}
                    clickHandler={clickHandler}/>
            ))}
        </div>
    );
};

type ButtonItemProps = {
    clickHandler: () => void,
    item: ActionType
}

const ButtonItem: React.FC<ButtonItemProps> = (props) => {
    const {item, clickHandler} = props

    return (
        <button
            className={"p-2 w-10 h-10 text-gray-400"}
            onClick={clickHandler}>
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

export default EditorToolbar
