import React, { useEffect } from 'react';
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
  const [species, setSpecies] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [gender, setGender] = React.useState('');

  useEffect(() => {
    const getChar = async () => {
      getCharacters(page, species, status, gender);
    };
    getChar();
  }, [page, species, status, gender, getCharacters]);

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
    <div className='center'>
      <div>
        {
          !!loading ? <h1 className={load}>Loading...</h1> : <h1 className={load}>Characters</h1>
        }


        <form className='m-4 center-form'>
          <div className="form-group m-4">
            <input type="text" className="form-control" placeholder="Enter species name" onChange={e => setSpecies(e.target.value)} />
          </div>
          <div className="form-group m-4">
            <input type="text" className="form-control" placeholder="Enter status" onChange={e => setStatus(e.target.value)} />
          </div>
          <div className="form-group m-4">
            <input type="text" className="form-control" placeholder="Type gender" onChange={e => setGender(e.target.value)} />
          </div>
          <button type="reset" className="btn btn-secondary m-1">Reset</button>
        </form>
      </div>


      <div className='chars center'>
        {
          characters ? characters.map(character => {
            return (
              <CharacterCard style={{ width: '25%' }} character={character} key={character.id} openModal={() => openModal(character)} />
            )
          }) : <h3>Nothing found</h3>
        }
      </div>

      {
        !!characters && <ReactPaginate
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
      }

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