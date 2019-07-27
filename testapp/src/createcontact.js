import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateContact extends Component{

    // This is a arrow funtion for submiting the form which will take all the values of the field and then it will serialize it using 
    // the serializeForm which we have imported from the form-serialize .after serializeing the value the value is passed to the propes
    // that is this.props.onCreateContact(values)

    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        if (this.props.onCreateContact)
        this.props.onCreateContact(values)
    }
    
    render(){
      // This render will return a ui for form 
        return(
            <div>
              {/* Link is imported form react-router-dom which is used insted of <a></a> tag  */}
            <Link className='close-create-contact' to='/'>Close</Link>
            <form onSubmit={this.handleSubmit} className='create-contact-form'>
              <ImageInput
                className='create-contact-avatar-input'
                name='avatarURL'
                maxHeight={64}
              />
              <div className='create-contact-details'>
                <input type='text' name='name' placeholder='Name'/>
                <input type='text' name='email' placeholder='Email'/>
                <button>Add Contact</button>
              </div>
            </form>
          </div>

        )
    }
}

export default CreateContact