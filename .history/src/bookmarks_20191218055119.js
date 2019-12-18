import api from './api';
import store from './store';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

/*
~~~~~~~~~~~~~~~~~~~GENERATORS~~~~~~~~~~~~~~~~~~

  The following  functions generate html that is populated with data from the store.
*/

const generateBookmarkForm = function() {
  let form = `
    <form id="bookmark-form">
         <h2>new bookmark</h2>
         
        <div class="labeled-input">
          <label for="bookmark-title" class="title">bookmark title</label>
          <br>
          <input 
            name="title" 
            type="text" 
            id="bookmark-title" 
            required>
        </div>
        <div class="labeled-input">
          <label 
            for="bookmark-url" 
            class="bookmark-input">
             bookmark url
          </label>
          <br>
          <input 
            name="url" 
            type="url" 
            id="bookmark-url" 
            required>
        </div>
        <div class="labeled-input">
          <label 
            for="bookmark-description" 
            class="title">
              bookmark title
            </label>
          <br>
          <input 
            name="description" 
            type="textarea" 
            id="bookmark-description" 
            placeholder="Describe your bookmark"
            required>
        </div>
        <div class="labeled input">
          <label for="bookmark-rating">
            Rate (1 to 5 stars):
          </label>
          <select id="bookmark-rating" class="ratings">
            <option value="1">☆</option>
            <option value="2">☆☆</option>
            <option value="3">☆☆☆</option>
            <option value="4">☆☆☆☆</option>
            <option value="5">☆☆☆☆☆</option> 
          </select> 
        </div>
        <div class="form-controls">
          <button 
            type="submit"
            name="add-bookmark-button"
            class="add-bookmark-button">
              ADD
          </button>
          <button 
            type="button"
            name="cancel-bookmark-button"
            class="cancel-bookmark-button">
              CANCEL
          </button>
        </div>          
       </form>
  `;

  return form;
};

const generateBookmark = function(bookmark) {
  const stars =
    bookmark.rating === 1
      ? '☆'
      : bookmark.rating === 2
      ? '☆☆'
      : bookmark.rating === 3
      ? '☆☆☆'
      : bookmark.rating === 4
      ? '☆☆☆☆'
      : '☆☆☆☆☆';

  const expandedBookmark = `
    <li 
      data-item-id="${bookmark.id}" 
      class="bookmark-item 
      expanded">
      <h2 class="bookmark-name">
          ${bookmark.title}
      </h2>    
      <p class="description">
        ${bookmark.description}
      </p>
      <h3 class="rating">
        Rating: ${stars}
      </h3>
      <div class="visit-site">
        <a href="${bookmark.url}">
          Visit Site
        </a>  
      </div>
        <div class="bookmark-controls">
          <button id="collapse" type="button">
            Collapse
          </button>
          <button id="delete" type="button">
            Delete
          </button>
        </div>
      </li>`;

  const basicBookmark = `
    <li  
      data-item-id="${bookmark.id}" 
      class="bookmark-item">
      <h2 class="bookmark-name">
          ${bookmark.title}
        </h2>
        <h3 class="rating">
          ${stars}
        </h3>
        <div class="bookmark-controls">
          <button id="expand" type="button">Expand</button>
          <button id="delete" type="button">Delete</button>
        </div>
      </li>`;

  return bookmark.expanded ? expandedBookmark : basicBookmark;
};

const generateBookmarkList = function(bookmarkList) {
  let bookmarkListString = bookmarkList
    .map(bookmark => generateBookmark(bookmark))
    .join('');
  console.log(bookmarkListString + 'haeliawh');

  return bookmarkListString;
};

/*~~~~~~~~~~~~~~~~~END GENERATORS~~~~~~~~~~~~~~~~~~ */

/*~~~~~~~~~~~~~~~~~~~RENDERER~~~~~~~~~~~~~~~~~~~~~
  The following function conditionally renders the 
  view with data provided by the store.
*/

