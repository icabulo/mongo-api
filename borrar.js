const InjectedBody = {
  name: "new paella",
  price: 2,
  NoExiste: "falso",
  items: [
    { name: "old paella", price: 5, otros: "otros" },
    { name: "arroz", price: 10, otros: "otros" },
  ],
};

const targetItem = InjectedBody.items[0];

console.log(Object.assign(targetItem, InjectedBody));
