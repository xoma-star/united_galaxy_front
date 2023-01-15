import './Map.css'
import {useCallback, useEffect, useState} from "react";
import seedrandom from 'seedrandom'
import axios from "axios";

interface props{
    sector: [string, string],
    playerCoordinates: string,
    setCoordinates(x: string, y: string): void
}

//@ts-ignore
const tg = window.Telegram.WebApp

const Map = ({sector, setCoordinates, playerCoordinates}: props) => {
    const [systems, setSystems] = useState<string[][]>([])

    useEffect(() => {
       if(sector[0].length === 3 && sector[1].length === 3) {
           axios.get('https://api.xoma-star.tk/getSectorValidSystems', {params: {
                   sector: sector.join(':')
               }}).then(r => setSystems(r.data))
       }
       else{
           const a: string[][] = []
           for(let i = 0; i < 16; i++){
               const b = []
               for(let j = 0; j < 16; j++){
                   b.push(`${sector[0]}${j.toString(16)}:${sector[1]}${i.toString(16)}`.toUpperCase())
               }
               a.push(b)
           }
           setSystems(a)
       }
       navigator.vibrate(10)
    }, [sector])
    const random = seedrandom(sector.join(':'))

    return <div className={'map'}>
        {systems.map((x, i) => x.map(((x, j) =>
            {
                const a = `${sector[0]}${j.toString(16)}:${sector[1]}${i.toString(16)}`.toUpperCase()
                const b = playerCoordinates.toUpperCase().split(':')
                const selected = b[0].slice(0, sector[0].length) === `${sector[0]}${j.toString(16)}` &&
                    b[1].slice(0, sector[1].length) === `${sector[0]}${i.toString(16)}` &&
                    sector[0].length !== 3
                return <div
                    className={selected ? 'selected' : ''}
                    key={`${i}:${j}`}
                    onClick={() => {
                        if(sector[0].length === 3 && sector[1].length === 3) {

                            tg.MainButton.setParams({
                                text: `Информация о системе (${a})${a === playerCoordinates ? ' (вы здесь)' : ''}`
                            })
                            if(x !== 'HIDE'){
                                tg.MainButton.show()
                                tg.MainButton.onClick(() => {
                                    tg.sendData(JSON.stringify({command: 'travel', coordinates: a}))
                                })
                            }
                            else{
                                tg.MainButton.hide()
                            }
                        }
                        else setCoordinates(x.split(':')[0].slice(0, 3), x.split(':')[1].slice(0, 3))
                    }}
                >
                    {x.indexOf(':') > -1 && x}
                    {x.indexOf(':') === -1 && <div
                        className={'star ' + x + (a === playerCoordinates ? ' pulse' : '')}
                        style={{width: 16,
                            height: 16,
                            borderRadius: 9999,
                            transform: `scale(${(1 + random() * 500 / window.screen.height).toFixed(2)}) translate(${Math.floor(random() * 16 - 8)}px, ${Math.floor(random() * 16 - 8)}px)`
                        }}></div>}
                </div>
            }
        )))}
    </div>
}

export default Map