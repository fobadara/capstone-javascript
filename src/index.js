import './style.css';

// import abc from './gordon.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  listenToEvent, display, count, displayNumber,
} from './use.js';

import { callApi } from './main-api.js';

import { loadPopupCommentPage } from './pop-up.js';

const baseUrl = 'https://api.europeana.eu/record/v2/search.json';
const wsKey = '?wskey=wkithninscen';
const roots = document.querySelectorAll('.root');
const numberLi = document.querySelector('#amount');
const popUp = document.querySelector('.pop-up')
const buttons = document.querySelectorAll('button');

const handleDisplay = (api, roots, display, displayNum, count, numLi) => {
  roots.forEach(async (currentItem) => {
    const result = await api(`${baseUrl}${wsKey}&query=${currentItem.id}`);
    // console.log(result);
    display(currentItem, result.items, displayNum, count, numLi);
  });
};
handleDisplay(callApi, roots, display, displayNumber, count, numberLi);

const handleButtons = (listen, buttons, func, popUp) => {
  console.log('handle')
  listenToEvent('click', (event) => {
    const buttons = document.querySelectorAll('button');
    console.log(buttons)
    buttons.forEach((currentItem) => {
      const element = event.target;
      const sibling = element.parentElement.parentElement.parentElement.id;
      console.log(`sibling: ${sibling}`)
      console.log(element)
      if (currentItem.id === element.id) {
        func(sibling, popUp);
      }
    });
  });
};

handleButtons(listenToEvent, buttons, loadPopupCommentPage, popUp);

const popComment = () => {

}