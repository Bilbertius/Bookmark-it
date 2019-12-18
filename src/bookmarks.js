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
