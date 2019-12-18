import bookmarks from './bookmarks';
import api from './api';
import store from './store';
import './index.css';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

const main = function() {
  bookmarks.bindEventListeners();
  bookmarks.render();

  api
    .getBookmarks()
    .then(items => {
      items.forEach(bookmark => store.addItem(bookmark));
      bookmarks.render();
    })
    .catch(error => console.log(error.message));
};

$(main);
