export type SampleRecipe = {
  id: number;
  name: string;
  favorite: boolean;
  labels: string[];
};

export const sampleRecipes: Array<SampleRecipe> = [
  {
    id: 1,
    name: "Teriyaki chicken",
    favorite: false,
    labels: ["asian"],
  },
  {
    id: 2,
    name: "Gapao rice",
    favorite: true,
    labels: ["thai", "asian"],
  },
  {
    id: 3,
    name: "Spaghetti Bolognese",
    favorite: false,
    labels: ["western"],
  },
  {
    id: 4,
    name: "Meringue",
    favorite: true,
    labels: ["dessert"],
  },
];

export type SampleSingleRecipe = {
  id: number;
  name: string;
  favorite: boolean;
  labels: string[];
  servings: number;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  methods: string[];
};
export const sampleSingleRecipe: SampleSingleRecipe = {
  id: 1,
  name: "Teriyaki chicken",
  favorite: true,
  labels: ["asian"],
  servings: 1,
  ingredients: [
    {
      name: "soy sauce",
      amount: 1 / 4,
      unit: "cup",
    },
    {
      name: "brown sugar",
      amount: 3,
      unit: "tbsp",
    },
    {
      name: "water",
      amount: 1,
      unit: "tbsp",
    },
    {
      name: "minced garlic",
      amount: 1,
      unit: "clove",
    },
    {
      name: "fresh ginger",
      amount: 1,
      unit: "tsp",
    },
    {
      name: "cooking oil",
      amount: 2,
      unit: "tsp",
    },
    {
      name: "chicken thigh",
      amount: 200,
      unit: "g",
    },
  ],
  methods: [
    "Prepare the marinade first. Stir together the soy sauce, brown sugar, water, garlic, ginger, and 1 Tbsp of the cooking oil in a bowl.",
    "Place the chicken in a shallow bowl or dish, then pour the marinade over top. Turn the chicken a couple of times to make sure it's well coated. Let the chicken marinate for 30 minutes to one day (refrigerated), turning the chicken occasionally as it marinates.",
    "When ready to cook the chicken, heat the remaining 1 Tbsp cooking oil in a large skillet over medium heat. Once hot, add the chicken, discarding the remaining used marinade.",
    "Cook the chicken for about 5-7 minutes on each side or until cooked through and the liquid in the skillet has reduced to a light coating of glaze on the chicken.",
    "Transfer the chicken to a cutting board and let it rest for about 5 minutes before slicing and serving.",
  ],
};
