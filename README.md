# Front-end Project - an e-commerce website

Front-end project for Integrify, by Heidi Rajala

## Table of content

- Information
- Technologies
- Project structure
- What I learned
- Getting started

## Information

This project uses the API endpoint [Fake Store API](https://fakeapi.platzi.com/). Products can be searched and sorted, added to cart and products have their own info-pages. User can log in, and new users can register to the site. Admin can create, edit and delete products. Material UI is used for the user interface components.

## Technologies

- TypeScript
- React
- Redux
- HTML
- Material UI

## Project structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── App.tsx
│   ├── components
│   │   └── Navbar.tsx
│   ├── hooks
│   │   ├── useAppDispatch.ts
│   │   └── useAppSelector.ts
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── Cart.tsx
│   │   ├── CreateNewProduct.tsx
│   │   ├── EditProduct.tsx
│   │   ├── Home.tsx
│   │   ├── Layout.tsx
│   │   ├── Login.tsx
│   │   ├── Product.tsx
│   │   ├── Products.tsx
│   │   ├── Profile.tsx
│   │   └── SignUp.tsx
│   ├── react-app-env.d.ts
│   ├── redux
│   │   ├── reducers
│   │   │   ├── cartReducer.ts
│   │   │   ├── productsReducer.ts
│   │   │   └── usersReducer.ts
│   │   └── store.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── styling
│   │   └── darkTheme.ts
│   └── types
│       ├── CartItem.ts
│       ├── Category.ts
│       ├── NewProduct.ts
│       ├── NewUser.ts
│       ├── Product.ts
│       ├── ProductUpdate.ts
│       ├── User.ts
│       └── UserCredential.ts
└── tsconfig.json
```

## What I learned

This was the first time I used redux, so it was quite hard consept to grasp at first. But I'm quite happy that now I think how it works and why it is used. I also learned how to use localStorage for persisting the state.npm install

## Getting started

Clone the repository from github using `git clone`.
Run `npm run watch`.
Or run `npm run build && npm run start`.
Or just visit [https://breweries-app-six.vercel.app/](https://breweries-app-six.vercel.app/).
