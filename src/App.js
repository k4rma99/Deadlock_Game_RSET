import React,{useEffect,useState} from 'react';
import {Navbar} from "./components/Navbar.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {GamePage} from "./components/GamePage.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';
import Div100vh from 'react-div-100vh'
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import {MainLoader} from "./components/main-loader.jsx";
import { FancyLoader } from './components/fancyLoader.jsx';

export const App = (props) => {

  let [forceStateChange,SetStateChange] = useState(1);
  let auth = useSelector(state=>state.fireBaseReducer.profile)
  var Cookie = require('js-cookie');
  const firebase = useFirebase();

  const returnPage = () =>{
    if(localStorage.getItem('LoggedIn')=='true'){
      if(localStorage.getItem('isDetailSet') != 'true'){
          return (
            <MainLoader auth={false} profile={true} forceStateChange={forceStateChange} SetStateChange={SetStateChange}></MainLoader>
          )
      }
      else{
        return (
          <GamePage firebase={firebase} forceStateChange={forceStateChange} SetStateChange={SetStateChange}>

          </GamePage>
          )
      }
    }
    else{
      return (
        <ScrollSnap forceStateChange={forceStateChange} SetStateChange={SetStateChange}></ScrollSnap>
      )
    }
  }


  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      if(localStorage.getItem('LoggedIn')!='true'){
        console.log("Ran event listener")
        localStorage.setItem('LoggedIn','true');
        console.log(user)
        //localStorage.setItem('LoggedIn','true');
      }
    }
    else{
      if(localStorage.getItem('LoggedIn')=='true'){
        localStorage.setItem('LoggedIn','false');
        localStorage.setItem('isDetailSet','false');
    }
    }
  })

  useEffect(async () => {
  }, [])

  return (
<html>

  <head>
    <link rel="stylesheet" href="https://use.typekit.net/bfk1sru.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.js" integrity="sha256-mfgvzVjyIcoXo0ElsT8uFIuDWYkvKCQ6wrkm6If7iug=" crossOrigin="anonymous"></script>
  </head>
  <body id='App' className="App">
  <Navbar forceStateChange={forceStateChange} SetStateChange={SetStateChange}></Navbar>

    <Router>
    <Switch>
      <Route exact path="/">
          {returnPage()}
      </Route>
      {/*<Route path="/home">
        <div style={{backgroundColor:"white",color:"black",marginTop:"10vh"}}>
          Game Page
        </div>
  </Route>*/}
      <Route render={() =>
      <Div100vh>
              <div style={{backgroundColor:"white",position:"fixed",width:"100%",height:"100vh",zIndex:"1000"}}>
                <h1>404: page not found</h1>
                </div>
      </Div100vh>}>
        </Route>
    </Switch>
  </Router>
  </body>

</html>
  );
}

