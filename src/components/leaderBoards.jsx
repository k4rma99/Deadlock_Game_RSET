import React, { Component,useEffect,useState } from 'react';
import "../assets/css/leaderBoards.css"

export const LeaderBoards = () =>{

    let [leaderBoardData,setLeaderBoardData] = useState({
        LeaderBoard:
        [
        {
            rank:1,
            name:"Jacob Mohan Chacko",
            participantType:"RSET STUDENT",
            level:"69"
        },
        {
            rank:2,
            name:"Vinay",
            participantType:"RSET STUDENT",
            level:"68"
        },
        {
            rank:3,
            name:"Matt",
            participantType:"OTHER",
            level:"67"
        },
        {
            rank:4,
            name:"Arjun",
            participantType:"RSET STUDENT",
            level:"66"
        }
    ]
    ,isLoading:false});

    useEffect(() => {
        const f = () =>{
            if (leaderBoardData.isLoading){
                //do api call here using firebase
                //once that is done set isLoading to false and then display the results
                //setLeaderBoardData()
            }
        }
        f();
    },[])

    return (
        <div className="leader-board">
            <table responsive="sm" style={{width:"100%"}}>
            <thead>
                <tr>
                    <th style={{width:"15%"}}>Rank</th>
                    <th style={{width:"45%"}}>Name</th>
                    <th>Participant Type</th>
                    <th style={{width:"10%"}}>Level</th>
                </tr>
            </thead>
            <tbody>
                {
                    true?(leaderBoardData.LeaderBoard.map((item,index)=>(
                        <tr style={{backgroundColor:index%2==0?"white":"whitesmoke"}}>
                            <td>{item.rank}</td>
                            <td>{item.name}</td>
                            <td>{item.participantType}</td>
                            <td>{item.level}</td>
                        </tr>
                    ))):""
                }
            </tbody>
            </table>
        </div>
    )
}