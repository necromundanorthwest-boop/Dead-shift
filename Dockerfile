FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY public ./public
COPY server ./server
USER node
ENV PORT=10000 NODE_ENV=production
EXPOSE 10000
CMD ["node", "server/http.js"]
