This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Create a .env file on the root of the project, with the variables below.

Install the dependencies

```bash
npm install -g pnpm
pnpm install
```

You might need admin/root access for this.

Generate the Prisma client

```bash
pnpm generate
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="Put a secure hash here"
DATABASE_URL="PostgreSQL DB URL here"
