import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './Locations.css';
import { getLocations } from '../../actions/locationsAction';

const LocationsComponent = (props) => {
  const { locations, getLocations, location, info, history } = props;

  const page = new URLSearchParams(location.search).get('page');
  const { pages } = info || {};
  const [name, setName] = React.useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLoc = async () => {
      setLoading(true);
      getLocations(page, name);
    };
    setLoading(false);
    getLoc();
  }, [])

  return (
    <div className='locations-list'>
      {
        !!loading ? <h2>Loading...</h2> : <h1 className='text-primary mb-3'>Locations</h1>
      }
      {
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type: </th>
              <th scope="col">Dimension: </th>
              <th scope="col">URL: </th>
              <th scope="col">Created: </th>
            </tr>
          </thead>
        </table>
      }
      {
        locations.map(item => {
          const {
            id,
            name,
            type,
            dimension,
            url,
            created
          } = item;

          return (
            <table className="table">
              <tbody>
                <tr>
                  {!!id && <th scope="row">{id}. {name}</th>}
                  {!!type && <td>{type}</td>}
                  {!!dimension && <td>{dimension}</td>}
                  {!!url && <td>{url}</td>}
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
    locationReducer: {
      locations,
      info
    }
  } = store;

  return {
    locations,
    info
  }
};

const mapDispatchToProps = ({
  getLocations
})

export const Locations = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LocationsComponent));
