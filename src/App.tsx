import Map from "./Map/Map";
import {AdaptivityProvider, AppRoot, ConfigProvider, Panel, PanelHeader, View} from "@vkontakte/vkui";

function App() {

    return <div>
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <View activePanel="main">
                        <Panel id="main">
                            <PanelHeader separator={false}>KARTTA</PanelHeader>
                            <Map/>
                        </Panel>
                    </View>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    </div>
}

export default App
