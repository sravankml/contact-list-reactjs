import React,{Component}  from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
class ContactList extends Component {

  // this is the state of the search contact field by default the query is  empty
  state ={
    query:" "
  }
  
  // This will update the query set as we enter the keyword in the 
  updateQuery = (query)=>{
    this.setState({query:query.trim()})
  }
// this.state ={
//   event:" "
// }

clearQuery = ()=>{
  this.setState({query:''})
}

  render(){
    
    let showingContacts
    if (this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query),'i')
      showingContacts = this.props.contact.filter((contact)=>match.test(contact.name))
    }
    else{
      showingContacts = this.props.contact
    }
    showingContacts.sort(sortBy('name'))
    return(
      <div className='list-contacts'>
      {/* {JSON.stringify(this.state.query)} */}
      <div className='list-contacts-top'>
      <input className='search-contacts'
                        type='text'
                        placeholder='Search Contact'
                        value ={this.state.query}
                        onChange={(event)=>this.updateQuery(event.target.value)}>               
      </input>

          <Link to="/create"
          // onClick={()=>{}}
          className="add-contact">
            Add Contact
          </Link>
      </div>

          {showingContacts.length !== this.props.contact.length &&(
            <div className='showing-contacts'>
              <span>Now showing {showingContacts.length} of {this.props.contact.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
            </div>
          )}
         <ol className='contact-list'>
        {
          showingContacts.map((contact) =>(
            <li key={contact.id} className='contact-list-item'> 
           <div className='contact-avatar' style={{
            backgroundImage:`url(${contact.avatarURL})`
           }}/>
           <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={() => this.props.ondeletefun(contact)} className='contact-remove'>
                Remove
              </button> 
            </li>
          ))
        }
    </ol>
      
      </div>
     ) 
  }
}

export default ContactList;
