import { Button, Stack, Typography } from '@mui/material';
import { CSSProperties, useState } from 'react';
import './App.css';
import { generate_bet, get_ball_counts } from './engine';
import LottoHistory from './lotto_history.json'
import { Bet, LottoGame } from './models';



const UK_Lotto = new LottoGame('UK Lotto', {numBalls: 6, maxValue: 59}, {name: 'Bonus Ball', maxValue: 59, separatePot: false})

const uk_lotto_counts = get_ball_counts(UK_Lotto, LottoHistory, ['Ball_1', 'Ball_2', 'Ball_3', 'Ball_4', 'Ball_5', 'Ball_6' ], 'Ball_Bonus')


const BetView = ({bet, specialBallName}: {bet: Bet, specialBallName: string}) => {
    const commonStyles: CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}

    return <Stack direction='row' spacing={2} alignItems='center' >
    
        {bet.regular.map((n, i) => <div key={i} style={{...commonStyles, height: '7rem', width: '7rem', background: 'whitesmoke', padding: 10}} >
                <Typography> Ball #{i +1} </Typography>
                <Typography> {n} </Typography>    
        </div>
        )}

        <div style={{...commonStyles, height: '10em', width: '10em', background: 'rgba(200, 15, 40, 1)', padding: 13}} >
            <Typography fontSize={'2em'} fontWeight={500} color='white' > {specialBallName} </Typography>
            <Typography fontSize={'2em'} fontWeight={500} color='white' > {bet.special} </Typography>
              
        </div>
     
        
    </Stack>
}

function App() {
    const getBet = () => generate_bet(UK_Lotto, uk_lotto_counts)

    const [bet, setBet] = useState(getBet())

    return <Stack spacing={3} style={{width: '70%', padding: 80, background: '#bbbbbb' }} >
        <BetView bet={bet} specialBallName='Bonus Ball' />
        <Button variant='contained' onClick={() => setBet(getBet())}> BOOM </Button>
    </Stack>
}

export default App

