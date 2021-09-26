import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import useSideScroll from '../utils/useSideScroll';

import './Grid.css';

export default function Grid(props) {
  const { left, right, animate } = props;
  const scrollRef = useSideScroll();
  const [scrolled, setScrolled] = useState(0);
  const [width, setWidth] = useState(0);

  // can find this defined in Grid.css in .rhythm-container div
  const BEAT_WIDTH = 96;
  const BEAT_MARGIN = 8;

  useEffect(() => {
    // const rect = scrollRef.current.getBoundingClientRect();
    setWidth(Math.ceil(window.innerWidth));
  }, []);

  // euclidean algorithm
  // requires x > y
  const gcd = (x, y) => {
    if (x === 0) return y;
    if (y === 0) return x;
    const remainder = x % y;
    return gcd(y, remainder);
  };

  const lcm = (x, y) => (x * y) / (x > y
    ? gcd(x, y) : gcd(y, x));

  const commonMultiple = lcm(left, right);
  const rightBeat = Math.floor(commonMultiple / right);
  const leftBeat = Math.floor(commonMultiple / left);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollLeft >= BEAT_WIDTH) {
      console.log('we need to add stuff', width);
      if (animate) {
        console.log('if animated add stuff');
      }
    }

    // reached the end of the scroll
    // super useful diagram: https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
    if (element.scrollLeft + element.offsetWidth >= element.scrollWidth) {
      console.log('we have reached the end of the line');
    }
    setScrolled(element.scrollLeft);

    console.log('scoll element', scrolled);
  };

  // how many square beats can fit on a page
  const numBeats = Math.ceil(width / BEAT_WIDTH);
  const number = animate
    ? (commonMultiple >= numBeats ? commonMultiple : numBeats) * 2
    : commonMultiple;

  const length = number * (BEAT_WIDTH + BEAT_MARGIN);
  console.log('length', length);
  const beatsComponent = (
    <div>
      <div className="rhythm-container">
        {[...Array(number).keys()].map((i) => {
          const isBeat = i % rightBeat === 0;
          return (
            <div
              className={cx({
                note: !isBeat,
                'note-beat': isBeat,
                'note-right': isBeat,
              })}
              key={`note-right-${i}`}
            >
              {isBeat ? Math.floor((i % commonMultiple) / rightBeat) + 1 : null}
            </div>
          );
        })}
      </div>
      <div className="rhythm-container">
        {[...Array(number).keys()].map((i) => {
          const isBeat = i % leftBeat === 0;
          return (
            <div
              className={cx({
                note: !isBeat,
                'note-beat': isBeat,
                'note-left': isBeat,
              })}
              key={`note-left-${i}`}
            >
              {isBeat ? Math.floor((i % commonMultiple) / leftBeat) + 1 : null}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className={cx({
        'grid-container': true,
        animate,
      })}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {beatsComponent}
    </div>
  );
}

Grid.propTypes = {
  left: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  animate: PropTypes.bool.isRequired,
};
