const listenToEvent = (event, handler) => {
  const body = document.querySelector('body');
  body.addEventListener(event, handler);
};

const count = (items) => {
  const number = items.length;
  return number;
};

const displayNumber = (number, root, items) => {
  root.innerText = number(items);
};

const display = (root, iterable, displayNum, count, numLi) => {
  // console.log(root)
  const fragment = new DocumentFragment();
  for (let i = 0; i < iterable.length; i += 1) {
    if (root.id !== 'search') {
      const div = document.createElement('div');
      div.id = `card${i}`;
      div.className = 'card';
      const shadow = document.createElement('div');
      shadow.id = `shadow${i}`;
      shadow.className = 'shadow';
      const h4 = document.createElement('h4');
      let altered;
      if (iterable[i].title[0].length > 30) {
        altered = iterable[i].title[0].substring(0, 45);
        // console.log(`OLD: ${iterable[i].title[0]}`)
        // console.log(`NEW: ${prev}`);
        h4.innerText = `${altered}(more...)`;
      } else {
        h4.innerText = iterable[i].title[0];
      }
      const btn = document.createElement('button');
      btn.id = `${i}`;
      btn.innerText = 'Comment';
      shadow.append(h4, btn);
      div.appendChild(shadow);
      div.style.background = `url("${iterable[i].edmPreview[0]}")no-repeat 100%`;
      fragment.appendChild(div);
      // console.log(fragment.innerHTML);
    }
  }
  root.append(fragment)
  const cards = document.querySelectorAll('.card');
  // console.log(cards.length)
  displayNum(count, numLi, cards);
  // root.innerHTML += fragment.innerHTML;
  // console.log(root.innerHtml)
  // return root;
};

//country: ['Spain']
// dataProvider: ['Gredos. Repositorio Documental de la Universidad de Salamanca']
// dcCreator: ['Chiluwa, Innocent']
// dcCreatorLangAware: {def: Array(1)}
// dcDescription: (2) ['This study critically examines the discourse of po…nd ethnic interest rather than national interest.', 'Este artículo presenta un estudio crítico de los m…ico e interés étnico más que al interés nacional.']
// dcDescriptionLangAware: {def: Array(2)}
// dcLanguage: ['eng']
// dcLanguageLangAware: {def: Array(1)}
// dcTitleLangAware: {def: Array(2)}
// edmConcept: ['http://id.sgcb.mcu.es/Autoridades/LEM201008934/concept']
// edmConceptLabel: [{…}]
// edmConceptPrefLabelLangAware: {es: Array(1)}
// edmDatasetName: ['2022712_Ag_ES_Hispana_gredos']
// edmIsShownAt: ['http://hdl.handle.net/10366/130607']
// edmIsShownBy: ['http://gredos.usal.es/jspui/bitstream/10366/130607…cupy_Nigeria_2012%e2%80%99_Un_analisis_critic.pdf']
// edmPreview: ['https://api.europeana.eu/thumbnail/v2/url.json?uri…2%25e2%2580%2599_Un_analisis_critic.pdf&type=TEXT']
// europeanaCollectionName: ['2022712_Ag_ES_Hispana_gredos']
// europeanaCompleteness: 10
// guid: "https://www.europeana.eu/item/2022712/lod_oai_gredos_usal_es_10366____130607_ent0?utm_source=api&utm_medium=api&utm_campaign=wkithninscen"
// id: "/2022712/lod_oai_gredos_usal_es_10366____130607_ent0"
// index: 0
// language: ['mul']
// link: "https://api.europeana.eu/record/2022712/lod_oai_gredos_usal_es_10366____130607_ent0.json?wskey=wkithninscen"
// previewNoDistribute: false
// provider: ['Hispana']
// rights: ['https://creativecommons.org/licenses/by-nc-nd/4.0/']
// score: 28.3469
// timestamp: 1635507536377
// timestamp_created: "2017-07-07T14:05:09.185Z"
// timestamp_created_epoch: 1499436309185
// timestamp_update: "2017-07-07T14:05:09.185Z"
// timestamp_update_epoch: 1499436309185
// title: (2) ['Occupy Nigeria 2012: Un análisis crítico de las pu…rotestas por la retirada de ayudas al combustible', 'Occupy Nigeria 2012: A Critical Analysis of Facebook Posts in the Fuel Subsidy Removal Protests']
// type: "TEXT"
// ugc: [false] 

// const display = (root, arrayIterator) => {
//   root.innerHTML = '';
//   const ul = document.createElement('ul');
//   ul.tabIndex = 0;
//   arrayIterator.forEach((currentItem, index) => {
//     ul.innerHTML += `
//     <li id="${index}" tabIndex = 0>${currentItem.user}: ${currentItem.score}</li>
//   `;
//   });
//   return root.append(ul);
// };

const displayDownwards = async (array, root) => {
  const json = await array.result;
  const sorted = json.sort((a, b) => b.score - a.score);
  return display(root, sorted);
};

export {
  listenToEvent, display, count, displayNumber,
};