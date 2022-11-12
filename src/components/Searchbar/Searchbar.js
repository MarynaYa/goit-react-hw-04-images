import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrap, Form, Btn, Input } from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';


export default function Searchbar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      toast.warn('Введите ключевое слово для поиска изображения', {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    onSearch(searchValue);
    setSearchValue('');
  };

  return (
<div>
        <Wrap>
          <Form onSubmit={handleSubmit}>
            <Btn type="submit">
              <BiSearch size={30}/>                  
            </Btn>

            <Input
              type="text"             
              value={searchValue}
              onChange={handleChange}
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

Searchbar.propTypes = {
  onSearch: PropTypes.func,
};