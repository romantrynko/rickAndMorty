import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import { Pagination } from '../pagination/Pagination';
import { CharacterCard } from '../character-card/CharacterCard';
import ReactPaginate from 'react-paginate';
import './Characters.css';
import { connect } from 'react-redux';
import { getCharacters } from '../../actions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none'
  },
};

const CharactersComponent = (props) => {
  const { characters, getCharacters, location, info, history } = props;
  const page = new URLSearchParams(location.search).get('page');
  const {pages} = info || {}
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [name, setName] = React.useState('');

  useEffect(() => {
    const getChar = async () => {
      getCharacters(page, name);
    };

    getChar();
  }, [page, name]);

  const handlePageClick = ({selected}) => {
    history.push(`/characters?page=${selected + 1}`)
  }

  function openModal(data) {
    setModalData(data);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <input placeholder="filter by name..." onChange={e => setName(e.target.value)} />
      <div className='chars'>
        {
          characters.map(data => {
            return (
              <CharacterCard style={{width: '25%'}} character={data} key={data.id} openModal={() => openModal(data)} />
            )
          })
        }
      </div>

     

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CharacterCard style={{ backgroundColor: '#c8d7ea'}} modal character={modalData} />
      </Modal>

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}

const mapStateToProps = (store) => {
  const {
    characters,
    info
  } = store;

  return {
    characters,
    info
  }
}

const mapDispatchToProps = ({
  getCharacters,
})

export const Characters = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CharactersComponent));