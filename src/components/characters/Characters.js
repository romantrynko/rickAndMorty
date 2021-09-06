import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import { CharacterCard } from '../character-card/CharacterCard';
import ReactPaginate from 'react-paginate';
import './Characters.css';
import { connect } from 'react-redux';
import { getCharacters } from '../../actions/charactersAction';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none',
    width: '50%'
  },
};

const CharactersComponent = (props) => {
  const { characters, getCharacters, location, info, history, loading } = props;

  const page = new URLSearchParams(location.search).get('page');
  const { pages } = info || {}
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [name, setName] = React.useState('');

  useEffect(() => {
    const getChar = async () => {
      getCharacters(page, name);
    };

    getChar();
  }, [page, name]);

  const handlePageClick = ({ selected }) => {
    history.push(`/characters?page=${selected + 1}`)
  }

  function openModal(data) {
    setModalData(data);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <ReactPaginate
        previousLabel='&laquo;'
        nextLabel='&raquo;'
        breakLabel='...'
        breakClassName='break-me'
        pageCount={pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName='pagination'
        activeClassName='active'
      />
      {
        !!loading ? <h2>Loading...</h2> : <h1 className='text-primary'>Characters</h1>
      }
      <input placeholder="filter by name..." onChange={e => setName(e.target.value)} className='form form-input' />

      <div className='chars'>
        {
          characters.map(character => {
            return (
              <CharacterCard style={{ width: '25%' }} character={character} key={character.id} openModal={() => openModal(character)} />
            )
          })
        }
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CharacterCard style={{ backgroundColor: '#c8d7ea' }} modal character={modalData} />
      </Modal>
    </div>
  )
}

const mapStateToProps = (store) => {
  const {
    characterReducer: {
      characters,
      info,
      loading
    }
  } = store;

  return {
    characters,
    info,
    loading
  }
}

const mapDispatchToProps = ({
  getCharacters,
})

export const Characters = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CharactersComponent));