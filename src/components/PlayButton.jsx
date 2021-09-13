/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import cx from 'classnames';

import './PlayButton.css';

export default function PlayButton() {
  const [isPressed, setIsPressed] = useState(false);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <button
      type="button"
      className={cx({
        'play-btn': true,
        'play-btn-pressed': isPressed,
      })}
      onClick={() => { setIsPressed(!isPressed); }}
    >
      play
    </button>
  );
}
