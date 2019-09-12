
## Available Scripts

In the project directory, you can run:

### `npm run`
Install all the depedencies of this project. 
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Backend
1. We are using google's firebase for our backend.  You need to create new project at https://console.firebase.google.com/u/0/ and select Database from lefthand side menu bar and create new real time database. After database creation set rules public, if you dont want to it private. In private you need to authencticate before connecting database. So If you want to public you databse then use below database rules:-  

```
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
2.  Create two tables there names ```orders``` and ```ingredients```. 

3.  Add below default values in ```ingredients```  table:- 
  ```{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
       }
 ```
    
4. Now Copy base url which may like https://YOURPROJECTNAME.firebaseio.com  and add it in your code file name axios-order.js in src folder. 