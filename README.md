
# 🧬 Pokemon Explorer

A React 19 + Redux Toolkit + MUI app that allows users to browse Pokémon data with features like pagination, search, filtering by type, and viewing Pokémon details such as abilities, stats, and moves. Data is sourced from the public [PokeAPI](https://pokeapi.co).

---

## 📦 Setup & Running the App

### 1. Clone the repository

```bash
git clone https://github.com/alexandru997/Pokemon.git
cd Pokemon
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

### 4. Visit in browser

Go to: `http://localhost:5173/`

---

## ⚙️ Vite + ESLint Configuration

This project uses Vite + TypeScript and can optionally support enhanced ESLint with type-aware rules.

### 🔧 Example ESLint Expansion:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // Optional:
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

### 💡 Recommended Plugins:

- `eslint-plugin-react-x`
- `eslint-plugin-react-dom`

```js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```



