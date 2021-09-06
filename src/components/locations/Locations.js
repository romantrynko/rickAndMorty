import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { load } from '../../constants';

import './Locations.css';
import { getLocations } from '../../actions/locationsAction';
import ReactPaginate from 'react-paginate';
import { LocationItem } from '../location-item/LocationItem';

const LocationsComponent = (props) => {
  const { locations, getLocations, location, info, history, loading } = props;

  const page = new URLSearchParams(location.search).get('page');
  const { pages } = info || {};
  const [name, setName] = React.useState('');

  useEffect(() => {
    const getLoc = async () => {
      getLocations(page, name);
    };
    getLoc();
  }, [page, name]);

  const handlePageClick = ({ selected }) => {
    history.push(`/location?page=${selected + 1}`)
  }

  return (
    <div>
      {
        !!loading ? <h2 className={load}>Loading...</h2> : <h1 className={load}>Locations</h1>
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

      <table className="table">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Type: </th>
          <th scope="col">Dimension: </th>
          <th scope="col">URL: </th>
          <th scope="col">Created: </th>
        </tr>
        {
          locations.map(item => {
            return (
              <LocationItem item={item} />
            )
          })
        }
      </table>
    </div>
  )
};

const mapStateToProps = (store) => {
  const {
    locationReducer: {
      locations,
      info,
      loading
    }
  } = store;

  return {
    locations,
    info,
    loading
  }
};

const mapDispatchToProps = ({
  getLocations
})

export const Locations = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LocationsComponent));
