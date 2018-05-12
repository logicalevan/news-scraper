import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { FormBtn, TextArea } from '../Form'
import API from '../../utils/API'
import './modal.css'
import DeleteImg from '../../images/delete.png'

class NotesModal extends Component {
	
	state = {}

	componentWillReceiveProps(props) {
		this.props = props
	}
	handleInputChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	handleFormSubmit = event => {
		event.preventDefault()
		if (this.state.note) {
			return API.addNote(this.props.id,this.state.note)
		}
		this.props.refresh()
	}

	deleteNote = id => {
		
		API.removeNote(id)
		return this.props.refresh()
	}

	render() {
		console.log(this.props.refresh)
			return (
				<div>
		        <Modal show={this.props.show} onHide={this.props.handleClose}>
		          <Modal.Header>
		            <Modal.Title>{this.props.title}</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            {this.props.notes ? (
		            	this.props.notes.map(note => {
		            		return <div key={note._id}>
		            			<span>{note.body}</span><img onClick={() => this.deleteNote(note._id)} className='deleteImg' src={DeleteImg} alt='Trash Can'></img>
		            		</div>}
		            	)
		            	) : (
		            		<div>No NotesModal</div>
		            	)}
		            	<hr/>
		            	<TextArea
		            		value={this.state.note}
		            		name='note'
		            		onChange={this.handleInputChange}
		            		placeholder="Enter your notes here..."
		            	/>
		            	<FormBtn
		            		disabled={!this.state.note}
		            		onClick={this.handleFormSubmit}
		            	/>

		          </Modal.Body>
		        </Modal>
		      </div>
		    )
		}
}


export default NotesModal