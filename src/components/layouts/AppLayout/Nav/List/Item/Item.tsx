import { Box, Link, ListItemText, Tooltip } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Iconify } from 'components/ui/Iconify';

import { NavItemProps } from '../../types';

import { StyledDotIcon, StyledIcon, StyledItem } from './styles';

const NavItem: React.FC<NavItemProps> = ({
  item,
  depth,
  open,
  active,
  isExternalLink,
  ...other
}) => {
  const { title, path, icon, info, children, disabled, caption } = item;

  const subItem = depth !== 1;

  const renderContent = React.useMemo(() => {
    return (
      <StyledItem
        depth={depth}
        active={active}
        disabled={disabled}
        caption={!!caption}
        {...other}
      >
        {icon && <StyledIcon>{icon}</StyledIcon>}

        {subItem && (
          <StyledIcon>
            <StyledDotIcon active={active && subItem} />
          </StyledIcon>
        )}

        <ListItemText
          primary={title}
          secondary={
            caption && (
              <Tooltip title={caption} placement="top-start">
                <span>{caption}</span>
              </Tooltip>
            )
          }
          primaryTypographyProps={{
            noWrap: true,
            component: 'span',
            variant: active ? 'subtitle2' : 'body2',
          }}
          secondaryTypographyProps={{
            noWrap: true,
            variant: 'caption',
          }}
        />

        {info && (
          <Box component="span" sx={{ lineHeight: 0 }}>
            {info}
          </Box>
        )}

        {!!children && (
          <Iconify
            width={16}
            icon={
              open
                ? 'eva:arrow-ios-downward-fill'
                : 'eva:arrow-ios-forward-fill'
            }
            sx={{ ml: 1, flexShrink: 0 }}
          />
        )}
      </StyledItem>
    );
  }, [
    active,
    caption,
    children,
    depth,
    disabled,
    icon,
    info,
    open,
    other,
    subItem,
    title,
  ]);

  if (isExternalLink) {
    return (
      <Link href={path} target="_blank" rel="noopener" underline="none">
        {renderContent}
      </Link>
    );
  }

  if (children) {
    return renderContent;
  }

  return (
    <Link component={RouterLink} to={path} underline="none">
      {renderContent}
    </Link>
  );
};

export default React.memo(NavItem);
