'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {*[]}
 */

function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const newDate = date.split(fromFormat[3]);
  const sliceFromFormat = fromFormat.slice(0, 3);
  const sliceToFormat = toFormat.slice(0, 3);

  const obj = sliceFromFormat.reduce((acc, num, idx) => {
    acc[num] = newDate[idx];

    return acc;
  }, {});

  for (const key of sliceToFormat) {
    if (key.includes('YY')) {
      let year = '';

      if (obj[key]) {
        result.push(obj[key]);

        continue;
      }

      if (key.length === 2) {
        year = obj['YYYY'].slice(-2);
      } else {
        const yearFormat = obj['YY'];

        year = +yearFormat < 30 ? `20${yearFormat}` : `19${yearFormat}`;
      }

      result.push(year);

      continue;
    }

    result.push(obj[key]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
