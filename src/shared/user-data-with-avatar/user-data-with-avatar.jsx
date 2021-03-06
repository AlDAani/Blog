import React from 'react';
import PropTypes from 'prop-types';
import './user-data-with-avatar.scss';
import * as defaultIcon from '../../icons/smiley-cyrus.jpg' ;

const UserDataWithAvatar = ({ username, date, imageSrc, className }) => {
  return (
    <div className={`person ${className}`}>
      <div className="person__info">
        <span className="person__info__username">{username}</span>
        <span className="person__info__date">{date}</span>
      </div>
      <img className="person__avatar" alt="avatar" src={imageSrc || defaultIcon}/>
    </div>
  );
};

UserDataWithAvatar.defaultProps = {
  date: '',
  className: '',
};

UserDataWithAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
};

export default UserDataWithAvatar;