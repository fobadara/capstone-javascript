import './style.css';

// import abc from './gordon.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  listenToEvent, display, count, displayNumber,
} from './use.js';

import { callApi } from './api.js';

const baseUrl = 'https://api.europeana.eu/record/v2/search.json';
const wsKey = '?wskey=wkithninscen';
const roots = document.querySelectorAll('.root');
const numberLi = document.querySelector('#amount');
const buttons = document.querySelectorAll('button');

const handleDisplay = (api, roots, display, displayNum, count, numLi) => {
  roots.forEach(async (currentItem) => {
    const result = await api(`${baseUrl}${wsKey}&query=${currentItem.id}`);
    // console.log(result);
    display(currentItem, result.items, displayNum, count, numLi);
  });
};
handleDisplay(callApi, roots, display, displayNumber, count, numberLi);



const handleButtons = (listen, buttons, func) => {
  listenToEvent('click', (event) => {
    buttons.forEach((currentItem) => {
      const element = event.target;
      if (currentItem.id === event.target.id) {
        func();
      }
    });      
  });
} 
cosnt
const popComment = () => {

}