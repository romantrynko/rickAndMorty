import React, { useEffect } from 'react';
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
  
  const { pages } = info || {};
  const [name, setName] = React.useState('');

  useEffect(() => {
    const getEp = async () => {
      getEpisodes(page, name)
    };

    getEp();
  }, [page, name, getEpisodes]);

  const handlePageClick = ({ selected }) => {
    history.push(`/episode?page=${selected + 1}`)
  }

  return (
    <div >
      {
        !!loading ? <h1 className={load}>Loading...</h1> : <h1 className={load}>Episodes</h1>
      }
      {
        !!episodes && <ReactPaginate
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

      {
        <table className="table m-4">
          <thead>
            <tr>
              <th>
                <form>
                  <div className="form-group">
                    <label>Episode name</label>
                    <input type="text" className="form-control" placeholder="Enter name" onChange={e => setName(e.target.value)} />
                  </div>
                </form>
              </th>
              <th >Air date</th>
              <th >Episode</th>
              <th >URL</th>
              <th >Created</th>

            </tr>
          </thead>

          {
            episodes ? episodes.map(item => {
              return (
                <EpisodeItem item={item} key={item.id}/>
              )
            }) : <h3>Nothing found</h3>
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