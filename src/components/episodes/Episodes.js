import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import './Episodes.css';
import { getEpisodes } from '../../actions/episodesAction';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

const EpisodesComponent = (props) => {
  const { episodes, getEpisodes, location, info, history } = props;

  const page = new URLSearchParams(location.search).get('page');
  const { pages } = info || {};
  const [name, setName] = React.useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEp = async () => {
      setLoading(true);
      getEpisodes(page, name)
      setLoading(false);
    };
    
    getEp();
  }, [page, name]);

  const handlePageClick = ({ selected }) => {
    history.push(`/episodes?page=${selected + 1}`)
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
      <input placeholder="filter by name..." onChange={e => setName(e.target.value)} className='form form-input' />

      {
        !!loading ? <h2>Loading...</h2> : <h1 className='text-primary'>Episodes</h1>
      }
      {
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Air date:</th>
              <th scope="col">Episode: </th>
              <th scope="col">URL</th>
              <th scope="col">Created: </th>
            </tr>
          </thead>
        </table>
      }
      {
        episodes.map(item => {
          const {
            id,
            name,
            air_date,
            episode,
            characters,
            url,
            created
          } = item;

          return (
            <table className="table ">
              <tbody>
                <tr>
                  {!!id && <th scope="row">{id}. {name}</th>}
                  {!!air_date && <td>{air_date}</td>}
                  {!!episode && <td>{episode}</td>}
                  {!!url && <td href={url}></td>}
                  {!!created && <td>{created}</td>}
                </tr>
              </tbody>
            </table>
          )
        })
      }
    </div>
  )
};

const mapStateToProps = (store) => {
  const {
    episodeReducer: {
      episodes,
      info
    }
  } = store;

  return {
    episodes,
    info
  }
};

const mapDispatchToProps = ({
  getEpisodes
})

export const Episodes = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EpisodesComponent));