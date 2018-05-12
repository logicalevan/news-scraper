import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/home'
import Saved from './pages/saved'
import './style.css'

const NotFound = () => {
	return (<div> 404 not found </div>)
}

const App = () => (
	<Router>
		<div>
			<Navbar/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/saved" component={Saved} />
				<Route exact path="/api/scrape" component={Home} />
				<Route path='/' component={NotFound}/>
			</Switch>
		</div>
	</Router>
)

export default App;