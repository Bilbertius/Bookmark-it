import bookmarks from './bookmarks';
import api from './api';
import store from './store';
import './index.css';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

const main = function() {
  bookmark.bindEventListeners();
  bookmark.render();

  api
    .getBookmarks()
    .then(items => {
      items.forEach(bookmark => store.addItem(bookmark));
      bookmark.render();
    })
    .catch(error => console.log(error.message));
};

$(main);
