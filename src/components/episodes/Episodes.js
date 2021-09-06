import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import './Episodes.css';
import { getEpisodes } from '../../actions/episodesAction';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { EpisodeItem } from '../episode-item/EpisodeItem';

const EpisodesComponent = (props) => {
  const { episodes, getEpisodes, location, info, history, loading } = props;

  const page = new URLSearchParams(location.search).get('page');
  console.log(page);
  const { pages } = info || {};
  const [name, setName] = React.useState('');

  useEffect(() => {
    const getEp = async () => {
      getEpisodes(page, name)
    };
    
    getEp();
  }, [page, name]);

  const handlePageClick = ({ selected }) => {
    history.push(`/episode?page=${selected + 1}`)
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
          return (
              <EpisodeItem item={item} />
          )
        }
        )
      }
    </div>
  )
};

const mapStateToProps = (store) => {
  const {
    episodeReducer: {
      episodes,
      info,
      loading
    }
  } = store;

  return {
    episodes,
    info,
    loading
  }
};

const mapDispatchToProps = ({
  getEpisodes
})

export const Episodes = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EpisodesComponent));