import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
// TODO: This may fail if package is split from PWA build
import { useHistory } from 'react-router-dom';
import { NavBar, Svg, Icon, IconButton, Dropdown } from '@ohif/ui';

function Header({ children, menuOptions, isReturnEnabled, isSticky }) {
  const { t } = useTranslation();
  const history = useHistory();

  // TODO: this should be passed in as a prop instead and the react-router-dom
  // dependency should be dropped
  const onReturnHandler = () => {
    if (isReturnEnabled) {
      history.push('/');
    }
  };

  return (
    <NavBar className='justify-between border-b-4 border-black' isSticky={isSticky}>
      <div className="flex justify-between flex-1">
        <div className="flex items-center">
          {/* // TODO: Should preserve filter/sort
              // Either injected service? Or context (like react router's `useLocation`?) */}
          <div
            className={classNames("inline-flex items-center mr-3", isReturnEnabled && 'cursor-pointer')}
            onClick={onReturnHandler}
          >
            {isReturnEnabled && <Icon name="chevron-left" className="w-8 text-primary-active" />}
            <div className="ml-4"><img src="https://www.healthtrack.com.au/wp-content/uploads/2012/12/healthtrack-logo-web21.png" width="165" height="10" /></div>
          </div>
        </div>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center">
          <span className="mr-3 text-lg text-common-light">
            {t('Header:INVESTIGATIONAL USE ONLY')}
          </span>
          <Dropdown id="options" showDropdownIcon={false} list={menuOptions}>
            <IconButton
              id={"options-settings-icon"}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="settings" />
            </IconButton>
            <IconButton
              id={"options-chevron-down-icon"}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="chevron-down" />
            </IconButton>
          </Dropdown>
        </div>
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isReturnEnabled: PropTypes.bool,
  isSticky: PropTypes.bool
};

Header.defaultProps = {
  isReturnEnabled: true,
  isSticky: false
};

export default Header;
