const LS_KEY = 'react-localstorage.ReactScheme';

export const localStorage = global.localStorage;

export function saveData(storeData) {
  return new Promise((resolve, reject) => {
    const { notSaveableData, ...saveableData } = storeData;
    console.log('storeData LS = ', storeData);
    try {
      // document.cookie = JSON.stringify(storeData);
      localStorage.setItem(LS_KEY, JSON.stringify(saveableData));
      // resolve(saveableData);
      resolve(storeData);
    } catch (error) {
      console.log('ERROR SAVE LOCAL DATA: ', error);
      reject(error);
    }
  });
}

export function loadData() {
  return new Promise((resolve, reject) => {
    try {
      const restoredData = JSON.parse(localStorage.getItem(LS_KEY));
      resolve(restoredData);
    } catch (error) {
      console.log('ERROR LOAD DATA FROM LOCAL STORAGE: ', error);
      reject(error);
    }
  });
}
