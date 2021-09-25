import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import useSideScroll from '../utils/useSideScroll';

import './Grid.css';

export default function Grid(props) {
  const { left, right, animate } = props;
  const scrollRef = useSideScroll();
  console.log('animate', animate);

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

  const beatsComponent = (
    <>
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
              {isBeat ? Math.floor(i / rightBeat) + 1 : null}
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
              {isBeat ? Math.floor(i / leftBeat) + 1 : null}
            </div>
          );
        })}
      </div>
    </>
  );

  const animatedBeatsComponent = (
    <>
      <div className="rhythm-container">
        {[...Array(commonMultiple * 2).keys()].map((i) => {
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
        {[...Array(commonMultiple * 2).keys()].map((i) => {
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
    </>
  );

  return (
    <div className="grid-container" ref={scrollRef}>
      {animate ? animatedBeatsComponent : beatsComponent}
    </div>
  );
}

Grid.propTypes = {
  left: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  animate: PropTypes.bool.isRequired,
};
