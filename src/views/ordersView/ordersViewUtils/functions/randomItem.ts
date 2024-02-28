interface randomItemInterface{
  val: string,
  color: string,
}


export const randomItem = () : randomItemInterface =>{
  const randomIndex = Math.floor(Math.random() * priority.length);
  return {val:priority[randomIndex],color:priority[randomIndex]};
}
