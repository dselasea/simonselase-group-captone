/**
 * @jest-environment jsdom
 */

import commentCounter from '../modules/commentCounter.js';

describe('Counts comments in pokemon cards', () => {
  test('It should return the number of comments in comment-list', () => {
    document.body.innerHTML = `
    <ul id="comment-list">
      <li>2023-03-15 Dan Your Insights</li>
      <li>2023-03-15 Makeer Your Insights</li>
      <li>2023-03-15 Dan Your Insights</li>
      <li>2023-03-15 test testYour Insights</li>
    </ul>`;

    const comments = document.getElementById('comment-list');
    const countElements = commentCounter(comments);
    expect(countElements).not.toBeNull();
    expect(countElements).not.toBeUndefined();
    expect(countElements).not.toBeFalsy();
    expect(countElements).not.toBeGreaterThan(4);
    expect(countElements).not.toBeLessThan(4);
    expect(countElements).toBe(4);
    expect(countElements).toEqual(4);
  });
});