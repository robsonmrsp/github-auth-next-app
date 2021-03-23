import { useEffect, useState } from 'react';

const { faUsers, faLink, faStar, faPlusSquare, faMinusSquare } = require('@fortawesome/free-solid-svg-icons');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

const CardUser = ({ user, isAuthUser, onAddStar, onRemoveStar, starredRepos = [] }) => {
  console.log('CardUser');
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={user.avatar_url} alt="avatar" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{user.name}</p>
            <p className="subtitle is-6">@{user.login}</p>
          </div>
        </div>
        <div className="content">
          <p>{user.bio}</p>
          <p className="mb-1">
            <FontAwesomeIcon icon={faUsers} />
            <span className="pl-1">{user.followers} Seguidores</span>
          </p>
          <p className="mb-1">
            <a href={user.html_url}>
              <FontAwesomeIcon icon={faLink} />
              <span className="pl-1">{user.html_url}</span>
            </a>
          </p>

          {starredRepos.length && (
            <div className="table-container">
              <p className="mb-1">
                <FontAwesomeIcon icon={faStar} />
                <span className="pl-1">Repositórios marcados com star</span>
              </p>
              <table className="table">
                <tbody>
                  {starredRepos.map((repo) => (
                    <tr key={repo.id}>
                      <td>
                        <a href={repo.html_url} target="_blank">
                          <FontAwesomeIcon icon={faLink} />
                          <span className="pl-1">{repo.name}</span>
                        </a>
                      </td>
                      {isAuthUser && (
                        <>
                          {/*  
                           <td>
                            <button
                              onClick={() => {
                                onAddStar(repo.owner.login, repo.name);
                              }}
                            >
                              <FontAwesomeIcon icon={faPlusSquare} />
                            </button>
                          </td> */}
                          <td>
                            <button
                              onClick={() => {
                                onRemoveStar(repo.owner.login, repo.name);
                              }}
                            >
                              <FontAwesomeIcon icon={faMinusSquare} />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardUser;
