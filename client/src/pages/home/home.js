import React, { Component } from 'react'
import API from '../../utils/API'
import ArticleCard from '../../components/ArticleCard'
import './home.css'

class Home extends Component {
	state = {
		posts: []
	};

	componentDidMount() {
		this.loadArticles()
	};

	loadArticles = () => {
		API.findAll()
			.then(res => 
				this.setState({posts: res.data})
			)
			.catch(err => console.log(err))

	};

	saveArticle = (id) => {
		API.saveArticle(id)
			.then(res => this.loadArticles())
			.catch(err => console.log(err))
		this.loadArticles()
	};

	unsaveArticle = (id) => {
		API.unsaveArticle(id)
			.then(res => this.loadArticles())
			.catch(err => console.log(err))
		this.loadArticles()
	}

	render() {
		return (
			<div className='wrapper'>
				{this.state.posts.length ? (
					<div className='all-articles'>
						{this.state.posts.map(post => (
							<ArticleCard
								key={post._id}
								src={post.image}
								title={post.title}
								id={post._id}
								href={post.url}
								isSaved={post.saved}
								save={this.saveArticle}
								unsave={this.unsaveArticle}
							/>
						))}
					</div>
				) : (
					<div className="banner home-banner">
						<h1>You have no Scraped Articles, click <a href="/scrape">Scrape</a> to get some articles.</h1>
					</div>
				)}
			</div>
		)
	}
}


export default Home

