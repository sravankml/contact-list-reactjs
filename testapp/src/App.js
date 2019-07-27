import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import ContactList from './contact'

import CreateContact from './createcontact'
import * as ContactAPI from './utils/ContactsAPI'

class App extends Component {

   state = {
    
     contacts:[
      // {
      //   "id": "ryan",
      //   "name": "Ryan Florence",
      //   "email": "ryan@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/ryan.jpg"
      // },
      // {
      //   "id": "michael",
      //   "name": "Michael Jackson",
      //   "email": "michael@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/michael.jpg"
      // },
      // {
      //   "id": "tyler",
      //   "name": "Tyler McGinnis",
      //   "email": "tyler@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/tyler.jpg"
      // }
    ]
  }
  
  // this funtion will will resive the contact from the front end of and then it will sent the call the remove from the state 
  // and finelly it will call ContactAPI.remove(contact) which will remve from the back end by calling the that perticulery
   removeContact = (contact) =>{
    this.setState((state) => ({
      contacts:state.contacts.filter((c)=>c.id !== contact.id)
    }))
    ContactAPI.remove(contact)
  }

  // this funtion will receive all the contact from the data base from the contactapi getall api will will list all the contact
  // and the will will list change the state of the contact using the setstate. which will list the contat and the set the contats:as 
  // the all the contact which is revied from the reatcecontact.getAll api form the back end 

    componentDidMount(){
      ContactAPI.getAll().then((contact)=>{
        console.log(contact)
            this.setState({contacts:contact})
      })
    }

    // this is a funtion whcih is used to create a new contact which will take a new contact information and call the createcontactapi
    // which will be saved in the data base at the back end of the form 

    createContact(contact) {
      ContactAPI.create(contact).then(contact => {
        this.setState(state => ({
          contacts: state.contacts.concat([ contact ])
        }))
      })
    }
  
  render() {
  

    return (
      <div className="App">
        {/* Route in the imported funtion from the react-router-dom which will lession the url pattern and 
        then it will change the page acourdingly */}
       < Route exact path="/" render={()=>(
         <ContactList 
         ondeletefun={this.removeContact} 
         contact={this.state.contacts}/>
       )}/>  
        
       <Route path='/create' render={({ history }) => (
        
        <CreateContact
        onCreateContact={(contact) => {
          this.createContact(contact)
          history.push('/')
         } }
        />
      )}/>
      </div>
      
    );
  }
}

export default App;
