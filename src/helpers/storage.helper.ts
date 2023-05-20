import {RawDraftContentState} from "draft-js";

/**
 * To manage local storage.
 */
const StorageHelper = {
    storeContent(content: RawDraftContentState) {
        localStorage.setItem("draft-content", JSON.stringify(content))
    },
    getStoredContent() {
        const result = JSON.parse(localStorage.getItem("draft-content") || 'null')
        return (result as RawDraftContentState) || null
    }
}

export default StorageHelper
