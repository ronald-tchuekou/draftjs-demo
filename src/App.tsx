import React from "react"
import './App.css'
import 'draft-js/dist/Draft.css';
import {Editor, EditorState} from "draft-js";
import EditorToolbar from "./components/editor-toolbar.tsx";

function App() {

    const [editorState, setEditorState] = React.useState<EditorState>(
        EditorState.createEmpty()
    )

    return (
        <div className={"w-screen h-screen flex flex-col divide-y"}>
            <EditorToolbar
                editorState={editorState}
                setEditorState={setEditorState}/>
            <div className={"h-full w-full overflow-y-auto"}>
                <div className={"p-3"}>
                    <Editor
                        placeholder={"Enter something..."}
                        editorState={editorState}
                        onChange={setEditorState}/>
                </div>
            </div>
        </div>
    )
}

export default App
