# tests env
FROM mcr.microsoft.com/playwright:v1.22.0-focal
WORKDIR /tests
COPY . .
RUN npm install
RUN npx playwright install --with-deps
