import {CompositeDecorator} from "draft-js";

/**
 * Link decorator
 */
export const linkDecorator = new CompositeDecorator([{
    strategy(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges((character) => {
            try {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === "LINK"
                );
            } catch (e) {
                return false
            }
        }, callback);
    },
    component(props: any) {
        const {entityKey, contentState, children} = props
        const {url, linkText} = contentState.getEntity(entityKey).getData();
        return (
            <a
                className={"editor-link"}
                href={url}
                target="_blank">
                {linkText || children}
            </a>
        );
    },
}]);
