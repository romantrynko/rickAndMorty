import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { load } from '../../constants';

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
      {
        !!loading ? <h2 className={load}>Loading...</h2> : <h1 className={load}>Episodes</h1>
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
      <input placeholder="filter by name..." onChange={e => setName(e.target.value)} className='form form-input' />
      {
        <table className="table table-striped">
          <thead>
            <tr >
              <th scope="col">#</th>
              <th scope="col">Air date:</th>
              <th scope="col">Episode: </th>
              <th scope="col">URL</th>
              <th scope="col">Created: </th>
            </tr>
          </thead>
          {
            episodes.map(item => {
              return (
                <EpisodeItem item={item} />
              )
            })
          }
        </table>
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