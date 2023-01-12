import './Map.css'
import {useEffect, useState} from "react";
import seedrandom from 'seedrandom'
import axios from "axios";

interface props{
    sector: [string, string]
}

const Map = ({sector}: props) => {
    const [systems, setSystems] = useState<string[][]>([])
    useEffect(() => {
        axios.get('https://api.xoma-stark.tk/getSectorValidSystems', {params: {
            sector: sector.join(':')
        }}).then(r => setSystems(r.data))
    }, [sector])
    const random = seedrandom(sector.join(':'))

    return <div className={'map'}>
        {systems.map((x, i) => x.map(((x, j) =>
            <div>
                <div
                    className={'star ' + x}
                    style={{width: 16,
                        height: 16,
                        borderRadius: 9999,
                        transform: `scale(${(1 + random() * 500 / window.screen.height).toFixed(2)}) translate(${Math.floor(random() * 16 - 8)}px, ${Math.floor(random() * 16 - 8)}px)`
                }}></div>
            </div>
        )))}
    </div>
}

export default Map