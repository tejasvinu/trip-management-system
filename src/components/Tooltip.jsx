import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Tooltip = ({ content, children }) => (
  <Tippy content={content}>
    {children}
  </Tippy>
);

export default Tooltip;
