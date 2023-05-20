import React, {createContext, useState} from "react"
import './App.css'
import 'draft-js/dist/Draft.css';
import HomeScreen from "./screens/home.screen";
import EditScreen from "./screens/edit.screen";
import StorageHelper from "./helpers/storage.helper";
import {RawDraftContentState} from "draft-js";

export enum ScreenStack {
    HOME = "HomeScreen",
    EDIT = "EditScreen"
}

export const ScreenContext = createContext<{
    setScreen: (screen: ScreenStack) => void
}>({
    setScreen: (s) => s
})

export const StateContext = createContext<{
    refresh: () => void
}>({
    refresh: () => null
})

function App() {
    const [screen, setScreen] = useState<ScreenStack>(ScreenStack.HOME)
    const [raw, setRaw] = React.useState<RawDraftContentState | null>(
        null
    )

    /**
     * To refresh content
     */
    const refresh = React.useCallback(
        () => {
            setRaw(StorageHelper.getStoredContent())
            return undefined
        },
        [setRaw]
    )

    React.useEffect(
        () => {
            refresh()
        },
        []
    )

    return (
        <ScreenContext.Provider value={{setScreen}}>
            <StateContext.Provider value={{refresh}}>
                {
                    screen === ScreenStack.HOME
                        ? <HomeScreen raw={raw}/>
                        : <EditScreen raw={raw}/>
                }
            </StateContext.Provider>
        </ScreenContext.Provider>
    )
}

export default App
