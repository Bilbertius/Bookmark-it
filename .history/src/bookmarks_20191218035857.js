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
            required>
        </div>
       </form>
  
  `;
};
