import React, { useEffect } from 'react';
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
  const [type, setType] = React.useState('');
  const [dimension, setDimension] = React.useState('');

  useEffect(() => {
    const getLoc = async () => {
      getLocations(page, name, type, dimension);
    };
    getLoc();
  }, [page, name, type, dimension, getLocations]);

  const handlePageClick = ({ selected }) => {
    history.push(`/location?page=${selected + 1}`)
  }

  return (
    <div>
      {
        !!loading ? <h1 className={load}>Loading...</h1> : <h1 className={load}>Locations</h1>
      }
      {
        !!locations && <ReactPaginate
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
      <tbody>
        <table className="table m-4">
          <tr>
            <th>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="Enter name" onChange={e => setName(e.target.value)} />
                </div>
              </form>
            </th>
            <th>
              <form>
                <div className="form-group">
                  <label>Type</label>
                  <input type="text" className="form-control" placeholder="Enter type" onChange={e => setType(e.target.value)} />
                </div>
              </form>
            </th>
            <th>
              <form>
                <div className="form-group">
                  <label>Dimension</label>
                  <input type="text" className="form-control" placeholder="Type dimension" onChange={e => setDimension(e.target.value)} />
                </div>
              </form>
            </th>
            <th scope="col">URL</th>
            <th scope="col">Created</th>
          </tr>
          {
            locations ? locations.map(item => {
              return (
                <LocationItem item={item} key={item.id}/>
              )
            }) : <h3>Nothing found</h3>
          }
        </table>
      </tbody>
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
