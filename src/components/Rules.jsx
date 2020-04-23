import React from 'react';
import "../assets/css/Rules.css"

export const Rules = () =>{

    return(
        <div style={{height:"100%"}} className="rule-container" >
                        <h1 style={{marginLeft:"4vw",textAlign:"center"}}>Rules</h1>
                        <div style={{borderBottom:"thick #177cff solid",width:"100vw"}} />
                        <div className="rules-holder" style={{height:"100vh",display:"flex",flexDirection:"row",flexWrap:"wrap",backgroundColor:"#171716;"}}>
                        <div className="rule-item">
                            <img className="admin-icon icons"></img>
                            <h3>The admin is always right.</h3>
                            <h4 >He's right above you.</h4>
                        </div>
                        <div className="rule-item">
                            <img className="pencil-icon icons"></img>
                            <h3>We suggest you enter FULL NAMES including space.</h3>
                            <h4>Answer is CASE INSENSITIVE.Eg.barton hills,Barton Hills,BARTON HILLS,BaRtOn HilLs are all same</h4>
                        </div>
                        <div className="rule-item">
                            <img className="court-icon icons"></img>
                            <h3>Play fair, the mods will be fair.</h3>
                            <h4>Dare to post answers in forum or any place known to us, be ready to face the consequences.</h4>
                        </div>
                        <div className="rule-item">
                            <img className="rule-search-icon icons"></img>
                            <h3>Google and Wikipedia</h3>
                            <h4>They are both our boon and bane.</h4>
                        </div>
                        <div className="rule-item">
                            <img className="rule-question-icon icons"></img>
                            <h3>If you're stuck then hit up the clues section</h3>
                            <h4>Clues for the levels may be found in page source too</h4>
                        </div>
                        <div className="rule-item">
                            <img className="hacker-icon icons"></img>
                            <h3>Hackers, you guys rule.</h3>
                            <h4>Make any attempts and you will be banned from the game.</h4>
                        </div>
                        </div>
                    </div>
    )
}

