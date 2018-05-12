import React, { Component } from 'react'
import API from '../../utils/API'
import ModalTwo from '../../components/modal'

class Saved extends Component {


	constructor(props) {
		super()
	    //this.handleShow = this.handleShow.bind(this);
	    this.handleClose = this.handleClose.bind(this);
	    this.getSaved = this.getSaved.bind(this)
	    this.state = {
		    	show: false,
				saved: [],
			};
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow = () => {
		this.setState({ show: true });
	}

	componentWillMount() {
		this.getSaved()
	};

	openModal = (event) => {
		let postId = event.target.id
		let post = this.state.saved.filter(post => post._id === postId)
		//console.log(post[0].title)
		this.setState({
			modalTitle: post[0].title,
			modalUrl: post[0].url,
			modalId: post[0]._id,
			modalNotes: post[0].notes,
			})
		//console.log(this.state)
		this.handleShow()
	}
	getSaved = async () => {
		try {
			const savedArticles = await API.getSavedArticle()
			this.setState({saved: savedArticles.data})
		} catch (err) {
			console.log(err)
		}
	}

	render () {
		return (
			<div className="container">
			{this.state.saved.length ? (
				this.state.saved.map(post => {
					return (
						<div key={post._id} className="card article-card">
							<img src={post.image} alt="" className="card-img-top"></img>
							<div className="card-body">
								<a href={post.url} target="_blank">
									<p className="card-title">{post.title}</p>
								</a>
								<span className="note-wrapper">
									<button type="button" className="delete btn" onClick={() =>  API.unsaveArticle(post._id)}>Delete</button>
									<button type="button" className="note btn" onClick={this.openModal} id={post._id}>{post.notes.length} Notes</button>
								</span>
							</div>
						</div>
					)
				})
			) : (
				<div className="banner saved-banner">
					<h1>Go to the <a href="/">Home Page</a> and to save some Articles.</h1>
				</div>
			)
			}
			<ModalTwo
				refresh={this.getSaved}
				show={this.state.show}
				handleClose={this.handleClose}
				title={this.state.modalTitle}
				url={this.state.modalUrl}
				id={this.state.modalId}
				notes={this.state.modalNotes}
			/>
		</div>
			)
	}
}

export default Saved
