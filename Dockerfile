FROM node:latest

# production by default
ENV NODE_ENV production

# set the working directory
WORKDIR /app/lemur/api/

# copy package*.json files
COPY package*.json ./

#  install deps as a separate step
#  to cache the npm install step
#  cache mount to /root/.npm & 
#  speed up subsequent builds
#  bind mount to package*.json &
#  avoid having to copy them into
#  into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# run as a non-root user
USER node

# copy other source files to image
COPY . .

# expose the applicaiton port
EXPOSE 3002

# run the application
CMD ["node", "run", "start"]
