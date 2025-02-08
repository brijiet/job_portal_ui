
export const filterArray = (objectArray: any, id?: number, title?: string) => {
  const object = objectArray?.filter((item: any) => id ? item.id === id : item.title === title);
  return object;
}

export const getFirstLetterOfName = (str: string) => {
  if (str !== '') {
    var matches = str?.match(/\b(\w)/g);
    var acronym = matches?.join('');
    return acronym;
  } else {
    return ''
  }
}

export const getFirstLetterOfEmail = (str: string) => {
  if (str !== '') {
    var matches = str?.replace(/@.*$/, "").match(/\b(\w)/g);
    var acronym = matches?.join('').toLocaleUpperCase();
    return acronym;
  } else {
    return ''
  }
}