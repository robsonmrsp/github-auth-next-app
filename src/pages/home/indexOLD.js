import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faLink } from '@fortawesome/free-solid-svg-icons';
import SearchField from '@/components/SearchField';

const { MapContainer } = require('@/shared/MapConainer');
const Home = () => {
  console.log('');
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <p className="title">GitHub SearchApp</p>
          <SearchField />
        </div>
      </section>
      <div className="container is-fullhd">
        <div className="columns">
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">John Smith</p>
                    <p className="subtitle is-6">@johnsmith</p>
                  </div>
                </div>
                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                  <a href="#">#css</a> <a href="#">#responsive</a>
                  <br />
                  <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                  <div className="table-container">
                    <h2 className="title is-4">Repositorios</h2>
                    <table className="table">
                      <tr>
                        <th>Nome</th>
                      </tr>
                      <tr>
                        <td>Germany</td>
                      </tr>
                      <tr>
                        <td>Mexico</td>
                      </tr>
                      <tr>
                        <td>Austria</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-8">
            <MapContainer />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
