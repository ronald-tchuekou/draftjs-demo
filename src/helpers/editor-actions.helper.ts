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
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {DraftStyleMap} from "draft-js";

export enum METHOD {
    INLINE = "inline",
    BLOCK = "block",
    LINK = "link"
}

export type ActionType = {
    label: string,
    style: string,
    icon: IconProp | string,
    method: METHOD,
}

/**
 * Actions of editor toolbar
 */
const EditorActionsHelper: ActionType[] = [
    {label: "Gras", style: "BOLD", icon: faBold, method: METHOD.INLINE},
    {label: "Italique", style: "ITALIC", icon: faItalic, method: METHOD.INLINE},
    {label: "Souligner", style: "UNDERLINE", icon: faUnderline, method: METHOD.INLINE},
    {label: "Important", style: "HIGHLIGHT", icon: faHighlighter, method: METHOD.INLINE},
    {label: "Barer", style: "STRIKETHROUGH", icon: faStrikethrough, method: METHOD.INLINE},
    {label: "Mono espace", style: "MONOSPACE", icon: faTextWidth, method: METHOD.INLINE},
    {label: "Liste non ordonnée", style: "unordered-list-item", method: METHOD.BLOCK, icon: faListUl},
    {label: "Liste ordonnée", style: "ordered-list-item", method: METHOD.BLOCK, icon: faListOl},
    {label: "Majuscule", style: "UPPERCASE", icon: faChevronUp, method: METHOD.INLINE},
    {label: "Minuscule", style: "LOWERCASE", icon: faChevronDown, method: METHOD.INLINE},
    {label: "Alignement gauche", style: "text-left", icon: faAlignLeft, method: METHOD.BLOCK},
    {label: "Alignement Centré", style: "text-center", icon: faAlignCenter, method: METHOD.BLOCK},
    {label: "Alignement droit", style: "text-right", icon: faAlignRight, method: METHOD.BLOCK},
    {label: "H1", style: "header-one", method: METHOD.BLOCK, icon: "H1"},
    {label: "H2", style: "header-two", method: METHOD.BLOCK, icon: "H2"},
    {label: "H3", style: "header-three", method: METHOD.BLOCK, icon: "H3"},
    {label: "H4", style: "header-four", method: METHOD.BLOCK, icon: "H4"},
    {label: "H5", style: "header-five", method: METHOD.BLOCK, icon: "H5"},
    {label: "H6", style: "header-six", method: METHOD.BLOCK, icon: "H6"},
    {label: "Ajouter une image", style: "image", icon: faImage, method: METHOD.BLOCK},
    {label: "Ajouter un lien", style: "LINK", icon: faLink, method: METHOD.LINK},
];

/**
 * FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
 */
export const blockStyleFn = (contentBlock: Draft.ContentBlock): string => {
    const type = contentBlock.getType();
    switch (type) {
        default :
            return type
    }
}

/**
 * FOR INLINE STYLES
 */
export const styleMap: DraftStyleMap = {
    MONOSPACE: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
    HIGHLIGHT: {
        backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
        textTransform: "uppercase",
    },
    LOWERCASE: {
        textTransform: "lowercase",
    },
    BOLD: {
        fontWeight: 'bold'
    },
    LINK: {
        color: "#0048b4",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        textDecoration: "underline"
    }
};

export default EditorActionsHelper
