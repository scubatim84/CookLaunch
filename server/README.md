<h2>Cook Launch</h2>
<p>This web application is meant to make cooking at home easier by allowing users to store recipes, and ingredients they have at home in a pantry, and generate ingredients required to cook recipes. The app will subtract ingredients in the user's pantry from the grocery list, to allow the user to only obtain the ingredients needed for the desired recipes, and the grocery list is then provided to the user. Additional features will be added later as shown below.</p>

<h2>Features</h2>
<p>Users can create accounts to store their profile information, ingredients, recipes, etc.</p>
<img src="client/public/assets/images/screenshot1.png" alt="Screenshot of user interface">
<p>Once logged in, users can click their profile in the right part of the navbar at the top to see possible actions. The dashboard will display the user's recipes, which they can view to see in more detail.</p>
<img src="client/public/assets/images/screenshot2.png" alt="Screenshot of user interface">
<p>The first step is to add ingredients that the user wishes to track in recipes. Users have access to common ingredients added by default but they will not be able to edit or delete those ingredients.</p>
<img src="client/public/assets/images/screenshot3.png" alt="Screenshot of user interface" width="35%" height="auto">
<p>Once the recipe's necessary ingredients are added, or otherwise available in the ingredient list, the user can add a new recipe using the "Add New Recipe" option. Once in the expanded recipe view, users can see the recipe name, recipe image, the list of ingredients needed for the recipe, the quantity and quantity type of each recipe ingredient, how much of that ingredient the user already has in their pantry, and how much they need to purchase to cook the recipe. If needed, the user may edit or delete the recipe.</p>
<img src="client/public/assets/images/screenshot4.png" alt="Screenshot of user interface">
<p>Once the user has added the recipe ingredients to the grocery list, they can then go through the grocery list while at the grocery store, check off ingredients they have, and if the quantities they obtained are different (such as if you cannot buy only 0.125 ounces of dill), they can edit the quantity purchased before or after checking off the ingredient. Users may also add extras to the grocery list, which are not tracked in the pantry, for items such as snacks which the user does not wish to track. Once the shopping trip is completed, the grocery list is cleared, and all checked off items (unless they were added as an extra) are added to the pantry.</p>
<img src="client/public/assets/images/screenshot5.png" alt="Screenshot of user interface" width="35%" height="auto">
<p>Once the items are added to the pantry, the user can edit or delete the pantry as needed, or add items to the pantry if desired. To deduct the recipe ingredients when the user cooks the recipe, they can go back to the expanded recipe view, and use the "Cook Recipe" option. This action will deduct the recipe ingredients from the user's pantry.</p>
<img src="client/public/assets/images/screenshot6.png" alt="Screenshot of user interface" width="35%" height="auto">
<h2>Built With</h2>
  <ul>
    <li>MongoDB
    <li>Express
    <li>React
    <li>Material UI
    <li>Node
    <li>Jira
    <li>Heroku
    <li>Travis CI
      <li>AWS S3
  </ul>

<h2>Authors</h2>
<p>Tim Thompson</p>

<h2>Acknowledgments</h2>
<p>Made possible by The Complete 2020 Web Development Bootcamp course on Udemy by Angela Yu</p>
