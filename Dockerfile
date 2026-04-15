FROM node:20-alpine AS base
RUN npm install -g bun
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build


FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public
EXPOSE 3080
ENV PORT=3080
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

