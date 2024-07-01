# Prueba técnica Scalboost

### Tecnologías utilizadas

-- Cliente: 

- React / Next.js 14 ⚙️

- TypeScript ₸

- TailwindCss 🍃

- Zustand 🛠️

-- Servidor:

- Nestjs 🦁

- MongoDB/Mongoose

Para los despliegues de las aplicaciones se utilizó:
- Cliente [Netlify](https://www.netlify.com/): https://scalboost-products.netlify.app/
- Servidor [Render](https://www.render.com/): https://scalboost-backend.onrender.com

## Estructura de carpetas

```
server
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ README.md
├─ docker-compose.yml
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ sql
│  ├─ courses_table.sql
│  └─ users_table.sql
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ config
│  │  └─ configuration.ts
│  └─ main.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json
```

```
client
├─ .env.example
├─ .eslintrc.json
├─ .gitignore
├─ components.json
├─ next.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ public
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (home)
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  └─ layout.tsx
│  ├─ common
│  │  └─ types
│  │     └─ products.ts
│  ├─ components
│  │  ├─ Products
│  │  │  ├─ ProductForm.tsx
│  │  │  └─ Products.tsx
│  │  ├─ Table
│  │  │  ├─ FiltersBox.tsx
│  │  │  └─ index.tsx
│  │  └─ ui
│  │     ├─ avatar.tsx
│  │     ├─ button.tsx
│  │     ├─ dialog.tsx
│  │     ├─ form.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ select.tsx
│  │     └─ sonner.tsx
│  ├─ lib
│  │  └─ utils.ts
│  ├─ services
│  │  └─ products.ts
│  └─ store
│     └─ products.ts
├─ tailwind.config.ts
└─ tsconfig.json
```

## Servidor en modo desarrollo
El servicio está en producción en el link https://scalboost-backend.onrender.com. Para este despliegue se utilizó el plan gratuito [Render.com](https://render.com). Por favor, tenga en cuenta que este plan tiene limitaciones en cuanto a la capacidad de rendimiento, además de que el servidor se apaga cuando no lo usan, por lo que puede tardar un poco en responder.
 
Para correr el servicio en modo desarrollo, sigue estos pasos:

```(bash)
git clone https://github.com/Thefederico/scalboost-backend.git

#Instalar dependencias
npm install

#Modo desarrollo
npm run start:dev
```
- Agregar las  variables de entorno en el archivo .env, con la siguiente estructura:

- [Variables de entorno](https://drive.google.com/file/d/1fqu3Em0utzVGnvaJ6GQ1CPKAHPJXDCcp/view?usp=sharing)

```
PORT=8000
DATABASE_URL=
```

## Cliente en modo desarrollo
Agreagar las variables de entorno al archivo .env.local:

```(txt)
NEXT_PUBLIC_API_URL_BASE="https://scalboost-backend.onrender.com"
```

Si decidió usar el backend local, agregue la siguiente variable de entorno:

```(txt)
NEXT_PUBLIC_API_URL_BASE="http://localhost:8000"
```

###  Iniciar el cliente en modo desarrollo:

```(bash)
git clone https://github.com/Thefederico/scalboost-frontend.git

# Instalar dependencias
npm install

#Modo desarrollo
npm run dev
```