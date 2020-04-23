import React, { useEffect,useState } from 'react';
import firebase from "../firebase/firebase.js"
import "../assets/css/leaderBoards.css"

export const LeaderBoard = () =>{


    let [leaderBoardData,setLeaderBoardData] = useState({
        LeaderBoard:[]
    ,isLoading:true});

    const getLeaderboard =()=>{
        var temp = [];
        firebase.firestore().collection('users').orderBy('level','desc').orderBy('timestamp').get().then((snapshot) => {
            snapshot.docs.forEach(doc =>{
                //console.log(doc.data().displayName,"  ",doc.data().level);
                //render_leaderboard(doc);
                temp.push({
                    level:doc.data().level,
                    name:doc.data().displayName,
                    participantType:doc.data().collegeNo
                })
            })

            setLeaderBoardData({
                LeaderBoard:temp,
                isLoading:false
            })
        })
    }

    useEffect(() => {
        console.log("eee")
        const f = () =>{
            if(leaderBoardData.isLoading){
                getLeaderboard();
            }
        }
        f();
    },[])

    return (
        <div className="leader-board">
            <h1>LeaderBoards</h1>
            <div style={{borderBottom:"thick #177cff solid"}} />
            <table responsive="sm" style={{width:"100%"}}>
            <thead>
                <tr>
                    <th style={{width:"15%"}}>POS</th>
                    <th style={{width:"45%"}}>NAME</th>
                    <th style={{width:"30%"}}>TYPE</th>
                    <th style={{width:"10%"}}>LEVEL</th>
                </tr>
            </thead>
            <tbody>
                {
                    !leaderBoardData.isLoading?(leaderBoardData.LeaderBoard.map((item,index)=>(
                        <tr >
                            <td>{index+1}</td>
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