import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../utils/API'
import './navbar.css'

class Navbar extends Component {

	doScrape = () => {
		API.scrape()
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	render() {
		return ( 
			<nav className="navbar navbar-light bg-light">
				<div className="button-group">
					<Link to="/"><button type="button" className="home btn btn-caution">Home</button></Link>
					<Link to="/saved"><button type="button" className="saved-articles btn btn-primary">Saved Articles</button></Link>
					<Link to="/"><button type="button" className="scrape btn btn-secondary" onClick={this.doScrape}>Scrape</button></Link>
				</div>
			</nav>)
	}
}

export default Navbar