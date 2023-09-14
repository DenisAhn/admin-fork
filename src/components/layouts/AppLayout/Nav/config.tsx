import * as React from 'react';

import { SvgColor } from 'components/ui/SvgColor';
import { APP_ROUTES } from 'config/routes';

const icon = (name: string) => (
  <SvgColor
    src={`/static/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const NAV_ITEMS = [
  {
    subheader: 'Management',
    items: [
      {
        title: 'Orders',
        path: APP_ROUTES.app.orders.createRoute(),
        icon: ICONS.invoice,
      },
    ],
  },
];

export default NAV_ITEMS;
