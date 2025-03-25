import { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortBy = type => {
    const sorted = [...goodsFromServer];

    if (type === 'alphabetically') {
      sorted.sort((a, b) => a.localeCompare(b));
    }

    if (type === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortType(type);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => sortBy('alphabetically')}
          className={classNames('button', 'is-info', {
            'is-light': sortType !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => sortBy('length')}
          className={classNames('button', 'is-success', {
            'is-light': sortType !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button type="button" onClick={reset} className="button is-danger">
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