const render = function() {
  console.log('rendererererer');

  if (store.creatingBookmark) {
    $('.form-container').html(generateBookmarkForm());
  } else {
    $('.form-container').html(`
        <div class="add">
          <button type="button" class="add-button">Add Bookmark</button>    
        </div>`);
    $('.filter-container').html(
      `<select name = "filter" id = "filter-rating" >
        <option value="0">Min. Rating (Filter by):</option>
        <option value="1">☆</option>
        <option value="2">☆☆</option>
        <option value="3">☆☆☆</option>
        <option value="4">☆☆☆☆</option>
        <option value="5">☆☆☆☆☆</option>
        </select >`
    );
  }

  if (store.error.message) {
    $('#error').append(store.error.message);
  } else {
    $('#error').empty();
  }

  const bookmarks = [...store.bookmarks];
  const filterBookmarks = bookmarks.filter(bookmark => {
    bookmark.rating >= store.filterRating;
  });

  $('#list-container').html(generateBookmarkList(filterBookmarks));
};

/* ~~~~~~~~~~~~~~~~~~~~~ END RENDERER ~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*~~~~~~~~~~~~~~~~~~~~~~~ HANDLERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  The following functions handle various events passing incoming
   data to the api which in turn makes changes to the store and 
   finally the view is rendered with the updated data. 

*/

const getIdFromElement = function(bookmarkElement) {
  return $(bookmarkElement)
    .closest('li')
    .data('item-id');
};

const handleFilter = function() {
  $('.filter-container').on('change', '#filter-rating', function(event) {
    event.preventDefault();
    const ratingValue = $(event.currentTarget).val();

    store.filterRating = ratingValue;
    render();
  });
};

const handleDelete = function() {
  $('.list-container').on('click', '#delete', function(event) {
    event.preventDefault();
    const id = getIdFromElement(event.currentTarget);
    api.deleteBookmark(id).then(() => {
      store.findAndDelete(id);
      render();
    });
  });
};

const handleBookmarkFormSubmit = function() {
  $('.form-container').on('submit', '#bookmark-form', function(event) {
    event.preventDefault();

    const title = $('#bookmark-name').val();
    const url = $('#bookmark-url').val();
    const description = $('#bookmark-description').val();
    const rating = $('#bookmark-rating').val();

    api
      .createNewBookmark(title, url, description, rating)
      .then(newBookmark => {
        store.addItem(newBookmark);
        store.creatingBookmark = false;
        store.error.message = null;
        render();
      })
      .catch(error => store.addError(error.message));
  });
};

const handleCancelAdd = function() {
  $('.form-container').on('click', '.cancel-bookmark-button', function(event) {
    event.preventDefault();
    store.creatingBookmark = false;
    render();
  });
};

const handleAdd = function() {
  $('.form-container').on('click', '.add-button', function(event) {
    event.preventDefault();
    // console.log(store.creatingBookmark);
    store.creatingBookmark = true;
    $('.add-button').addClass('hidden');
    render();
  });
};

const handleExpand = function() {
  $('.list-container').on('click', '.expand-button', function(event) {
    const id = getIdFromElement(event.currentTarget);
    const bookmark = store.bookmarks.find(bookmark => bookmark.id === id);

    bookmark.expanded = true;
    render();
  });
};

const handleCollapse = function() {
  $('.list-container').on('click', '.collapse-button', function(event) {
    const id = getIdFromElement(event.currentTarget);
    const bookmark = store.bookmarks.find(bookmark => bookmark.id === id);

    bookmark.expanded = false;
    render();
  });
};

const bindEventListeners = function() {
  handleAdd();
  handleBookmarkFormSubmit();
  handleCancelAdd();
  handleDelete();
  handleExpand();
  handleCollapse();
  handleFilter();
};

export default {
  bindEventListeners,
  render
};
