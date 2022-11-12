import { Component } from 'react';
import { Wrap, Form, Btn, Input } from './Searchbar.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearch } from 'react-icons/bi';

export default class SearchBar extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleNameChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.info('Enter your request.');
      return;
    }

    this.props.onSubmit(this.state.searchQuery, this.state.page);
    this.setState({ searchQuery: '', page: 1 });
  };

  render() {
    return (
      <div>
        <Wrap>
          <Form onSubmit={this.handleSubmit}>
            <Btn type="submit">
              <BiSearch size={30}/>                  
            </Btn>

            <Input
              type="text"
              // name="searchQuery"
              value={this.state.searchQuery}
              onChange={this.handleNameChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        </Wrap>
        <ToastContainer autoClose={3000} theme={'colored'} />
      </div>
    );
  }
}