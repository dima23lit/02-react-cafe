import css from './App.module.css';
import CafeInfo from '../temp2/CafeInfo';
import { useState } from 'react';
import type { Votes, VoteType } from '../../types/votes';
import VoteOptions from '../temp4/VoteOptions';
import Notification  from '../temp1/Notification';
import VoteStats from "../temp3/VoteStats"


export default function App() {
    const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
    });
    
    const handleVote = (type: VoteType) => {
        setVotes({
            ...votes,
            [type]: votes[type] + 1
        })
    }  

    const resetVotes = () => {
        setVotes({
            good: 0,
            neutral: 0,
            bad: 0
        })
    }

    const totalVotes: number = votes.good + votes.neutral + votes.bad;
    const positiveRate: number = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0

    return (
        <div className={css.app}>
            <CafeInfo />
            <VoteOptions onVote={handleVote} onReset={resetVotes} canReset= {totalVotes > 0 ? true : false} />
            {
                totalVotes > 0 ?
                    <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} /> :
                    <Notification />
            }
        </div>
    )
}


