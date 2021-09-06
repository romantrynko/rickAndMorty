import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import { CharacterCard } from '../character-card/CharacterCard';
import ReactPaginate from 'react-paginate';
import './Characters.css';
import { connect } from 'react-redux';
import { getCharacters } from '../../actions/charactersAction';
import { load } from '../../constants';

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
  const [type, setType] = React.useState('');

  useEffect(() => {
    const getChar = async () => {
      getCharacters(page, type);
    };
    getChar();
  }, [page, type]);

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
    <div style={{ 'text-align': 'center' }}>
      {
        !!loading ? <h2 className={load}>Loading...</h2> : <h1 className={load}>Characters</h1>
      }
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

      <form className='w-25 m-3'>
        <div class="form-group">
          <label for="formGroupExampleInput">Name</label>
          <input type="text" class="form-control" placeholder="Filter by name..." onChange={e => setType(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput2">Type</label>
          <input type="text" class="form-control" placeholder="filter by type..." onChange={e => setType(e.target.value)} />
        </div>
      </form>

      <div className='chars'>
        {
          characters ? characters.map(character => {
            return (
              <CharacterCard style={{ width: '25%' }} character={character} key={character.id} openModal={() => openModal(character)} />
            )
          }) : <h1>Nothing found</h1>
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