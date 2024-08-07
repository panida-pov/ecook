# ECook
***ECook*** is a fullstack web application which helps you take note of your cooking recipes anywhere and anytime!

## Live Demo
https://ecook-client.onrender.com

## Built with
* React + TypeScript
* Express + TypeScript + TypeORM
* MySQL

## Features
* User can create a new recipe by filling in recipe name, recipe category, ingredients, and methods
* User can add recipes to the favorite list
* User can edit or delete existing recipes
* User can filter recipes by search term and category
  
## Prerequisites
* NPM
  ```
  $ npm install npm@latest -g
  ```
* Docker Desktop
    * For Windows OS: https://docs.docker.com/desktop/install/windows-install/
    * For Mac OS: https://docs.docker.com/desktop/install/mac-install/
    * For Linux OS: https://docs.docker.com/desktop/install/linux-install/
      
## Step-by-step Guides
1. Clone the repository
    ```bash
    $ git clone https://github.com/panida-pov/ecook.git
    ```
    
2. Set up and run database on Docker container
   ```bash
    # ecook/
    $ make up
   
    # or use `docker-compose` command
    $ docker-compose up -d
    ```
3. Set up and run local server
   <br />
   <br />
   3.1 Install dependencies
      ```bash
      #  ecook/ecook-server/
      $ npm install
      ```
    3.2 Run server
      ```bash
      #  ecook/ecook-server/
      $ npm start
      ```
      
5. Run migrations
   ```bash
   # ecook/
   $ make migration-run

   # or use `docker-compose command
   $ docker-compose exec -it ecook-server npm run migration:run
   ```
   
6. Set up and run frontend
   <br />
   <br />
   5.1 Install dependencies
    ```bash
    #  ecook/ecook-client/
    $ npm install
    ```
    
    5.2 Run frontend
    ```bash
    #  ecook/ecook-client/
    $ npm start
    ```

## Screenshots
* Showing all recipes
  ![all recipes](https://github.com/panida-pov/ecook/blob/main/screenshots/all_recipes.jpg?raw=true)
* Editing certain recipe
  ![edit recipe](https://github.com/panida-pov/ecook/blob/main/screenshots/edit_recipe.jpg?raw=true)
* Creating a new recipe
  ![create new recipe](https://github.com/panida-pov/ecook/blob/main/screenshots/new_recipe.jpg?raw=true)
* Confirmation modal before proceeding
  ![confirm modal](https://github.com/panida-pov/ecook/blob/main/screenshots/sample_modal.jpg?raw=true)
* Select number of servings
  ![select servings](https://github.com/panida-pov/ecook/blob/main/screenshots/select_servings.jpg?raw=true)
* Filtering recipes by category
  ![filter recipes](https://github.com/panida-pov/ecook/blob/main/screenshots/thai_recipes.jpg?raw=true)
