import type { FC } from 'react';
import { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { logout } from '../../store/action';
import { AuthorizationStatus } from '../../types/auth';
import { selectAuthorizationStatus, selectUser } from '../../store/selectors';

type HeaderProps = {
  isMainPage?: boolean;
};

const Header: FC<HeaderProps> = ({ isMainPage = false }) => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link ${isMainPage ? 'header__logo-link--active' : ''}`}
              to="/"
            >
              <img
                className="header__logo"
                src="markup/img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="/favorites"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        {user?.avatarUrl && (
                          <img
                            src={user.avatarUrl}
                            alt="User avatar"
                            style={{ borderRadius: '50%', width: '100%', height: '100%' }}
                          />
                        )}
                      </div>
                      <span className="header__user-name user__name">
                        {user?.email}
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button
                      className="header__nav-link"
                      onClick={handleLogout}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <span className="header__signout">Sign out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/login"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
