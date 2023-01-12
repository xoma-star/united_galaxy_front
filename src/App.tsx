import Map from "./Map/Map";
import {
    AdaptivityProvider,
    AppRoot, Button,
    ConfigProvider, Div, FormItem, FormLayout, FormLayoutGroup, Input, ModalPage, ModalPageHeader, ModalRoot,
    Panel,
    PanelHeader, PanelHeaderBack,
    PanelHeaderButton, PanelHeaderClose,
    Platform, Snackbar, SplitCol, SplitLayout, Subhead,
    View
} from "@vkontakte/vkui";
import {useState} from "react";
import {Icon24Filter} from "@vkontakte/icons";

const tg = (window as any).Telegram.Webapp

function App() {
    const [coordinates, setCoordinates] = useState<[string, string]>(['', ''])
    const [activeModal, setActiveModal] = useState<string>('main')
    const [showSnackBar, setShowSnackBar] = useState(false)

    const openSystemOverview = () => {
        setActiveModal('systemOverview')
    }

    return <div>
        <ConfigProvider appearance={"light"} platform={Platform.IOS}>
            <AdaptivityProvider>
                <AppRoot>
                    <View activePanel={activeModal}>
                        <Panel id="main">
                            <PanelHeader before={<PanelHeaderButton onClick={() => setActiveModal('filter')}>
                                <Icon24Filter/>
                            </PanelHeaderButton>} separator={false}>Галактическая карта</PanelHeader>
                            <Map sector={coordinates} setCoordinates={(x, y) => setCoordinates([x, y])}/>
                            <Button
                                size={'l'}
                                style={{position: "fixed", bottom: 15, width: 'calc(100% - 20px)', marginLeft: 10, marginRight: 10}}
                                mode={'outline'}
                                appearance={'overlay'}
                                onClick={() => setCoordinates((s) =>[s[0].slice(0, -1), s[1].slice(0, -1)])}
                            >{coordinates.join(':')} (наверх)</Button>
                        </Panel>
                        <Panel id={'systemOverview'}>
                            <PanelHeader before={<PanelHeaderBack onClick={() => {setActiveModal('main')}}/>}/>
                        </Panel>
                        <Panel id={'filter'} style={{minHeight: '100vh'}}>
                            <PanelHeader before={<PanelHeaderBack onClick={() => {
                                if(coordinates[0].length === coordinates[1].length) setActiveModal('main')
                                else setShowSnackBar(true)
                            }}/>}/>
                            <FormLayout>
                                <FormLayoutGroup mode={'horizontal'}>
                                    <FormItem top={'первая координата'}>
                                        <Input
                                            value={coordinates[0]}
                                            maxLength={3}
                                            onChange={(e) => setCoordinates(s => [e.target.value.replace(/[^0-9a-fA-F]/, ''), s[1]])}
                                        />
                                    </FormItem>
                                    <FormItem top={'вторая координата'}>
                                        <Input
                                            value={coordinates[1]}
                                            maxLength={3}
                                            onChange={(e) => setCoordinates(s => [s[0], e.target.value.replace(/[^0-9a-fA-F]/, '')])}
                                        />
                                    </FormItem>
                                </FormLayoutGroup>
                                <Div>
                                    <Subhead>Координаты сектора записываются в шестадцатеричной системе</Subhead>
                                    <Subhead>Длина первой и второй координаты должны быть одинаковы</Subhead>
                                </Div>
                            </FormLayout>
                            {showSnackBar && <Snackbar
                                onClose={() => setShowSnackBar(false)}
                            >
                                Длина первой и второй координаты должны совпадать
                            </Snackbar>}
                        </Panel>
                    </View>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    </div>
}

export default App
