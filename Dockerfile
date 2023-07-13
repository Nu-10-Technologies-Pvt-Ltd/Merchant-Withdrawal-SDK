FROM node:14
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm i --force
RUN npm install passport
# Build the application
RUN npm run build
# Set the NODE_ENV environment variable to "prod"
#ENV NODE_ENV=prod
EXPOSE 3000
# Run the command "npm run start:prod" when the container starts
CMD ["npm", "run", "start"]
#CMD ["npm", "start"]
