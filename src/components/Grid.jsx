import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import useSideScroll from '../utils/useSideScroll';

import './Grid.css';

export default function Grid(props) {
  const { left, right, animate } = props;
  const scrollRef = useSideScroll();
  const [scrolled, setScrolled] = useState(0);

  // can find this defined in Grid.css in .rhythm-container div
  const BEAT_WIDTH = 96;

  useEffect(() => {
    console.log('scrolling pos');
    const rect = scrollRef.current.getBoundingClientRect();
    const { width } = rect;
    console.log('hi', rect, 'x', width);
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
      console.log('we need to add stuff');
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

  const beatsComponent = (
    <div>
      <div className="rhythm-container">
        {[...Array(commonMultiple).keys()].map((i) => {
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
        {[...Array(commonMultiple).keys()].map((i) => {
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
    <div className="grid-container" ref={scrollRef} onScroll={handleScroll}>
      {beatsComponent}
    </div>
  );
}

Grid.propTypes = {
  left: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  animate: PropTypes.bool.isRequired,
};
