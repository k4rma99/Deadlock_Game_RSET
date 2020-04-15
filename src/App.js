import React,{useEffect,useState} from 'react';
import {Navbar} from "./components/Navbar.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import {useSelector} from 'react-redux';
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';
import { Menu } from './components/Menu.jsx';
import Div100vh from 'react-div-100vh'
import { useFirebase } from 'react-redux-firebase';

export const App = (props) => {

  var Cookie = require('js-cookie');
  let [user,SetUser] = useState(Cookie.get("LoggedIn"));
  //let auth = useSelector(state=>state.fireBaseReducer.auth);
  const firebase = useFirebase();

  const logout = () =>{
    console.log("eee");firebase.logout();Cookie.set("LoggedIn","false");
  }

  const returnPage = () =>{

   /* if(auth.isEmpty ==true){
      if(Cookie.get("LoggedIn")=='true'){
        console.log("peepee")
        return (<div style={{height:"100vh",backgroundColor:"white",color:"black",paddingTop:"10vh"}}>
        <button onclick={()=>{console.log("eee");firebase.logout();Cookie.set("LoggedIn","false")}}>Game Page</button>
      </div>)
      }
      else{
        return <ScrollSnap></ScrollSnap>
      }
    }
    else{
      console.log("peepee")
      if(Cookie.get("LoggedIn")!='true'){
        Cookie.set('LoggedIn','true');
      }
      return  (<div style={{height:"100vh",backgroundColor:"white",color:"black",paddingTop:"10vh"}}>
        dwdw
      <button onClick={()=>logout()}>Game Page</button>
    </div>)
    }
    */

    if(user==true){
      return (
        <div style={{height:"100vh",backgroundColor:"white",color:"black",paddingTop:"10vh"}}>
        Game Page
      <button onClick={()=>logout()}>Logout</button>
    </div>
      )
    }
    else{
      return (
        <ScrollSnap></ScrollSnap>
      )
    }
  }

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      if(Cookie.get("LoggedIn")!='true'){
          Cookie.set("LoggedIn","true");
      }
    }
    else{
      if(Cookie.get("LoggedIn")=='true'){
        Cookie.set("LoggedIn","false");
    }
    }
  })

  useEffect(() => {
      console.log("s")
  }, [])

  return (
<html>

  <head>
    <link rel="stylesheet" href="https://use.typekit.net/bfk1sru.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.js" integrity="sha256-mfgvzVjyIcoXo0ElsT8uFIuDWYkvKCQ6wrkm6If7iug=" crossorigin="anonymous"></script>
  </head>
  <body id='App' className="App">
  <Navbar></Navbar>
    <Menu></Menu>

    <Router>
    <Switch>
      <Route exact path="/">
        <Div100vh>
          {returnPage()}
        </Div100vh>
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

